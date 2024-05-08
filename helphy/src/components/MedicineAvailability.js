import React, { useState } from 'react';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
//import '../../src/styles/MedicineAvailability.css'

const MedicineAvailability = ({ medicineAvailabilityContract }) => {
  const [searchType, setSearchType] = useState('id');
  const [searchValue, setSearchValue] = useState('');
  const [medicineId, setMedicineId] = useState('');
  const [medicineName, setMedicineName] = useState('');
  const [availability, setAvailability] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCheckAvailability = async () => {
    try {
      let result;
      if (searchType === 'id') {
        result = await medicineAvailabilityContract.checkAvailabilityById(medicineId);
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
      setAvailability('');
      setErrorMessage('Error checking medicine availability');
    }
  };

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
    setSearchValue(''); // Reset search value when search type changes
    setMedicineId('');
    setMedicineName('');
    setAvailability('');
    setErrorMessage('');
  };

  const handleSearchValueChange = (event) => {
    setSearchValue(event.target.value);
    setMedicineId('');
    setMedicineName('');
    setAvailability('');
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
              <Form.Control as="select" value={searchType} onChange={handleSearchTypeChange}>
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
