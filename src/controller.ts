import { RequestHandler } from 'express';
import Message from './models/commit';
import twitterClient from './services/twitter';

export const postHook: RequestHandler = async (req, res) => {
  try {
    const body = req.body;
    const message = body.commits[0].message;
    const doc = new Message({ message });
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
