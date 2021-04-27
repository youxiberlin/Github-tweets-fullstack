import { RequestHandler } from 'express';
import Push from './models/push';
import twitterClient from './services/twitter';

export const getPushes: RequestHandler = async (req, res) => {
  try {
    const pushes = await Push.find();

    res.status(200).send({
      data: pushes
    });
  } catch (e) {
    console.log(e);
  }
};

export const postHook: RequestHandler = async (req, res) => {
  try {
    const body = req.body;
    const { pushed_at } = req.body.repository;
    const { compare } = req.body;
    const { commits } = req.body;
    const commitsData: Array<void> = commits.map((commit: any) => {
      return {
        message: commit.message,
        url: commit.url,
        committer: commit.committer.username
      };
    });

    const doc = new Push({ pushed_at, compare, commits: commitsData });
    await doc.save();
    res.send({
      message: `${req.body.message} stored`
    });

    const tweetMessage = `New commits at ${body.repository.name}\n
    🚀 ${body.head_commit.message} by ${body.head_commit.committer.username}\n
    See more details at ${body.compare}`;
    await twitterClient.post('statuses/update', { status: tweetMessage });
  } catch (e) {
    console.log(e);
  }
};
