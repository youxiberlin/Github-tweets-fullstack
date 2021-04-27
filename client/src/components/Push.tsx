import { FunctionComponent } from 'react';
import Commit from './Commit';
import { IPush } from '../models/push.model';

const Push: FunctionComponent<{ push: IPush }> = ({ push }) => {
  return (
    <div>
      <div>
        {push.pushed_at}
      </div>
      <div>
        <div>commits</div>
      {push.commits.map(commit =>
        <Commit key={commit.url} commit={commit} />)}
      </div>
    </div>
  );
};

export default Push;