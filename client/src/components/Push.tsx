import { FunctionComponent } from 'react';
import { Push } from '../models/push.model';

const PushList: FunctionComponent<{ push: Push }> = ({ push }) => {
  return (
    <div key={push._id}>
      {push.pushed_at}
      commits
      {push.commits.map(commit => (
        <div key={commit.url}>
          {commit.message}
      </div>
      ))}
    </div>
  );
};

export default PushList;