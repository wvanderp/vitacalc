import React from 'react';
import SupplementList from './components/Supplement/SupplementList';
import ConstraintList from './components/Constraint/ConstraintList';
import CalculationColumn from './components/CalculationColumn';

function App() {
  return (
    <div className="flex">
      <div className="flex-1 p-4 border border-black">
        <SupplementList />
      </div>
      <div className="flex-1 p-4 border border-black">
        <ConstraintList />
      </div>
      <CalculationColumn />
    </div>
  );
}

export default App;
