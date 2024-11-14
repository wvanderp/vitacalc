import Repository from './repository';

export interface Constraint {
    id: number;
    name: string;
    
    max: number;
    target: number;
}

class ConstraintRepository extends Repository<Constraint[]> {
    constructor() {
        super('constraints', []);
    }

    addConstraint(constraint: Constraint): void {
        this.data.push(constraint);
        this.save();
    }

    removeConstraint(constraintId: number): void {
        this.data = this.data.filter((constraint) => constraint.id !== constraintId);
        this.save();
    }

    updateConstraint(constraint: Constraint): boolean {
        const index = this.data.findIndex((c) => c.id === constraint.id);
        if (index === -1) return false;

        this.data[index] = constraint;
        this.save();
        return true;
    }

    getAllConstraints(): Constraint[] {
        return this.data;
    }
}

export default ConstraintRepository;
