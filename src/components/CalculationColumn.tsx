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
    <div className="h-full flex flex-col p-6">
        <button 
            onClick={handleCalculate} 
            className="inline-flex items-center justify-center px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
            Calculate Combinations
        </button>
        <div className="flex-1 overflow-auto mt-6">
            {results.length > 0 && (
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Found {results.length} results:
                </h2>
            )}
            <div className="space-y-6">
                {results.map((result, index) => (
                    <CombinationComponent key={index} combination={result} />
                ))}
            </div>
        </div>
    </div>
  );
}

export default CalculationColumn;
