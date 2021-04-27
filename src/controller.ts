import { RequestHandler } from 'express';
import Message from './models/commit';

export const postHook: RequestHandler = async (req, res) => {
  try {
    const message = req.body.commits[0].message;
    const doc = new Message({ message });
    await doc.save()
    res.send({
      message: `${req.body.message} stored`
    });
  } catch (e) {
    console.log(e);
  }
};
