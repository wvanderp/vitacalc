import React, { useEffect, useState } from 'react';
import SupplementRepository, { Supplement } from '../../repository/SupplementRepository';
import SupplementComponent from './Supplement';
import SupplementForm from './SupplementForm';
import { FaTrash, FaEdit } from 'react-icons/fa';

function SupplementList() {
    const [supplements, setSupplements] = useState<Supplement[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editingSupplement, setEditingSupplement] = useState<Supplement | undefined>(undefined);

    useEffect(() => {
        const repository = new SupplementRepository();
        setSupplements(repository.getAllSupplements());
    }, []);

    const handleAddSupplement = (supplement: Supplement) => {
        const repository = new SupplementRepository();
        if (editingSupplement) {
            repository.updateSupplement(supplement);
        } else {
            repository.addSupplement(supplement);
        }
        setSupplements(repository.getAllSupplements());
        setEditingSupplement(undefined);
    };

    const handleEditSupplement = (supplement: Supplement) => {
        setEditingSupplement(supplement);
        setShowForm(true);
    };

    const handleDeleteSupplement = (id: number) => {
        const repository = new SupplementRepository();
        repository.removeSupplement(id);
        setSupplements(repository.getAllSupplements());
    };

    return (
        <div className="supplement-list p-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setShowForm(true)}>Add Supplement</button>
            <div className="grid grid-cols-1 gap-4 mt-4">
                {supplements.map((supplement) => (
                    <div key={supplement.id} className="card bg-white shadow-lg hover:shadow-xl rounded-lg p-4 border border-gray-200 transition-shadow duration-300">
                        <SupplementComponent supplement={supplement} />
                        <div className="flex justify-end mt-2 border-t pt-2 gap-2">
                            <button 
                                className="text-gray-400 hover:text-blue-500 transition-colors duration-200" 
                                onClick={() => handleEditSupplement(supplement)}
                                title="Edit supplement"
                            >
                                <FaEdit className="h-4 w-4" />
                            </button>
                            <button 
                                className="text-gray-400 hover:text-red-500 transition-colors duration-200" 
                                onClick={() => handleDeleteSupplement(supplement.id)}
                                title="Delete supplement"
                            >
                                <FaTrash className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {showForm && (
                <SupplementForm 
                    onAddSupplement={handleAddSupplement} 
                    onClose={() => {
                        setShowForm(false);
                        setEditingSupplement(undefined);
                    }} 
                    supplement={editingSupplement}
                />
            )}
        </div>
    );
}

export default SupplementList;
