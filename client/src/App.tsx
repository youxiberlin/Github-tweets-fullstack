import { FunctionComponent } from 'react';
import PushList from './components/PushList';

const App: FunctionComponent = () => {
  return (
    <div>
      <p className="fs-2 text-center mt-3 fw-bold">Github Push List</p>
      <PushList />
    </div>
  );
};

export default App;
