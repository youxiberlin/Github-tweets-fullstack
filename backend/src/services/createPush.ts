import Push from '../models/push';
import { ICommit } from '../models/commit';

export interface IPush {
  pushed_at: number;
  compare: string;
  commits: ICommit[];
}

export const createPush = async (push: IPush) => {
  if (!push) throw new Error('Missing push');
  await Push.create(push);
};
