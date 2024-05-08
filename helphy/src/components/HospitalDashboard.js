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
import DeFiDashboard from "../components/DeFiDashboard";
import ProcurementFinancingSection from "../components/ProcurementFinancing";
import DynamicPricingMechanism from "../components/DynamicPricing";
import MedicineAvailabilityChecker from "../components/MedicineAvailability";
import DigitalHealthRecords from "../components/HealthRecords";
import PersonalizedHealthcareRecommendations from "../components/HealthCareRecommendations";
import AppointmentScheduler from "../Hospital/AppointmentScheduler";
import InventoryManagement from "../Hospital/InventoryManagement";
import PatientManagement from "../Hospital/PatientManagement";
import BillingAndPayment from "../Hospital/BilllingAndPayment";
import MedicalRecordsViewer from "../Hospital/MedicalRecordsViewer";
import MedicalImagingViewer from "../Hospital/MagicalImageViewer";
import TaskManager from "../Hospital/TaskManager";
import AnalyticsDashboard from "../Hospital/AnalyticsDashboard";
import TelemedicineIntegration from "../Hospital/TelemedicineIntegration";
import EmergencyResponseSystem from "../Hospital/EmergencyResponseSystem";

import "../styles/Dashboard.css"; // Import custom CSS for dashboard styling

const HospitalDashboard = () => {
  const [activeLink, setActiveLink] = useState("#asset-tokenization");

  const handleSelect = (selectedKey) => {
    setActiveLink(selectedKey);
  };

  const renderComponent = () => {
    switch (activeLink) {
      case "#asset-tokenization":
        return <AssetTokenizationInterface />;
      case "#defi-dashboard":
        return <DeFiDashboard />;
      case "#procurement-financing":
        return <ProcurementFinancingSection />;
      case "#dynamic-pricing":
        return <DynamicPricingMechanism />;
      case "#medicine-availability":
        return <MedicineAvailabilityChecker />;
      case "#health-records":
        return <DigitalHealthRecords />;
      case "#healthcare-recommendations":
        return <PersonalizedHealthcareRecommendations />;
      case "#appointment-scheduler":
        return <AppointmentScheduler />;
      case "#inventory-management":
        return <InventoryManagement />;
      case "#patient-management":
        return <PatientManagement />;
      case "#billing-and-payment":
        return <BillingAndPayment />;
      case "#medical-records-viewer":
        return <MedicalRecordsViewer />;
      case "#medical-imaging-viewer":
        return <MedicalImagingViewer />;
      case "#task-manager":
        return <TaskManager />;
      case "#analytics-dashboard":
        return <AnalyticsDashboard />;
      case "#telemedicine-integration":
        return <TelemedicineIntegration />;
      case "#emergency-response-system":
        return <EmergencyResponseSystem />;
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
          <h3>Hospital Dashboard</h3>
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
              href="#asset-tokenization"
              active={activeLink === "#asset-tokenization"}
            >
              <div className="icon-container">
                <FaWarehouse className="icon" />
              </div>
              <span className="link-text">Asset Tokenization</span>
            </Nav.Link>
            <Nav.Link
              href="#defi-dashboard"
              active={activeLink === "#defi-dashboard"}
            >
              <div className="icon-container">
                <FaMoneyCheckAlt className="icon" />
              </div>
              <span className="link-text">DeFi Dashboard</span>
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

            <Nav.Link
  href="#dynamic-pricing"
  active={activeLink === "#dynamic-pricing"}
>
  <div className="icon-container">
    <FaListAlt className="icon" />
  </div>
  <span className="link-text">Dynamic Pricing</span>
</Nav.Link>
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
  href="#health-records"
  active={activeLink === "#health-records"}
>
  <div className="icon-container">
    <FaUserMd className="icon" />
  </div>
  <span className="link-text">Health Records</span>
</Nav.Link>
<Nav.Link
  href="#healthcare-recommendations"
  active={activeLink === "#healthcare-recommendations"}
>
  <div className="icon-container">
    <FaAmbulance className="icon" />
  </div>
  <span className="link-text">Healthcare Recommendations</span>
</Nav.Link>
<Nav.Link
  href="#appointment-scheduler"
  active={activeLink === "#appointment-scheduler"}
>
  <div className="icon-container">
    <FaUserCircle className="icon" />
  </div>
  <span className="link-text">Appointment Scheduler</span>
</Nav.Link>
<Nav.Link
  href="#inventory-management"
  active={activeLink === "#inventory-management"}
>
  <div className="icon-container">
    <FaWarehouse className="icon" />
  </div>
  <span className="link-text">Inventory Management</span>
</Nav.Link>
<Nav.Link
  href="#patient-management"
  active={activeLink === "#patient-management"}
>
  <div className="icon-container">
    <FaUserCircle className="icon" />
  </div>
  <span className="link-text">Patient Management</span>
</Nav.Link>
<Nav.Link
  href="#billing-and-payment"
  active={activeLink === "#billing-and-payment"}
>
  <div className="icon-container">
    <FaMoneyCheckAlt className="icon" />
  </div>
  <span className="link-text">Billing and Payment</span>
</Nav.Link>
<Nav.Link
  href="#medical-records-viewer"
  active={activeLink === "#medical-records-viewer"}
>
  <div className="icon-container">
    <FaChartLine className="icon" />
  </div>
  <span className="link-text">Medical Records Viewer</span>
</Nav.Link>
<Nav.Link
  href="#medical-imaging-viewer"
  active={activeLink === "#medical-imaging-viewer"}
>
  <div className="icon-container">
    <FaHospitalAlt className="icon" />
  </div>
  <span className="link-text">Medical Imaging Viewer</span>
</Nav.Link>
<Nav.Link
  href="#task-manager"
  active={activeLink === "#task-manager"}
>
  <div className="icon-container">
    <FaListAlt className="icon" />
  </div>
  <span className="link-text">Task Manager</span>
</Nav.Link>
<Nav.Link
  href="#analytics-dashboard"
  active={activeLink === "#analytics-dashboard"}
>
  <div className="icon-container">
    <FaChartLine className="icon" />
  </div>
  <span className="link-text">Analytics Dashboard</span>
</Nav.Link>
<Nav.Link
  href="#telemedicine-integration"
  active={activeLink === "#telemedicine-integration"}
>
  <div className="icon-container">
    <FaUserCircle className="icon" />
  </div>
  <span className="link-text">Telemedicine Integration</span>
</Nav.Link>
<Nav.Link
  href="#emergency-response-system"
  active={activeLink === "#emergency-response-system"}
>
  <div className="icon-container">
    <FaAmbulance className="icon" />
  </div>
  <span className="link-text">Emergency Response System</span>
</Nav.Link>


            {/* Add more navigation links for other components */}
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

export default HospitalDashboard;
