import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../index.css'; // Import your CSS file for styling
import doctorImage from '../assets/pexels-negativespace-48604.jpg'; // Import placeholder image
import tracking from '../assets/pexels-googledeepmind-17485658.jpg';
import security from '../assets/pexels-pixabay-60504.jpg';
import transparency from '../assets/pexels-googledeepmind-17483874.jpg'
import backgroundImage from '../assets/pexels-pietrozj-360622.jpg'
import Typed from 'typed.js';


const LandingScreen = () => {
  const [isSticky, setIsSticky] = useState(false);
  const navbarRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const navbarOffset = navbarRef.current.offsetTop;
      setIsSticky(window.pageYOffset > navbarOffset);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const typedRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ['A decentralized solution', 'Managing pharmaceutical supply chains'],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="landing-screen">
      {/* Navigation Bar */}
      <nav ref={navbarRef} className={'navbar navbar-expand-lg navbar-light bg-light ${isSticky ? "fixed-top" : ""}'}>
        <div className="container">
          <a className="navbar-brand" href="#">Helphy</a>
          <button className="navbar-toggler" type="button" onClick={toggleNavbar} aria-controls="navbarNav" aria-expanded={isOpen} aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="#about">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#features">Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">Contact</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#features">Services</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">More</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero d-flex align-items-center" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>
      <div className="overlay"></div>
        <div className="container text-center">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h2 className="display-4 mb-4 text-light">Welcome to Helphy</h2>
              <p className="lead mb-5 text-light">
                <span ref={typedRef}></span>
              </p>
              <Link to="/register" className="btn btn-primary btn-lg">Get Started</Link>
            </div>
          </div>
        </div>
      </section>


      {/* About Section */}
      <section id="about" className="about py-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h2 className="mb-4">About us</h2>
            <p>
              Helphy is a blockchain-based platform designed to revolutionize the pharmaceutical industry. It provides a
              transparent and secure way to track and manage the supply chain from production to distribution, ensuring
              the authenticity and safety of pharmaceutical products.
            </p>
          </div>
          <div className="col-md-6">
            <img src={doctorImage} alt="Doctor" className="img-fluid rounded" />
          </div>
        </div>
      </div>
    </section>

     { /* Features Section */ }
     <section id="features" className="features py-5">
      <div className="container">
        <h2 className="text-center mb-5">Key Features</h2>
        <div className="row justify-content-center">
          <div className="col-md-4 mb-4">
            <div className="feature-card card">
              <img src={tracking} alt="Decentralized Tracking" className="card-img-top" />
              <div className="card-body">
                <h3 className="card-title">Decentralized Tracking</h3>
                <p className="card-text">
                  Utilizes blockchain technology to create a decentralized ledger for tracking pharmaceutical products
                  at every stage of the supply chain.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="feature-card card">
              <img src={security} alt="Data Security" className="card-img-top" />
              <div className="card-body">
                <h3 className="card-title">Data Security</h3>
                <p className="card-text">
                  Ensures data security and integrity through encryption and cryptographic techniques, safeguarding
                  sensitive information from unauthorized access.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="feature-card card">
              <img src={transparency} alt="Transparency and Traceability" className="card-img-top" />
              <div className="card-body">
                <h3 className="card-title">Transparency and Traceability</h3>
                <p className="card-text">
                  Provides transparency and traceability by allowing stakeholders to access real-time information about
                  the origin, journey, and status of pharmaceutical products.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


      {/* Contact Section */}
      <section id="contact" className="contact py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <h2 className="mb-4">Contact Us</h2>
            <p className="mb-4">If you have any questions or inquiries, feel free to contact us:</p>
            <ul className="list-unstyled mb-4">
              <li>
                <i className="fas fa-envelope me-2"></i>
                <a href="mailto:info@helphy.com">info@helphy.com</a>
              </li>
              <li>
                <i className="fas fa-phone me-2"></i>
                +1 (123) 456-7890
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    {/* Footer */}
    <footer className="footer bg-dark py-3">
      <div className="container text-center text-white">
        <p>&copy; 2024 Helphy. All rights reserved.</p>
      </div>
    </footer>
    </div>
  );
};

export default LandingScreen;
