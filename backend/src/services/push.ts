import mongoose, { Mongoose } from 'mongoose';
import Push from '../models/push';
import { ICommit } from '../models/commit';

export interface IPush {
  pushed_at: number;
  compare: string;
  commits: ICommit[];
}

export const createPush = async (push: IPush): Promise<IPush> => {
  if (!push) throw new Error('Missing push');
  return Push.create(push);
};

export const findPushes = async (): Promise<IPush[]> => Push.find();
