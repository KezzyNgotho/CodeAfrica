import React, { useState, ChangeEvent } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

interface DynamicPricingComponentProps {
  updateMedicinePrice: (medicineId: number, newPrice: number) => Promise<void>;
}

const DynamicPricingComponent: React.FC<DynamicPricingComponentProps> = ({ updateMedicinePrice }) => {
  const [pin, setPin] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [newPrice, setNewPrice] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [authSuccess, setAuthSuccess] = useState<boolean>(false);

  const handleAuthenticate = () => {
    if (pin === '1234') {
      setAuthSuccess(true);
      setErrorMessage('');
    } else {
      setErrorMessage('Incorrect PIN. Please try again.');
    }
  };

  const handleUpdateMedicinePrice = async () => {
    try {
      const parsedNewPrice = parseFloat(newPrice);
      if (isNaN(parsedNewPrice) || parsedNewPrice <= 0) {
        setErrorMessage('Please enter a valid price.');
        return;
      }
      await updateMedicinePrice(1, parsedNewPrice); // Example medicineId and newPrice
      setSuccessMessage('Medicine price updated successfully');
      setErrorMessage('');
    } catch (error) {
      console.error('Error updating medicine price:', error);
      setErrorMessage('Error updating medicine price');
    }
  };

  const handlePinChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPin(event.target.value);
    setErrorMessage(''); // Clear error message when PIN is being typed
  };

  const handleNewPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewPrice(event.target.value);
    setSuccessMessage(''); // Clear success message when new price is being typed
  };

  return (
    <div className="dynamic-pricing-container">
      {!authSuccess && (
        <Form>
          <h2 className="dynamic-pricing-title">Enter PIN to continue</h2>
          <Form.Group controlId="pin">
            <Form.Control
              type="password"
              placeholder="Enter PIN"
              value={pin}
              onChange={handlePinChange}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleAuthenticate}>
            Authenticate
          </Button>
          {errorMessage && <Alert variant="danger" className="error-message">{errorMessage}</Alert>}
        </Form>
      )}
      {authSuccess && (
        <div>
          <h2 className="dynamic-pricing-title">Dynamic Pricing Mechanism</h2>
          <Form.Group controlId="newPrice">
            <Form.Control
              type="number"
              placeholder="Enter New Price"
              value={newPrice}
              onChange={handleNewPriceChange}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleUpdateMedicinePrice}>
            Update Medicine Price
          </Button>
          {successMessage && <Alert variant="success" className="success-message">{successMessage}</Alert>}
          {errorMessage && <Alert variant="danger" className="error-message">{errorMessage}</Alert>}
        </div>
      )}
    </div>
  );
};

export default DynamicPricingComponent;
