import React, { useState } from 'react';
import axios from 'axios';

function CreateAccess() {
  const [approval, setApproval] = useState({
    approval_Id: '',
    approval_Name: '',
    create_Date: '',
    status: 'Pending', // Default to "Pending"
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApproval({ ...approval, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8083/api/v1/approval/saveApproval',
        approval,
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log('Approval created:', response.data);
      setSuccessMessage('Approval successfully created!');
      setErrorMessage('');
      setApproval({
        approval_Id: '',
        approval_Name: '',
        create_Date: '',
        status: 'Pending',
      });
    } catch (error) {
      console.error('Error creating approval:', error.response ? error.response.data : error.message);
      setErrorMessage('Failed to create approval.');
      setSuccessMessage('');
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <h2 style={styles.title}>Create Access Permission Name</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Approval ID</label>
            <input
              type="text"
              name="approval_Id"
              value={approval.approval_Id}
              onChange={handleInputChange}
              style={styles.input}
              placeholder="Enter Approval ID"
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Approval Name</label>
            <input
              type="text"
              name="approval_Name"
              value={approval.approval_Name}
              onChange={handleInputChange}
              style={styles.input}
              placeholder="Enter Approval Name"
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Create Date</label>
            <input
              type="datetime-local"
              name="create_Date"
              value={approval.create_Date}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
          </div>
          {/* <div style={styles.inputGroup}>
            <label style={styles.label}>Status</label>
            <input
              type="text"
              name="status"
              value={approval.status}
              onChange={handleInputChange}
              style={styles.input}
              disabled // Always set to "Pending"
            />
          </div> */}
          <div style={styles.buttonContainer}>
            <button type="submit" style={styles.submitButton}>
              Create Access
            </button>
          </div>
          {successMessage && <p style={styles.successMessage}>{successMessage}</p>}
          {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: '80vh',
    background: 'white',
    padding: '20px',
    boxSizing: 'border-box',
    borderRadius:'10px',
  },
  container: {
    width: '100%',
    maxWidth: '800px',
    padding: '40px',
    backgroundColor: '#fff',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '30px',
    letterSpacing: '1px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%', // Ensures the group takes up full width
  },
  label: {
    marginBottom: '8px',
    fontSize: '18px',
    color: '#333',
    fontWeight: '500',
  },
  input: {
    width: '100%', // Make input fields full width
    padding: '14px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    outline: 'none',
    transition: 'border-color 0.3s',
    backgroundColor: '#f8f9fa',
  },
  inputFocus: {
    borderColor: '#4CAF50',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30px',
  },
  submitButton: {
    padding: '12px 30px',
    fontSize: '18px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  submitButtonHover: {
    backgroundColor: '#45a049',
  },
  successMessage: {
    marginTop: '20px',
    color: '#28a745',
    textAlign: 'center',
    fontSize: '18px',
  },
  errorMessage: {
    marginTop: '20px',
    color: '#dc3545',
    textAlign: 'center',
    fontSize: '18px',
  },
};

export default CreateAccess;
