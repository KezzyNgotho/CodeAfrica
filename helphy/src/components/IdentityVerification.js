import React, { useState, useEffect } from 'react';
import { Button, Form, Spinner, Alert, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Web3 from 'web3';
import { Link } from 'react-router-dom'; 
import '../styles/IdentityVerification.css'; 
import doctorImage from '../assets/pexels-negativespace-48604.jpg'; 
import { FaCapsules } from 'react-icons/fa';

const IdentityVerification = () => {
    const [web3, setWeb3] = useState(null);
   
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    
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
                // Initialize contract instance
            }
        };

        initContract();
    }, [web3]);

    return (
        <div>
           <Navbar bg="light" expand="lg" style={{ padding: '5px 20px', marginBottom: '20px' }}>
    <Navbar.Brand href="#">
        <FaCapsules style={{ marginRight: '5px', color: 'pink' }} />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto"> 
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
                        <Button variant="primary" disabled={loading}>
                            {loading ? (
                                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                            ) : (
                                'Verify Identity'
                            )}
                        </Button>
                    </Form>
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
