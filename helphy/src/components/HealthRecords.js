import React from 'react';

const HealthRecordsComponent = ({ updateHealthRecord }) => {
  const handleUpdateHealthRecord = async () => {
    try {
      await updateHealthRecord('New health record'); // Example record
      alert('Health record updated successfully');
    } catch (error) {
      console.error('Error updating health record:', error);
      alert('Error updating health record');
    }
  };

  return (
    <div>
      <h2>Digital Health Records</h2>
      <button onClick={handleUpdateHealthRecord}>Update Health Record</button>
    </div>
  );
};

export default HealthRecordsComponent;
