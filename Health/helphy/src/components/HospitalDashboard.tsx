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

const HospitalDashboard: React.FC = () => {
  const [activeLink, setActiveLink] = useState<string>("#asset-tokenization");

  const handleSelect = (selectedKey: string | null) => {
    setActiveLink(selectedKey || ''); // Use an empty string if selectedKey is null
};

  const renderComponent = () => {
    switch (activeLink) {
      case '#asset-tokenization':
                return <AssetTokenizationInterface mintTokens={function (): Promise<void> {
                    throw new Error('Function not implemented.');
                } } />;
      case "#defi-dashboard":
        return <DeFiDashboard />;
        case '#procurement-financing':
          return <ProcurementFinancingSection financeProcurement={async () => undefined} />;
      case "#dynamic-pricing":
        return <DynamicPricingMechanism updateMedicinePrice={undefined} />;
      case "#medicine-availability":
        return <MedicineAvailabilityChecker medicineAvailabilityContract={{
          checkAvailabilityById: function (id: string): Promise<{ id: string; name: string; availability: boolean; }> {
            throw new Error("Function not implemented.");
          },
          checkAvailabilityByName: function (name: string): Promise<{ id: string; name: string; availability: boolean; }> {
            throw new Error("Function not implemented.");
          }
        }} />;
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
            {/* Navigation Links */}
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
