import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import '../RegistrationScreen.css';
import { useWalletClient, usePublicClient } from 'wagmi';
import { userRegistrationABI, userRegistrationAddress } from "../constants/constants"; // Adjust the import path accordingly

const RegistrationScreen = () => {
  const [web3, setWeb3] = useState(null);
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);

  const {data: walletClient} = useWalletClient();
  const publicClient = usePublicClient();

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.enable();
          const _web3 = new Web3(window.ethereum);
          setWeb3(_web3);
          setIsMetaMaskConnected(true);
        } catch (error) {
          setIsMetaMaskConnected(false);
          console.error('User denied account access');
        }
      } else if (window.web3) {
        const _web3 = new Web3(window.web3.currentProvider);
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
      const accounts = await web3.eth.requestAccounts();
      setIsMetaMaskConnected(accounts.length > 0);
    } catch (err) {
      setError(err.message || 'An error occurred while connecting to MetaMask');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!isMetaMaskConnected) {
        setError('Please connect your MetaMask wallet first.');
        return;
      }

      // Check if the user has MetaMask identity here
      // Navigate to dashboard if MetaMask identity exists
      // Redirect logic to dashboard here

      setRole('');
      setUsername('');
      setAdditionalDetails({});
      setError('');
    } catch (err) {
      setError(err.message || 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  const createUser = async () => {
    if (walletClient) {
      try {
        let hash;
        if (role === 'Patient') {
          hash = await walletClient.writeContract({
            abi: userRegistrationABI,
            address: userRegistrationAddress,
            functionName: 'registerPatient',
            args: [username, additionalDetails.medicalHistory]
          });
        } else if (role === 'Hospital') {
          hash = await walletClient.writeContract({
            abi: userRegistrationABI,
            address: userRegistrationAddress,
            functionName: 'registerHospital',
            args: [username, additionalDetails.licenseNumber, additionalDetails.location]
          });
        } else if (role === 'Pharmacy') {
          hash = await walletClient.writeContract({
            abi: userRegistrationABI,
            address: userRegistrationAddress,
            functionName: 'registerPharmacy',
            args: [username, additionalDetails.licenseNumber, additionalDetails.postalAddress]
          });
        } else if (role === 'Supplier') {
          hash = await walletClient.writeContract({
            abi: userRegistrationABI,
            address: userRegistrationAddress,
            functionName: 'registerSupplier',
            args: [username, additionalDetails.companyName, additionalDetails.contactInfo]
          });
        }
        
        await publicClient.waitForTransactionReceipt({ hash });
      } catch (error) {
        console.error("Error", error);
      }
    }
  };
  
  

  return (
    <div className="background-image-container">
    <div className="background-overlay"></div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="#">PharmaChain</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Contact</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Services</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Dash">Login</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="text-center mb-4">User Registration Form</h2>
          {!isMetaMaskConnected && (
            <div className="text-center">
              <p>Please connect your MetaMask wallet to proceed.</p>
              <button className="btn btn-primary" onClick={handleMetaMaskConnect}>Connect MetaMask</button>
            </div>
          )}

          {isMetaMaskConnected && (
            <div className="registration-form-container">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="formRole" className="form-label">Select Role</label>
                  <select className="form-select" id="formRole" value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="">Select</option>
                    <option value="Patient">Patient</option>
                    <option value="Hospital">Hospital</option>
                    <option value="Pharmacy">Pharmacy</option>
                    <option value="Supplier">Supplier</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="formUsername" className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formUsername"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="formAdditionalDetails" className="form-label">Additional Details</label>
                  {role === 'Patient' && (
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your medical history (optional)"
                      value={additionalDetails.medicalHistory || ''}
                      onChange={(e) => setAdditionalDetails({ ...additionalDetails, medicalHistory: e.target.value })}
                    />
                  )}
                  {role === 'Hospital' && (
                    <>
                      <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Enter your hospital license number"
                        value={additionalDetails.licenseNumber || ''}
                        onChange={(e) => setAdditionalDetails({ ...additionalDetails, licenseNumber: e.target.value })}
                      />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your hospital location (optional)"
                        value={additionalDetails.location || ''}
                        onChange={(e) => setAdditionalDetails({ ...additionalDetails, location: e.target.value })}
                      />
                    </>
                  )}
                  {role === 'Pharmacy' && (
                    <>
                      <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Enter your pharmacy license number"
                        value={additionalDetails.licenseNumber || ''}
                        onChange={(e) => setAdditionalDetails({ ...additionalDetails, licenseNumber: e.target.value })}
                      />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your pharmacy address"
                        value={additionalDetails.address || ''}
                        onChange={(e) => setAdditionalDetails({ ...additionalDetails, address: e.target.value })}
                      />
                    </>
                  )}
                  {role === 'Supplier' && (
                    <>
                      <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Enter your supplier company name"
                        value={additionalDetails.companyName || ''}
                        onChange={(e) => setAdditionalDetails({ ...additionalDetails, companyName: e.target.value })}
                      />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your supplier contact information"
                        value={additionalDetails.contactInfo || ''}
                        onChange={(e) => setAdditionalDetails({ ...additionalDetails, contactInfo: e.target.value })}
                      />
                    </>
                  )}
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className="btn btn-primary w-100" disabled={loading} onClick={() => createUser()}>
                  {loading ? (
                    <div className="spinner-border spinner-border-sm" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    'Register'
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
    <footer className="footer mt-5">
      <div className="container text-center">
        <p>&copy; {new Date().getFullYear()} PharmaChain. All rights reserved.</p>
      </div>
    </footer>
  </div>
  );
};

export default RegistrationScreen;