import React, { useState, useEffect } from 'react';
import { Button, Form, Spinner, Alert, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Web3 from 'web3';
import '../RegistrationScreen.css';
import { useWalletClient, usePublicClient } from 'wagmi';
import { userRegistrationABI, userRegistrationAddress } from "../constants/constants"; // Adjust the import path accordingly

// Define an interface for the additional details
interface AdditionalDetails {
  medicalHistory?: string;
  licenseNumber?: string;
  location?: string;
  address?: string;
  companyName?: string;
  contactInfo?: string;
  postalCode?: string; // New property added
}

const RegistrationScreen: React.FC = () => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [role, setRole] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [additionalDetails, setAdditionalDetails] = useState<AdditionalDetails>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState<boolean>(false);

  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  useEffect(() => {
    const initWeb3 = async () => {
      if ((window as any).ethereum) {
        try {
          await (window as any).ethereum.enable();
          const _web3 = new Web3((window as any).ethereum);
          setWeb3(_web3);
          setIsMetaMaskConnected(true);
        } catch (error) {
          setIsMetaMaskConnected(false);
          console.error('User denied account access');
        }
      } else if ((window as any).web3) { // Check if window.web3 exists
        const _web3 = new Web3((window as any).web3.currentProvider);
        setWeb3(_web3);
        setIsMetaMaskConnected(true);
      } else {
        setIsMetaMaskConnected(false);
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
    };
  
    initWeb3();
  }, []);
  


  const handleMetaMaskConnect = async () => {
    try {
      const accounts = await web3?.eth.requestAccounts();
      if (accounts) {
        setIsMetaMaskConnected(accounts.length > 0);
      } else {
        setError('Failed to retrieve accounts from MetaMask');
      }
    } catch (err: any) { // Explicitly define the type of err as any or Error
      setError(err.message || 'An error occurred while connecting to MetaMask');
    }
  };
  
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
  
    if (!isMetaMaskConnected) {
      setError('Please connect your MetaMask wallet first.');
      return;
    }
  
    try {
      // Assuming you want to reset the form after successful creation
      setRole('');
      setUsername('');
      setAdditionalDetails({});
      setError('');
  
      // Ensure accounts is not undefined before proceeding
      if (!web3 ||!web3.eth.accounts) {
        setError('Web3 instance or accounts are not available.');
        return;
      }
  
      // Call createUser here after setting up the form
      await createUser();
    } catch (err :any) {
      setError(err.message || 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };
  
  

  const createUser = async () => {
    if (walletClient) {
      try {
        let hash;
        switch (role) {
          case 'Patient':
            hash = await walletClient.writeContract({
              abi: userRegistrationABI,
              address: userRegistrationAddress,
              functionName: 'registerPatient',
              args: [username, additionalDetails.medicalHistory]
            });
            break;
          case 'Hospital':
            hash = await walletClient.writeContract({
              abi: userRegistrationABI,
              address: userRegistrationAddress,
              functionName: 'registerHospital',
              args: [username, additionalDetails.licenseNumber, additionalDetails.location]
            });
            break;
          case 'Pharmacy':
            hash = await walletClient.writeContract({
              abi: userRegistrationABI,
              address: userRegistrationAddress,
              functionName: 'registerPharmacy',
              args: [username, additionalDetails.licenseNumber, additionalDetails.address]
            });
            break;
          case 'Supplier':
            hash = await walletClient.writeContract({
              abi: userRegistrationABI,
              address: userRegistrationAddress,
              functionName: 'registerSupplier',
              args: [username, additionalDetails.companyName, additionalDetails.contactInfo]
            });
            break;
          default:
            throw new Error('Invalid role');
        }
        await publicClient?.waitForTransactionReceipt({ hash });
      } catch (error) {
        console.error("Error", error);
      }
    }
  };

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
        {!isMetaMaskConnected && (
          <div className="metamask-connect">
            <p>Please connect your MetaMask wallet to proceed.</p>
            <Button variant="primary" onClick={handleMetaMaskConnect}>Connect MetaMask</Button>
          </div>
        )}
          
        {isMetaMaskConnected && (
          <div className="registration-form-container">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formRole">
                <Form.Label>Select Role</Form.Label>
                <Form.Control as="select" value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Select</option>
                  <option value="Patient">Patient</option>
                  <option value="Hospital">Hospital</option>
                  <option value="Pharmacy">Pharmacy</option>
                  <option value="Supplier">Supplier</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formAdditionalDetails">
                <Form.Label>Additional Details</Form.Label>
                {role === 'Patient' && (
                  <Form.Control
                    type="text"
                    placeholder="Enter your medical history (optional)"
                    value={additionalDetails.medicalHistory || ''}
                    onChange={(e) => setAdditionalDetails({ ...additionalDetails, medicalHistory: e.target.value })}
                  />
                )}
                {role === 'Hospital' && (
                  <>
                    <Form.Control
                      type="text"
                      placeholder="Enter your hospital license number"
                      value={additionalDetails.licenseNumber || ''}
                      onChange={(e) => setAdditionalDetails({ ...additionalDetails, licenseNumber: e.target.value })}
                    />
                    <Form.Control
                      type="text"
                      placeholder="Enter your hospital location (optional)"
                      value={additionalDetails.location || ''}
                      onChange={(e) => setAdditionalDetails({ ...additionalDetails, location: e.target.value })}
                    />
                  </>
                )}
                {role === 'Pharmacy' && (
                  <>
                    <Form.Control
                      type="text"
                      placeholder="Enter your pharmacy license number"
                      value={additionalDetails.licenseNumber || ''}
                      onChange={(e) => setAdditionalDetails({ ...additionalDetails, licenseNumber: e.target.value })}
                    />
                    <Form.Control
                      type="text"
                      placeholder="Enter your pharmacy address"
                      value={additionalDetails.address || ''}
                      onChange={(e) => setAdditionalDetails({ ...additionalDetails, address: e.target.value })}
                    />
                  </>
                )}
                {role === 'Supplier' && (
                  <>
                    <Form.Control
                      type="text"
                      placeholder="Enter your supplier company name"
                      value={additionalDetails.companyName || ''}
                      onChange={(e) => setAdditionalDetails({ ...additionalDetails, companyName: e.target.value })}
                    />
                    <Form.Control
                      type="text"
                      placeholder="Enter your supplier contact information"
                      value={additionalDetails.contactInfo || ''}
                      onChange={(e) => setAdditionalDetails({ ...additionalDetails, contactInfo: e.target.value })}
                    />
                  </>
                )}
              </Form.Group>
              {error && <Alert variant="danger">{error}</Alert>}
              <Button variant="primary" type="submit" disabled={loading} onClick={() => createUser()}>
                {loading ? (
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                ) : (
                  'Register'
                )}
              </Button>
            </Form>
          </div>
        )}
      </div>
      <footer className="footer">
        <div className="container text-center">
          <p>&copy; {new Date().getFullYear()} PharmaChain. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default RegistrationScreen;