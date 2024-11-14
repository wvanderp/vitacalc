
import React from 'react';
import { Supplement } from '../repository/SupplementRepository';

interface SupplementProps {
  supplement: Supplement;
}

function SupplementComponent({ supplement }: SupplementProps) {
    return (
        <div>
            <h2>{supplement.name}</h2>
            <p>Maker: {supplement.maker}</p>
            {supplement.image && <img src={supplement.image} alt={supplement.name} />}
            <ul>
                {supplement.ingredients.map((ingredient, index) => (
                    <li key={index}>
                        {ingredient.name}: {ingredient.amount} mg
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SupplementComponent;
