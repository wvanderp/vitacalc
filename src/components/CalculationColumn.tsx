import React, { useState } from 'react';
import SupplementRepository, { Supplement } from '../repository/SupplementRepository';
import ConstraintRepository, { RequirementRepository } from '../repository/ConstraintRepository';
import { solve, SolverResult } from '../solver/solver';
import CombinationComponent from './CombinationComponent';

function CalculationColumn() {
  const [results, setResults] = useState<SolverResult[]>([]);

  const handleCalculate = () => {
    const supplementRepo = new SupplementRepository();
    const constraintRepo = new ConstraintRepository();
    const requiredSupplements = new RequirementRepository();
    const supplements = supplementRepo.getAllSupplements();
    const constraints = constraintRepo.getAllConstraints().reduce((acc, constraint) => {
      acc[constraint.name] = { target: constraint.target, max: constraint.max };
      return acc;
    }, {} as Record<string, { target: number; max: number }>);
    const required = requiredSupplements.getAllRequirements().map((requirement) => ({
      supplement: supplements.find((s) => s.id === requirement.supplementId),
      amount: requirement.amount,
    }))
    .filter((requirement) => requirement.supplement !== undefined) as { supplement: Supplement; amount: number }[];

    const result = solve(constraints, supplements, required);
    setResults(result);
  };

  return (
    <div className="flex-1 p-4 border border-black">
      <button onClick={handleCalculate} className="bg-blue-500 text-white p-2 rounded">
        Calculate
      </button>
      {results.length > 0 && <h2 className="mt-4">found {results.length} results:</h2>}
      {results.map((result, index) => (
        <div key={index} className="mt-4 p-4 border border-gray-300">
          <CombinationComponent combination={result} />
        </div>
      ))}
    </div>
  );
}

export default CalculationColumn;
