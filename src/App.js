import { dayjsSetup } from './utils/dayjs.helper';
import AllRoutes from './AllRoutes';
import './App.css';
import SuspenseContent from './containers/SuspenseContent';
import { Suspense, useState } from 'react';

function App() {;
  dayjsSetup();

  return (
    <div className="App">
      <Suspense fallback={<SuspenseContent />}>
        <AllRoutes />
      </Suspense>
    </div>
  );
}

export default App;
