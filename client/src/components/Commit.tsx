import { FunctionComponent } from 'react';
import { ICommit } from '../models/commit.model';

const Commit: FunctionComponent<{ commit: ICommit }> = ({ commit }) => {
  return (
    <div key={commit.url}>
      {commit.message}
    </div>
  );
};

export default Commit;