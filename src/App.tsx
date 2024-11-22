import React from 'react';
import SupplementList from './components/Supplement/SupplementList';
import ConstraintList from './components/Constraint/ConstraintList';
import CalculationColumn from './components/CalculationColumn';

function App() {
  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Export functionality to be implemented');
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-gray-800 text-white px-4 py-2 flex justify-between items-center">
        <h1 className="text-xl font-bold">Vitamin Calculator</h1>
        <button
          onClick={handleExport}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-sm font-medium"
        >
          Export Data
        </button>
      </div>
      
      <div className="flex flex-1 divide-x divide-gray-200 overflow-hidden">
        <div className="flex-1 h-full">
          <SupplementList />
        </div>
        <div className="flex-1 h-full">
          <ConstraintList />
        </div>
        <div className="flex-1 h-full">
          <CalculationColumn />
        </div>
      </div>
    </div>
  );
}

export default App;
