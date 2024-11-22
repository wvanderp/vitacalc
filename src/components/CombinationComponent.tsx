import React from 'react';
import { SolverResult } from '../solver/solver';

interface CombinationComponentProps {
  combination: SolverResult;
}

const CombinationComponent: React.FC<CombinationComponentProps> = ({ combination }) => {
  // Calculate summed components
  const summedComponents = combination.supplements.reduce((acc, [count, supplement]) => {
    supplement.ingredients.forEach((ingredient) => {
      acc[ingredient.name] = (acc[ingredient.name] || 0) + ingredient.amount * count;
    });
    return acc;
  }, {} as Record<string, number>);

  return (
    <div>
      <p>distance: {combination.distance}</p>
      <p>number of supplements: {combination.numberOfSupplements}</p>
      {combination.supplements.map(([count, supplement], idx) => (
          <p key={idx}>Supplement: <b>{count}x</b> {supplement.name}</p>
      ))}
      <table>
        <thead>
          <tr>
            <th>Component</th>
            <th>Summed</th>
            <th>Target</th>
            <th>Max</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(summedComponents).map((key) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{summedComponents[key]}</td>
              <td>{combination.constraints[key]?.target ?? '-'}</td>
              <td>{combination.constraints[key]?.max ?? '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CombinationComponent;
