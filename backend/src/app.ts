import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import * as database from './services/database';
import routes from './routes';

const app = express();

module.exports = app;

app.use(json());
app.use(cors());
app.use('/test', (req, res) =>
  res.status(200).send({ message: 'hello world' })
);
app.use('/api', routes);

connect();

function connect() {
  if (app.get('env') === 'test') return;
  database
    .connect()
    .then(() => {
      listen();
      console.log('Connected to MongoDB');
    })
    .catch((e) => console.log(`MongoDB Connection Error: ${e}`));
}

function listen() {
  if (app.get('env') === 'test') return;
  app.listen(process.env.PORT || 8080, () =>
    console.log(`App listening to port ${process.env.PORT || 8080}`)
  );
}
