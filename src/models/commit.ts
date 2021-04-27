import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IMessage extends Document {
  message: string;
};

const MessageSchema: Schema = new Schema({
    message: { type: String, required: true },
  }
);

export default mongoose.model<IMessage>('Message', MessageSchema);
