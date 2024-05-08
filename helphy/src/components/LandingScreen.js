import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Import your CSS file for styling
import doctorImage from '../assets/pexels-negativespace-48604.jpg'; // Import placeholder image
import tracking from '../assets/pexels-googledeepmind-17485658.jpg';
import security from '../assets/pexels-pixabay-60504.jpg';
import transparency from '../assets/pexels-googledeepmind-17483874.jpg'
import backgroundImage from '../assets/pexels-pietrozj-360622.jpg'


const LandingScreen = () => {
  return (
    <div className="landing-screen">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="container">
          <h1>Helphy</h1>
          <ul className="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#features">Services</a></li>
            <li><a href="#contact">More</a></li>
            {/* Add more navigation links as needed */}
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" style={{ backgroundImage: `url(${backgroundImage})` }}>
  <div className="container">
    <h2>Welcome to Helphy</h2>
    <p>A decentralized solution for managing pharmaceutical supply chains.</p>
    <Link to="/verify-identity" className="btn">Get Started</Link>  
  
  </div>
</section>


      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <h2>About us</h2>
          <div className="about-content">
            <div className="about-text">
              <p>Helphy is a blockchain-based platform designed to revolutionize the pharmaceutical industry. It provides a transparent and secure way to track and manage the supply chain from production to distribution, ensuring the authenticity and safety of pharmaceutical products.</p>
            </div>
            <div className="about-image">
              <img src={doctorImage} alt="Doctor" />
            </div>
          </div>
        </div>
      </section>
     { /* Features Section */ }
<section id="features" className="features">
  <div className="container">
    <h2>Key Features</h2>
    <div className="feature-card">
      <img src={tracking} alt="Decentralized Tracking" className="feature-image" />
      <div className="feature-content">
        <h3>Decentralized Tracking</h3>
        <p>Utilizes blockchain technology to create a decentralized ledger for tracking pharmaceutical products at every stage of the supply chain.</p>
      </div>
    </div>
    <div className="feature-card">
      <img src={security} alt="Data Security" className="feature-image" />
      <div className="feature-content">
        <h3>Data Security</h3>
        <p>Ensures data security and integrity through encryption and cryptographic techniques, safeguarding sensitive information from unauthorized access.</p>
      </div>
    </div>
    <div className="feature-card">
      <img src={transparency} alt="Transparency and Traceability" className="feature-image" />
      <div className="feature-content">
        <h3>Transparency and Traceability</h3>
        <p>Provides transparency and traceability by allowing stakeholders to access real-time information about the origin, journey, and status of pharmaceutical products.</p>
      </div>
    </div>
    {/* Add more feature cards as needed */}
  </div>
</section>


      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2>Contact Us</h2>
          <p>If you have any questions or inquiries, feel free to contact us:</p>
          <ul>
            <li>Email: info@helphy.com</li>
            <li>Phone: +1 (123) 456-7890</li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Helphy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingScreen;
