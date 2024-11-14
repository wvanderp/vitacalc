import React from 'react';
import SupplementList from './components/SupplementList';

function App() {
  return (
    <div className="flex">
      <div className="flex-1 p-4 border border-black">
        <SupplementList />
      </div>
      <div className="flex-1 p-4 border border-black">
        Column 2
      </div>
      <div className="flex-1 p-4 border border-black">
        Column 3
      </div>
    </div>
  );
}

export default App;
