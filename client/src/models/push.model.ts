import { ICommit } from './commit.model';

export interface IPush {
  commits: ICommit[],
  pushed_at: string,
  compare: string,
  _id: string,
};
