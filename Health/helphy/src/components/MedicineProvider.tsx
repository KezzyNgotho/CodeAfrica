import React, { useState } from "react";
import { Container, Row, Col, Nav, Button } from "react-bootstrap";
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
  FaAmbulance,
  FaBars,
} from "react-icons/fa";
import AssetTokenizationInterface from "../components/AssetTokenization";
import DynamicPricingMechanism from "../components/DynamicPricing";
import MedicineAvailabilityChecker from "../components/MedicineAvailability";
import ProcurementFinancing from "../components/ProcurementFinancing";
import HealthRecords from "../components/HealthRecords";
import HospitalsManagement from "../Provider/HospitalsManagement"; // New component for managing hospitals
import GovernmentClientsManagement from "../Provider/GovernmentClientsManagement"; // New component for managing government clients
import "../styles/Dashboard.css"; // Import custom CSS for dashboard styling

const MedicineProvider = () => {
  const [activeLink, setActiveLink] = useState("#medicine-availability");

  const handleSelect = (selectedKey: string | null) => {
    setActiveLink(selectedKey || ""); // Ensure null is handled if needed
  };
  

  const renderComponent = () => {
    switch (activeLink) {
        case "#medicine-availability":
        return <MedicineAvailabilityChecker medicineAvailabilityContract={{
          checkAvailabilityById: function (id: string): Promise<{ id: string; name: string; availability: boolean; }> {
            throw new Error("Function not implemented.");
          },
          checkAvailabilityByName: function (name: string): Promise<{ id: string; name: string; availability: boolean; }> {
            throw new Error("Function not implemented.");
          }
        }} />;
      case "#asset-tokenization":
        return <AssetTokenizationInterface mintTokens={undefined} />;
      case "#dynamic-pricing":
        return <DynamicPricingMechanism updateMedicinePrice={undefined} />;
      
      case "#procurement-financing":
        function handleFinanceProcurement(amount: number): Promise<void> {
          throw new Error("Function not implemented.");
        }

        return <ProcurementFinancing financeProcurement={handleFinanceProcurement} />;
        
      case "#health-records":
        return <HealthRecords />;
      case "#hospitals-management":
        return <HospitalsManagement />; // New component for managing hospitals
      case "#government-clients-management":
        return <GovernmentClientsManagement />; // New component for managing government clients
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
          <h3>KEMRIS Dashboard</h3>
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
          <Nav
            defaultActiveKey="/dashboard"
            className="flex-column"
            onSelect={handleSelect}
          >
            <Nav.Link
              href="#medicine-availability"
              active={activeLink === "#medicine-availability"}
            >
              <div className="icon-container">
                <FaHospitalAlt className="icon" />
              </div>
              <span className="link-text">Medicine Availability</span>
            </Nav.Link>

            <Nav.Link
              href="#government-clients-management"
              active={activeLink === "#government-clients-management"}
            >
              <div className="icon-container">
                < FaListAlt className="icon" />
              </div>
              <span className="link-text">Clients</span>
            </Nav.Link>

            <Nav.Link
              href="#dynamic-pricing"
              active={activeLink === "#dynamic-pricing"}
            >
              <div className="icon-container">
                <FaMoneyCheckAlt className="icon" />
              </div>
              <span className="link-text">Dynamic Pricing</span>
            </Nav.Link>
            <Nav.Link
              href="#asset-tokenization"
              active={activeLink === "#asset-tokenization"}
            >
              <div className="icon-container">
                <FaWarehouse className="icon" />
              </div>
              <span className="link-text">Asset Tokenization</span>
            </Nav.Link>

            <Nav.Link
              href="#health-records"
              active={activeLink === "#health-records"}
            >
              <div className="icon-container">
                <FaUserMd className="icon" />
              </div>
              <span className="link-text">Health Records</span>
            </Nav.Link>
            <Nav.Link
              href="#hospitals-management"
              active={activeLink === "#hospitals-management"}
            >
              <div className="icon-container">
                <FaAmbulance className="icon" />
              </div>
              <span className="link-text">Emergency Management</span>
            </Nav.Link>
            <Nav.Link
              href="#procurement-financing"
              active={activeLink === "#procurement-financing"}
            >
              <div className="icon-container">
                <FaChartLine className="icon" />
              </div>
              <span className="link-text">Procurement Financing</span>
            </Nav.Link>
          </Nav>
        </Col>
        {/* Main Content */}
        <Col md={9} className="main-content">
          <Container>{renderComponent()}</Container>
        </Col>
      </Row>
    </Container>
  );
};

export default MedicineProvider;
