import { RequestHandler } from 'express';
import Message from './models/commit';
import twitterClient from './services/twitter';

export const postHook: RequestHandler = async (req, res) => {
  try {
    const message = req.body.commits[0].message;
    const doc = new Message({ message });
    await doc.save();
    await twitterClient.post('statuses/update', { status: message });
    res.send({
      message: `${req.body.message} stored`
    });
  } catch (e) {
    console.log(e);
  }
};
