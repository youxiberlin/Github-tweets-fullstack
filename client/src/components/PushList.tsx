import { useEffect, useState, FunctionComponent } from 'react';
import axios from 'axios';
import Push from './Push';
import { IPush } from '../models/push.model';

const PushList: FunctionComponent = () => {
  const [pushes, setPushes] = useState<IPush[]>([]);

  useEffect(() => {
    const getAllPushes = async () => {
      const { data: pushes } = await axios.get('http://localhost:8080/api/pushes');
      setPushes(pushes.data);
      return pushes;
    }
    getAllPushes();
  }, []);

  return (
    <div className="container bg-light">
      {pushes.length ? (
        pushes
          .sort((a: any, b: any) => b.pushed_at - a.pushed_at)
          .map(push =>
          <Push key={push._id} push={push}/>
        )
      ) : null}
    </div>
  );
};

export default PushList;