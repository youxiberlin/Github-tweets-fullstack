import { RequestHandler } from 'express';

export const postHook: RequestHandler = async (req, res) => {
  try {
    res.send({
      message: `${req.body.message} stored`
    });
  } catch (e) {
    console.log(e);
  }
};
