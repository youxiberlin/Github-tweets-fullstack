import * as dotenv from "dotenv";
dotenv.config();
import express from 'express';
import { json } from 'body-parser';
import * as database from './services/database';
import { postHook } from './controller';

const app = express();
app.use(json());
app.use('/test', (req, res) => res.status(200).send('hello world'));
app.post('/api/hook', postHook);

app.listen(process.env.PORT, () => {
  console.log(`App listening to port ${process.env.PORT}`);
  database.connect()
    .then(() => console.log('Connected to MongoDB'))
    .catch((e) => console.log(`MongoDB Connection Error: ${e}`))
});
