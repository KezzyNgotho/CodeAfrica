import React, { useState } from 'react';
import { Container, Row, Col, Nav, Button } from 'react-bootstrap';
import { FaUserCircle, FaSignOutAlt, FaCog, FaWarehouse, FaMoneyCheckAlt, FaChartLine, FaHospitalAlt, FaListAlt, FaUserMd, FaAmbulance, FaBars } from 'react-icons/fa';
import AssetTokenizationInterface from '../components/AssetTokenization';
import DeFiDashboard from '../components/DeFiDashboard';
import ProcurementFinancingSection from '../components/ProcurementFinancing';
import DynamicPricingMechanism from '../components/DynamicPricing';
import MedicineAvailabilityChecker from '../components/MedicineAvailability';
import DigitalHealthRecords from '../components/HealthRecords';
import PersonalizedHealthcareRecommendations from '../components/HealthCareRecommendations';
import '../styles/Dashboard.css'; // Import custom CSS for dashboard styling

const Dashboard = () => {
    const [activeLink, setActiveLink] = useState('#asset-tokenization');

    const handleSelect = (selectedKey) => {
        setActiveLink(selectedKey);
    };

    const renderComponent = () => {
        switch (activeLink) {
            case '#asset-tokenization':
                return <AssetTokenizationInterface />;
            case '#defi-dashboard':
                return <DeFiDashboard />;
            case '#procurement-financing':
                return <ProcurementFinancingSection />;
            case '#dynamic-pricing':
                return <DynamicPricingMechanism />;
            case '#medicine-availability':
                return <MedicineAvailabilityChecker />;
            case '#health-records':
                return <DigitalHealthRecords />;
            case '#healthcare-recommendations':
                return <PersonalizedHealthcareRecommendations />;
            default:
                return null;
        }
    };

    return (
        <Container fluid className="dashboard-container">
            <Row className="dashboard-topbar">
                <Col className="left-topbar">
                    <Button variant="link" className="menu-button">
                        <FaBars className="icon" />
                    </Button>
                    <h3>PharmaChain</h3>
                </Col>
                <Col className="text-end">
                    <Button variant="light" className="profile-button">
                        <FaUserCircle className="icon" />
                        Profile
                    </Button>
                    <Button variant="light" className="logout-button">
                        <FaSignOutAlt className="icon" />
                        Logout
                    </Button>
                    <Button variant="light" className="settings-button">
                        <FaCog className="icon" />
                        Settings
                    </Button>
                </Col>
            </Row>
            <Row className="dashboard-body">
                {/* Side Navigation */}
                <Col md={3} className="sidebar">
                    <Nav defaultActiveKey="/dashboard" className="flex-column" onSelect={handleSelect}>
                        <Nav.Link href="#asset-tokenization" active={activeLink === '#asset-tokenization'}>
                            <div className="icon-container">
                                <FaWarehouse className="icon" />
                            </div>
                            <span className="link-text">Asset Tokenization</span>
                        </Nav.Link>
                        <Nav.Link href="#defi-dashboard" active={activeLink === '#defi-dashboard'}>
                            <div className="icon-container">
                                <FaMoneyCheckAlt className="icon" />
                            </div>
                            <span className="link-text">DeFi Dashboard</span>
                        </Nav.Link>
                        <Nav.Link href="#procurement-financing" active={activeLink === '#procurement-financing'}>
                            <div className="icon-container">
                                <FaChartLine className="icon" />
                            </div>
                            <span className="link-text">Procurement Financing</span>
                        </Nav.Link>
                        <Nav.Link href="#dynamic-pricing" active={activeLink === '#dynamic-pricing'}>
                            <div className="icon-container">
                                <FaListAlt className="icon" />
                            </div>
                            <span className="link-text">Dynamic Pricing</span>
                        </Nav.Link>
                        <Nav.Link href="#medicine-availability" active={activeLink === '#medicine-availability'}>
                            <div className="icon-container">
                                <FaHospitalAlt className="icon" />
                            </div>
                            <span className="link-text">Medicine Availability</span>
                        </Nav.Link>
                        <Nav.Link href="#health-records" active={activeLink === '#health-records'}>
                            <div className="icon-container">
                                <FaUserMd className="icon" />
                            </div>
                            <span className="link-text">Health Records</span>
                        </Nav.Link>
                        <Nav.Link href="#healthcare-recommendations" active={activeLink === '#healthcare-recommendations'}>
                            <div className="icon-container">
                                <FaAmbulance className="icon" />
                            </div>
                            <span className="link-text">Ambulance</span>
                        </Nav.Link>
                    </Nav>
                </Col>
                {/* Main Content */}
                <Col md={9} className="main-content">
                    <Container>
                        {renderComponent()}
                    </Container>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
