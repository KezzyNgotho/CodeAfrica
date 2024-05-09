import React from 'react';

const HealthcareRecommendations = ({ performDataAnalytics }) => {
  const handlePerformDataAnalytics = async () => {
    try {
      await performDataAnalytics();
      alert('Data analytics performed successfully');
    } catch (error) {
      console.error('Error performing data analytics:', error);
      alert('Error performing data analytics');
    }
  };

  return (
    <div>
      <h2>Personalized Healthcare Recommendations</h2>
      <button onClick={handlePerformDataAnalytics}>Perform Data Analytics</button>
    </div>
  );
};

export default HealthcareRecommendations;
