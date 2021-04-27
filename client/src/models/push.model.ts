import { Commit } from './commit.model';

export interface Push {
  commits: Commit[],
  pushed_at: string,
  compare: string,
  _id: string,
};
