import React from 'react';
import { Option } from '../solver/solver';

interface CombinationComponentProps {
  combination: [number, Option, number][];
}

const CombinationComponent: React.FC<CombinationComponentProps> = ({ combination }) => {
  return (
    <div>
      {combination.map(([count, supplement], idx) => (
          <p key={idx}>Supplement: <b>{count}x</b> {supplement.name}</p>
      ))}
    </div>
  );
};

export default CombinationComponent;
