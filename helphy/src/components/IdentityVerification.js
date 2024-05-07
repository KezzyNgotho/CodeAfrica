import React, { useState, useEffect } from 'react';
import { Button, Form, Spinner, Alert, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Web3 from 'web3';
import identityVerificationABI from '../abis/IdentityVerification.json';
import { Link } from 'react-router-dom'; // assuming you're using React Router for navigation
import '../styles/IdentityVerification.css'; // Import CSS file for styling
import doctorImage from '../assets/pexels-negativespace-48604.jpg'; // Import medical-themed image
import { FaCapsules } from 'react-icons/fa';

const IdentityVerification = () => {
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [isValidUsername, setIsValidUsername] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const initWeb3 = async () => {
            if (window.ethereum) {
                const web3Instance = new Web3(window.ethereum);
                await window.ethereum.enable();
                setWeb3(web3Instance);
            } else if (window.web3) {
                const web3Instance = new Web3(window.web3.currentProvider);
                setWeb3(web3Instance);
            } else {
                console.error('No Ethereum provider detected');
            }
        };

        initWeb3();
    }, []);

    useEffect(() => {
        const initContract = async () => {
            if (web3) {
                const networkId = await web3.eth.net.getId();
                const deployedNetwork = identityVerificationABI.networks[networkId];
                const instance = new web3.eth.Contract(
                    identityVerificationABI.abi,
                    deployedNetwork && deployedNetwork.address,
                );
                setContract(instance);
            }
        };

        initContract();
    }, [web3]);

    const verifyIdentity = async () => {
        try {
            setLoading(true);
            const accounts = await web3.eth.getAccounts();
            const isValid = await contract.methods.isUsernameValid(username).call({ from: accounts[0] });
            setIsValidUsername(isValid);
            if (isValid) {
                console.log('Identity verified for username:', username);
                // Redirect to dashboard upon successful verification
                window.location.href = '/dashboard';
            } else {
                setError('Username does not exist. Please enter a valid username or register.');
            }
        } catch (error) {
            console.error(error);
            setError('An error occurred while verifying identity. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
           <Navbar bg="light" expand="lg" style={{ padding: '5px 20px', marginBottom: '20px' }}>
    <Navbar.Brand href="#">
        <FaCapsules style={{ marginRight: '5px', color: 'pink' }} />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto"> {/* Added ml-auto class */}
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">About</Nav.Link>
            <Nav.Link href="#">Contact</Nav.Link>
            <Nav.Link href="#">Services</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
        </Nav>
    </Navbar.Collapse>
</Navbar>

            <div className="background-image">
                <img src={doctorImage} alt="Doctor" className="doctor-image" />
            </div>
            <div className="container mt-5">
                <div className="top-bar">
                    <h1 className="caligraphed-heading">Medical Identity Verification</h1>
                    <p className="sub-heading">Verify your identity to access our services.</p>
                </div>
                <div className="verification-form">
                    <Form>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </Form.Group>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Button variant="primary" onClick={verifyIdentity} disabled={loading}>
                            {loading ? (
                                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                            ) : (
                                'Verify Identity'
                            )}
                        </Button>
                    </Form>
                    {!isValidUsername && (
                        <div className="error-message">
                            <p>Username does not exist. Please <Link to="/register">register</Link> or try again.</p>
                        </div>
                    )}
                </div>
            </div>
            {/* Footer Section */}
            <footer style={{ backgroundColor: '#f8f9fa', padding: '20px', textAlign: 'center', marginTop: 'auto' }}>
    <p>&copy; 2024 Medical Verification. All rights reserved.</p>
</footer>

        </div>
    );
};

export default IdentityVerification;
