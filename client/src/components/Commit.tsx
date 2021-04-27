import { FunctionComponent } from 'react';
import { ICommit } from '../models/commit.model';

const Commit: FunctionComponent<{ commit: ICommit }> = ({ commit }) => {
  return (
    <div key={commit.url} className="d-flex flex-row align-items-center">
      <div className="mx-1">
      {commit.message}
      </div>
      <div className="text-secondary" style={{ fontSize: 14 }}>
        by {commit.committer}
      </div>
      <div className="mx-1" style={{ fontSize: 14 }}>
        <a href={commit.url} target="blank">
          Detail
        </a>
      </div>
    </div>
  );
};

export default Commit;