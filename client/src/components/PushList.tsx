import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Push } from '../models/push.model';

const PushList: React.FC = () => {
  const [pushes, setPushes] = useState<Push[]>([]);
  useEffect(() => {
    const getAllPushes = async () => {
      const { data: pushes } = await axios.get('http://localhost:8080/api/pushes');
      setPushes(pushes.data);
      return pushes;
    }
    getAllPushes();
  }, [])
  console.log('pushes', pushes)

  return (
    <div className="App">
      {pushes.length ? (
        pushes.map(push => (
          <div key={push._id}>
           {push.pushed_at}
           commits
           {push.commits.map(commit => (
             <div key={commit.url}>
               {commit.message}
            </div>
           ))}
          </div>
        ))
      ) : null}
    </div>
  );
}

export default PushList;