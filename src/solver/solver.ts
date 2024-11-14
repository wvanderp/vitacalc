export type Constraints = {
    [key: string]: {
        target: number;
        max: number;
    }
}

export type Option = {
    id: string;
    ingredients: {
        name: string;
        amount: number;
    }[]
}

export type Options = Option[]

export function solve(constraints: Constraints, options: Options): [number, Option][][]{
    const combinations = generateAllCombinations(options.map(option => maximumNumberOfSupplement(option, constraints)));

    const results: [number, Option][][] = combinations.map((combination): [number, Option][] => {
        return combination.map((count, index) => [count, options[index]]);
    })
    // filter out the results that exceed the constraints
    .filter(supplements => !AmountsExceedConstraints(calculateAmounts(supplements), constraints))
    // sort the results by % of target, closest to target first
    .sort((a, b) => {
        const aAmounts = calculateAmounts(a);
        const bAmounts = calculateAmounts(b);

        const aDistance = Object.entries(aAmounts).reduce((sum, [key, value]) => {
            const constraint = constraints[key];
            if (constraint) {
                return sum + Math.abs(constraint.target - value);
            } else {
                return sum;
            }
        }, 0);

        const bDistance = Object.entries(bAmounts).reduce((sum, [key, value]) => {
            const constraint = constraints[key];
            if (constraint) {
                return sum + Math.abs(constraint.target - value);
            } else {
                return sum;
            }
        }, 0);

        return aDistance - bDistance;
    });

    return results
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
