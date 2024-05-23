import React, { useState, ChangeEvent } from 'react';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';

interface MedicineAvailabilityProps {
  medicineAvailabilityContract: {
    checkAvailabilityById: (id: string) => Promise<{ id: string; name: string; availability: boolean }>;
    checkAvailabilityByName: (name: string) => Promise<{ id: string; name: string; availability: boolean }>;
  };
}

const MedicineAvailability: React.FC<MedicineAvailabilityProps> = ({ medicineAvailabilityContract }) => {
  const [searchType, setSearchType] = useState<string>('id');
  const [searchValue, setSearchValue] = useState<string>('');
  const [medicineId, setMedicineId] = useState<string>('');
  const [medicineName, setMedicineName] = useState<string>('');
  const [availability, setAvailability] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleCheckAvailability = async () => {
    try {
      let result;
      if (searchType === 'id') {
        result = await medicineAvailabilityContract.checkAvailabilityById(searchValue);
      } else {
        result = await medicineAvailabilityContract.checkAvailabilityByName(searchValue);
      }
      setMedicineId(result.id);
      setMedicineName(result.name);
      setAvailability(result.availability);
      setErrorMessage('');
    } catch (error) {
      console.error('Error checking medicine availability:', error);
      setMedicineId('');
      setMedicineName('');
      setAvailability(null);
      setErrorMessage('Error checking medicine availability');
    }
  };

  const handleSearchValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearchTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSearchType(event.target.value);
    setSearchValue(''); // Reset search value when search type changes
    setMedicineId('');
    setMedicineName('');
    setAvailability(null);
    setErrorMessage('');
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <h2 className="mb-4">Check Medicine Availability</h2>
          <Form>
            <Form.Group controlId="searchType">
              <Form.Label>Search By</Form.Label>
              <Form.Control as="select" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                <option value="">Select</option>
                <option value="id">Medicine ID</option>
                <option value="name">Medicine Name</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="searchValue">
              <Form.Label>{searchType === 'id' ? 'Enter Medicine ID' : 'Enter Medicine Name'}</Form.Label>
              <Form.Control
                type="text"
                placeholder={searchType === 'id' ? 'Enter ID' : 'Enter Name'}
                value={searchValue}
                onChange={handleSearchValueChange}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleCheckAvailability}>Check Availability</Button>
          </Form>
        </Col>
      </Row>
      {medicineId && medicineName && availability !== null && (
        <Row className="mt-4">
          <Col>
            <h4>Medicine Details</h4>
            <p><strong>Medicine ID:</strong> {medicineId}</p>
            <p><strong>Medicine Name:</strong> {medicineName}</p>
            <p><strong>Availability:</strong> {availability ? 'Available' : 'Not Available'}</p>
          </Col>
        </Row>
      )}
      {errorMessage && (
        <Row className="mt-4">
          <Col>
            <Alert variant="danger">{errorMessage}</Alert>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default MedicineAvailability;
