import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IPush extends Document {
  pushed_at: number;
  compare: string;
  commits: Types.Array<Map<string, string>>;
};

const PushSchema: Schema = new Schema(
  {
    pushed_at: { type: Number, required: true },
    compare: { type: String, required: true },
    commits: {
      type: Array,
    }
  }
);

export default mongoose.model<IPush>('Push', PushSchema);
