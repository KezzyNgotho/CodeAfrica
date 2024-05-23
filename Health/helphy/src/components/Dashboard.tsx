import React, { useState } from 'react';
import { Container, Row, Col, Nav, Button } from 'react-bootstrap';
import {
  FaUserCircle,
  FaSignOutAlt,
  FaCog,
  FaWarehouse,
  FaMoneyCheckAlt,
  FaChartLine,
  FaHospitalAlt,
  FaListAlt,
  FaUserMd,
  FaAmbulance
} from 'react-icons/fa';

import AssetTokenizationInterface from './AssetTokenization';
import DeFiDashboard from './DeFiDashboard';
import ProcurementFinancingSection from './ProcurementFinancing';
import DynamicPricingMechanism from './DynamicPricing';
import MedicineAvailabilityChecker from './MedicineAvailability';
import DigitalHealthRecords from './HealthRecords';
import PersonalizedHealthcareRecommendations from './HealthCareRecommendations';

import '../styles/Dashboard.scss'; // Import custom CSS for dashboard styling

const Dashboard: React.FC = () => {
  const [activeLink, setActiveLink] = useState<string>('#asset-tokenization');

  const handleSelect = (selectedKey: string | null) => {
    setActiveLink(selectedKey || ''); 
  };

  const componentsMap: { [key: string]: JSX.Element } = {
    '#asset-tokenization': <AssetTokenizationInterface mintTokens={async () => { /* Function implementation */ }} />,
    '#defi-dashboard': <DeFiDashboard />,
    '#procurement-financing': <ProcurementFinancingSection financeProcurement={async () => { /* Function implementation */ }} />,
    '#dynamic-pricing': <DynamicPricingMechanism/>,
    '#medicine-availability': <MedicineAvailabilityChecker />,
    '#health-records': <DigitalHealthRecords />,
    '#healthcare-recommendations': <PersonalizedHealthcareRecommendations />,
  };

  const renderComponent = () => componentsMap[activeLink] || null;

  return (
    <Container fluid className="dashboard-container">
      <Row className="dashboard-topbar">
        <Col className="left-topbar">
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
        <Col md={3} className="sidebar">
          <Nav defaultActiveKey="#asset-tokenization" className="flex-column" onSelect={handleSelect}>
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
              <span className="link-text">Healthcare Recommendations</span>
            </Nav.Link>
          </Nav>
        </Col>
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
