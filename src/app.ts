import * as dotenv from "dotenv";
dotenv.config();
import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(json());
app.use('/test', (req, res) => res.status(200).send('hello world'))

app.listen(process.env.PORT, () => console.log(`App listening to port ${process.env.PORT}`));
