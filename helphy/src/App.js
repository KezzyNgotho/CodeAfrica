import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Update import
import LandingScreen from '../src/components/LandingScreen';
import Dashboard from '../src/components/Dashboard';
import LoginScreen from '../src/components/IdentityVerification';
import RegisterScreen from '../src/components/UserRegistrationScreen';
import VerifyIdentityScreen from '../src/components/IdentityVerification';
import Medicineprovider from '../src/components/MedicineProvider'
import HospitalDashboard from './components/HospitalDashboard';
import PharmacyDashboard from './components/PharmacyDashboard';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingScreen />} />
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path="/login" element={<LoginScreen onLogin={handleLogin} />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/verify-identity" element={<VerifyIdentityScreen />} />
          <Route path="/Dash" element={<Dashboard />} />
          <Route path="/MedicineProvider" element={<Medicineprovider />} />
          <Route path="/HospitalDashboard" element={<HospitalDashboard />} />
          <Route path="/PharmacyDashboard" element={<PharmacyDashboard />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;
