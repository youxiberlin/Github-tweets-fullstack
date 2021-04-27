import { FunctionComponent } from 'react';
import { ICommit } from '../models/commit.model';

const Commit: FunctionComponent<{ commit: ICommit }> = ({ commit }) => {
  return (
    <div key={commit.url}>
      <div>{commit.message}</div>
      <div>by {commit.committer}</div>
      <div><a href={commit.url} target="blank">Detail</a></div>
    </div>
  );
};

export default Commit;