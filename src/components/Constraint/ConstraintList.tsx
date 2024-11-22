import React, { useEffect, useState } from 'react';
import ConstraintRepository, { Constraint, RequirementConstraint, RequirementRepository } from '../../repository/ConstraintRepository';
import ConstraintComponent from './Constraint';
import ConstraintForm from './ConstraintForm';
import { FaTrash, FaEdit } from 'react-icons/fa';
import RequirementForm from './RequirementForm';

function ConstraintList() {
    const [constraints, setConstraints] = useState<Constraint[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editingConstraint, setEditingConstraint] = useState<Constraint | undefined>(undefined);
    const [showRequirementForm, setShowRequirementForm] = useState(false);
    const [editingRequirement, setEditingRequirement] = useState<RequirementConstraint | undefined>(undefined);
    const [requirements, setRequirements] = useState<RequirementConstraint[]>([]);

    useEffect(() => {
        const repository = new ConstraintRepository();
        setConstraints(repository.getAllConstraints());

        const requirementRepository = new RequirementRepository();
        setRequirements(requirementRepository.getAllRequirements());
    }, []);

    const handleAddConstraint = (constraint: Constraint) => {
        const repository = new ConstraintRepository();
        if (editingConstraint) {
            repository.updateConstraint(constraint);
        } else {
            repository.addConstraint(constraint);
        }
        setConstraints(repository.getAllConstraints());
        setEditingConstraint(undefined);
    };

    const handleEditConstraint = (constraint: Constraint) => {
        setEditingConstraint(constraint);
        setShowForm(true);
    };

    const handleDeleteConstraint = (id: number) => {
        const repository = new ConstraintRepository();
        repository.removeConstraint(id);
        setConstraints(repository.getAllConstraints());
    };

    const handleAddRequirement = (requirement: RequirementConstraint) => {
        const requirementRepository = new RequirementRepository();
        if (editingRequirement) {
            requirementRepository.updateRequirement(requirement);
        } else {
            requirementRepository.addRequirement(requirement);
        }
        setRequirements(requirementRepository.getAllRequirements());
        setShowRequirementForm(false);
        setEditingRequirement(undefined);
    };

    const handleEditRequirement = (requirement: RequirementConstraint) => {
        setEditingRequirement(requirement);
        setShowRequirementForm(true);
    };

    const handleDeleteRequirement = (id: number) => {
        const requirementRepository = new RequirementRepository();
        requirementRepository.removeRequirement(id);
        setRequirements(requirementRepository.getAllRequirements());
    };

    return (
        <div className="constraint-list p-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setShowForm(true)}>Add Constraint</button>
            <button 
                className="bg-green-500 text-white px-4 py-2 rounded ml-2" 
                onClick={() => setShowRequirementForm(true)}
            >
                Add Required Supplement
            </button>
            <div className="grid grid-cols-1 gap-4 mt-4">
                {constraints.map((constraint) => (
                    <div key={constraint.id} className="card bg-white shadow-lg hover:shadow-xl rounded-lg p-4 border border-gray-200 transition-shadow duration-300">
                        <ConstraintComponent constraint={constraint} />
                        <div className="flex justify-end mt-2 border-t pt-2 gap-2">
                            <button 
                                className="text-gray-400 hover:text-blue-500 transition-colors duration-200" 
                                onClick={() => handleEditConstraint(constraint)}
                                title="Edit constraint"
                            >
                                <FaEdit className="h-4 w-4" />
                            </button>
                            <button 
                                className="text-gray-400 hover:text-red-500 transition-colors duration-200" 
                                onClick={() => handleDeleteConstraint(constraint.id)}
                                title="Delete constraint"
                            >
                                <FaTrash className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                ))}
                {requirements.map((requirement) => (
                    <div key={requirement.id} className="card bg-white shadow-lg hover:shadow-xl rounded-lg p-4 border border-gray-200 transition-shadow duration-300">
                        <div>Requirement supplement: {requirement.id}</div>
                        <div>Amount: {requirement.amount}</div>
                        <div>Supplement ID: {requirement.supplementId}</div>
                        <div className="flex justify-end mt-2 border-t pt-2 gap-2">
                            <button 
                                className="text-gray-400 hover:text-blue-500 transition-colors duration-200" 
                                onClick={() => handleEditRequirement(requirement)}
                                title="Edit requirement"
                            >
                                <FaEdit className="h-4 w-4" />
                            </button>
                            <button 
                                className="text-gray-400 hover:text-red-500 transition-colors duration-200" 
                                onClick={() => handleDeleteRequirement(requirement.id)}
                                title="Delete requirement"
                            >
                                <FaTrash className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {showForm && (
                <ConstraintForm 
                    onAddConstraint={handleAddConstraint} 
                    onClose={() => {
                        setShowForm(false);
                        setEditingConstraint(undefined);
                    }} 
                    constraint={editingConstraint}
                />
            )}
            {showRequirementForm && (
                <RequirementForm 
                    onAddRequirement={handleAddRequirement} 
                    onClose={() => {
                        setShowRequirementForm(false);
                        setEditingRequirement(undefined);
                    }} 
                    requirement={editingRequirement}
                />
            )}
        </div>
    );
}

export default ConstraintList;
