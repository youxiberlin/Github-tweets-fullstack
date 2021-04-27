import { FunctionComponent } from 'react';
import Commit from './Commit';
import { IPush } from '../models/push.model';
import moment from 'moment';
moment.locale();

const Push: FunctionComponent<{ push: IPush }> = ({ push }) => {
  return (
    <div className="my-3 border-bottom">
      <div style={{ fontSize: 14 }}>
        {moment(+push.pushed_at * 1000).format('HH:mm DD-MM-YY')}
      </div>
      <div className="mb-3">
        <div style={{ fontWeight: 500 }}>commits</div>
        {push.commits.map(commit =>
          <Commit key={commit.url} commit={commit} />)}
      </div>
    </div>
  );
};

export default Push;