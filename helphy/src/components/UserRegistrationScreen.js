 import React, { useEffect, useState } from 'react';
import { Button, Form, Spinner, Alert, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../RegistrationScreen.css';
import UserRegistration from '../abis/UserRegistration.json'; // Assuming UserRegistration.json is your smart contract ABI file
import Web3 from 'web3';



const RegistrationScreen = ({ userAddress }) => {
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [Web3 , setWeb] = useState (undefined);
  const [Contract , setContract] = useState(undefined);
  const [UserRegistration ,setRegistration ] = useState(undefined);
 

  useEffect (async () => {
const Web3 = getWeb3();
const Contract = await getContract(Web3);
const UserRegistration = await Contract.methods.UserRegistration().call();

setWeb3(Web3);
setContract(Contract);
setUserRegistration(UserRegistration)

})
  
 
  return (
    <div className="background-image-container">
      <div className="background-overlay"></div>
      <Navbar bg="light" expand="lg" className="navbar">
        <Navbar.Brand href="#">PharmaChain</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">About</Nav.Link>
            <Nav.Link href="#">Contact</Nav.Link>
            <Nav.Link href="#">Services</Nav.Link>
            <Nav.Link href="/Dash">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="container mt-5">
        <h2 className="text-center mb-4">User Registration Form</h2>
        <div className="registration-form-container">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Control as="select" value={role} onChange={(e) => setRole(e.target.value)} custom>
                <option value="">Select Role</option>
                <option value="hospital">Hospital</option>
                <option value="patient">Patient</option>
                <option value="supplier">Supplier</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </Form.Group>
            {error && <Alert variant="danger">{error}</Alert>}
            <Button variant="primary" type="submit" disabled={loading} block>
              {loading ? (
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              ) : (
                'Register'
              )}
            </Button>
          </Form>
        </div>
      </div>

      <footer className="footer">
        <div className="container text-center">
          <p>&copy; 2024 PharmaChain. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default RegistrationScreen;