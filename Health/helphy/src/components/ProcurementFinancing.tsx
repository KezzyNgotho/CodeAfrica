import React from 'react';
import { Button } from 'react-bootstrap';

interface ProcurementFinancingProps {
    financeProcurement: (amount: number) => Promise<void>;
}

const ProcurementFinancing: React.FC<ProcurementFinancingProps> = ({ financeProcurement }) => {
    const handleFinanceProcurement = async () => {
        try {
            await financeProcurement(100); // Example amount
            alert('Procurement financed successfully');
        } catch (error) {
            console.error('Error financing procurement:', error);
            alert('Error financing procurement');
        }
    };
    
    return (
        <div className="procurement-financing-container">
            <h2 className="section-title">Procurement Financing</h2>
            <p className="section-description">
                Procurement financing enables businesses to obtain funds for purchasing goods or services needed for their operations.
                This section allows you to finance procurement with the specified amount.
            </p>
            <Button variant="primary" className="finance-button" onClick={handleFinanceProcurement}>
                Finance Procurement
            </Button>
        </div>
    );
};

export default ProcurementFinancing;
