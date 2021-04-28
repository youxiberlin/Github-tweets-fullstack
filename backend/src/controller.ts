import { RequestHandler } from 'express';
import Push from './models/push';
import { ICommit } from './models/commit';
import twitterClient from './services/twitter';
import { createPush } from './services/createPush';

export const getPushes: RequestHandler = async (req, res) => {
  try {
    const pushes = await Push.find();

    res.status(200).send({
      data: pushes,
    });
  } catch (e) {
    console.log(`Error at getPushes controller: ${e}`);
    res.status(500).send({
      message: 'Internal server error',
    });
  }
};

export const postHook: RequestHandler = async (req, res) => {
  try {
    const body = req.body;
    try {
      const { pushed_at } = req.body.repository;
      const { compare } = req.body;
      const { commits } = req.body;
      const commitsData: ICommit[] = commits.map((commit: ICommit) => {
        return {
          message: commit.message,
          url: commit.url,
          committer: commit.committer.username,
        };
      });

      await createPush({ pushed_at, compare, commits: commitsData });

      res.status(200).send({
        message: `${req.body.message} stored`,
      });
    } catch (e) {
      console.log(`Error at getting Github webhook: ${e}`);
      res.status(500).send({
        message: 'Internal server error',
      });
    }

    try {
      const tweetMessage = `New commits at ${body.repository.name}\n
      🚀 ${body.head_commit.message} by ${body.head_commit.committer.username}\n
      See more details at ${body.compare}`;
      await twitterClient.post('statuses/update', { status: tweetMessage });
    } catch (e) {
      console.log(`Error at sending tweet: ${e}`);
    }
  } catch (e) {
    console.log(`Error at postHook controller: ${e}`);
  }
};
