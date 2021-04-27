import mongoose, { Mongoose } from 'mongoose';

export const connect = async (): Promise<Mongoose> =>
  await mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/ts-node-test', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

export const close = (): Promise<void> => mongoose.connection.close();
