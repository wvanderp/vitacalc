import React from 'react';
import { Constraint } from '../../repository/ConstraintRepository';

interface ConstraintProps {
  constraint: Constraint;
}

function ConstraintComponent({ constraint }: ConstraintProps) {
    return (
        <div>
            <h2>{constraint.name}</h2>
            <p>Target: {constraint.target}</p>
            <p>Max: {constraint.max}</p>
        </div>
    );
}

export default ConstraintComponent;
