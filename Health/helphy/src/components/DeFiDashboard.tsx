
import { Card, Row, Col, Button } from 'react-bootstrap';
import { FaChartLine, FaWallet, FaExchangeAlt, FaPlus } from 'react-icons/fa';
//import '../../src/styles/DeFiDashboard.css'; // Import custom CSS for DeFi Dashboard styling

const DeFiDashboard = () => {
    const handleViewAllActivity = () => {
        // Placeholder functionality to view all activity
        alert('View All Activity button clicked');
    };

    const handleCreateNewPool = () => {
        // Placeholder functionality to create a new pool
        alert('Create New Pool button clicked');
    };

    return (
        <div className="defi-dashboard-container">
            <h2 className="dashboard-title">DeFi Dashboard</h2>
            
            {/* DeFi Overview Section */}
            <Row className="mb-4">
                <Col>
                    <Card className="defi-card text-center p-3">
                        <Card.Title className="card-title">DeFi Overview</Card.Title>
                        <Row>
                            <Col>
                                <div className="mb-2">
                                    <FaWallet className="overview-icon" />
                                </div>
                                <h4>Total Assets Locked</h4>
                                <p className="overview-value">$1,234,567</p>
                            </Col>
                            <Col>
                                <div className="mb-2">
                                    <FaChartLine className="overview-icon" />
                                </div>
                                <h4>Annualized Yield</h4>
                                <p className="overview-value">7.5%</p>
                            </Col>
                            <Col>
                                <div className="mb-2">
                                    <FaExchangeAlt className="overview-icon" />
                                </div>
                                <h4>Total Transactions</h4>
                                <p className="overview-value">2,345</p>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
            
            {/* Yield Farming Section */}
            <Row className="mb-4">
                <Col>
                    <Card className="defi-card p-3">
                        <Card.Title className="card-title">Yield Farming</Card.Title>
                        <Button variant="success" className="create-pool-btn mb-2" onClick={handleCreateNewPool}>
                            <FaPlus className="me-2" />
                            Create New Pool
                        </Button>
                        <p>Yield Farming Content Placeholder</p>
                    </Card>
                </Col>
            </Row>

            {/* Liquidity Pools Section */}
            <Row className="mb-4">
                <Col>
                    <Card className="defi-card p-3">
                        <Card.Title className="card-title">Liquidity Pools</Card.Title>
                        <p>Liquidity Pools Content Placeholder</p>
                    </Card>
                </Col>
            </Row>

            {/* Swap History Section */}
            <Row>
                <Col>
                    <Card className="defi-card p-3">
                        <Card.Title className="card-title mb-2">Swap History</Card.Title>
                        <p>Swap History Content Placeholder</p>
                        <Button variant="primary" className="view-all-btn mt-2" onClick={handleViewAllActivity}>View All Activity</Button>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default DeFiDashboard;
