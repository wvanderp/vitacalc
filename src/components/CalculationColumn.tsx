import React, { useState } from 'react';
import SupplementRepository from '../repository/SupplementRepository';
import ConstraintRepository from '../repository/ConstraintRepository';
import { Option, solve } from '../solver/solver';
import CombinationComponent from './CombinationComponent';

function CalculationColumn() {
  const [results, setResults] = useState<[number, Option][][]>([]);

  const handleCalculate = () => {
    const supplementRepo = new SupplementRepository();
    const constraintRepo = new ConstraintRepository();
    const supplements = supplementRepo.getAllSupplements();
    const constraints = constraintRepo.getAllConstraints().reduce((acc, constraint) => {
      acc[constraint.name] = { target: constraint.target, max: constraint.max };
      return acc;
    }, {} as Record<string, { target: number; max: number }>);

    const result = solve(constraints, supplements);
    setResults(result);
  };

  return (
    <div className="flex-1 p-4 border border-black">
      <button onClick={handleCalculate} className="bg-blue-500 text-white p-2 rounded">
        Calculate
      </button>
      {results.map((result, index) => (
        <div key={index} className="mt-4 p-4 border border-gray-300">
          <CombinationComponent combination={result} /> {/* Use the new component */}
        </div>
      ))}
    </div>
  );
}

export default CalculationColumn;
