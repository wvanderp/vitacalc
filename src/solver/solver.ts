import { Supplement } from '../repository/SupplementRepository';

export type Constraints = {
    [key: string]: {
        target: number;
        max: number;
    }
}

export type Option = Supplement;

export type Options = Option[]

export type SolverResult = {
    supplements: [number, Option][];
    distance: number;
    numberOfSupplements: number;
    constraints: Constraints; // Add this line
}

export type RequiredSupplement = {
    supplement: Option;
    amount: number;
}

export function solve(constraints: Constraints, options: Options, requiredSupplements: RequiredSupplement[] = []): SolverResult[] {
    const combinations = generateAllCombinations(options.map(option => maximumNumberOfSupplement(option, constraints)));

    const results: SolverResult[] = combinations.map((combination): [number, Option][] => {
        return combination.map((count, index) => [count, options[index]]);
    })
    // filter out the results that don't include all required supplements
    .filter(supplements => requiredSupplements.every(required => supplements.some(([count, option]) => option === required.supplement && count >= required.amount)))
    // filter out the results that exceed the constraints
    .filter(supplements => !AmountsExceedConstraints(calculateAmounts(supplements), constraints))
    .map<SolverResult>(supplements => {
        // include the distance from the target in the result
        
        // first calculate the % from the target for each ingredient
        const amounts = calculateAmounts(supplements);
        const distances = Object.entries(amounts).map(([key, value]) => {
            const constraint = constraints[key];
            if (constraint) {
                return Math.abs(value - constraint.target) / constraint.target;
            }
            return 0;
        });

        // then calculate the total distance
        const distance = distances.reduce((sum, distance) => sum + distance, 0);

        return {
            supplements,
            distance,
            numberOfSupplements: supplements.reduce((sum, [count]) => sum + count, 0)
        };

    })
    // sort the results by % of target, closest to target first and then by number of supplements
    .sort((a, b) => {
        if (a.distance === b.distance) {
            return a.numberOfSupplements - b.numberOfSupplements;
        }
        return a.distance - b.distance
    });

    return results.map(result => ({
        ...result,
        constraints // Attach constraints to each SolverResult
    }));
}

export function calculateAmounts(supplements: [number, Options[0]][]): Record<string, number> {
    const result: Record<string, number> = {};

    for (const [amount, option] of supplements) {
        for (const ingredient of option.ingredients) {
            if (result[ingredient.name] === undefined) {
                result[ingredient.name] = 0;
            }
            result[ingredient.name] += ingredient.amount * amount;
        }
    }

    return result;
}

export function AmountsExceedConstraints(amounts: Record<string, number>, constraints: Constraints): boolean {
    for (const [key, value] of Object.entries(amounts)) {
        const constraint = constraints[key];
        if (constraint) {
            if (value > constraint.max) {
                return true;
            }
        }
    }

    return false;
}

export function maximumNumberOfSupplement(supplement: Option, constraints: Constraints): number {
    let maxSupplements = Infinity;

    for (const ingredient of supplement.ingredients) {
        const constraint = constraints[ingredient.name];
        if (constraint) {
            const maxForIngredient = Math.floor(constraint.max / ingredient.amount);
            maxSupplements = Math.min(maxSupplements, maxForIngredient);
        }
    }

    if (maxSupplements === Infinity) {
        return 100;
    }

    return maxSupplements;
}

/**
 * generates all possible combinations of supplements
 * so all numbers count down from maxCounts to 0
 * @param maxCounts 
 * @returns 
 */
export function generateAllCombinations(maxCounts: number[]): number[][] {
    // calculate the number of possible combinations
    const numberOfCombinations = maxCounts.reduce((product, count) => product * (count + 1), 1);

    console.log('Number of combinations:', numberOfCombinations, maxCounts);

    if (numberOfCombinations > 1000000) {
        throw new Error('Too many combinations');
    }

    const results: number[][] = [];

    function helper(index: number, current: number[]) {
        if (index === maxCounts.length) {
            results.push(current.slice());
            return;
        }
        for (let count = 0; count <= maxCounts[index]; count++) {
            current.push(count);
            helper(index + 1, current);
            current.pop();
        }
    }

    if (maxCounts.length > 0) {
        helper(0, []);
    } else {
        return [];
    }

    return results;
}
