import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AccessPermission() {
  const [approvals, setApprovals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApprovals();
  }, []);

  // Fetch all approval data
  const fetchApprovals = async () => {
    try {
      const response = await axios.get('http://localhost:8083/api/v1/approval/getApproval');
      setApprovals(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching approvals:', error);
      setError('Error fetching approvals.');
      setLoading(false);
    }
  };

  // Handle accept action (status: Accepted) with confirmation
  const acceptApproval = async (approval) => {
    const confirm = window.confirm(`Are you sure you want to accept approval with ID: ${approval.approval_id}?`);
    if (!confirm) return;

    console.log(`Accepting approval with ID: ${approval.approval_id}`);
    try {
      const response = await axios.put(
        `http://localhost:8083/api/v1/approval/updateApproval/${approval.id}`,
        { 
          status: 'Accepted', 
          approval_Id: approval.approval_id, 
          approval_Name: approval.approval_name, 
          create_Date: approval.create_date 
        },
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log('Approval accepted response:', response.data);
      fetchApprovals(); // Refresh approvals after action
    } catch (error) {
      console.error('Error accepting approval:', error.response ? error.response.data : error.message);
      setError(`Failed to accept approval: ${error.response ? error.response.data : error.message}`);
    }
  };

  // Handle reject action (status: Rejected) with confirmation
  const rejectApproval = async (approval) => {
    const confirm = window.confirm(`Are you sure you want to reject approval with ID: ${approval.approval_id}?`);
    if (!confirm) return;

    console.log(`Rejecting approval with ID: ${approval.approval_id}`);
    try {
      const response = await axios.put(
        `http://localhost:8083/api/v1/approval/updateApproval/${approval.id}`,
        { 
          status: 'Rejected', 
          approval_Id: approval.approval_id, 
          approval_Name: approval.approval_name, 
          create_Date: approval.create_date 
        },
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log('Approval rejected response:', response.data);
      fetchApprovals(); // Refresh approvals after action
    } catch (error) {
      console.error('Error rejecting approval:', error.response ? error.response.data : error.message);
      setError(`Failed to reject approval: ${error.response ? error.response.data : error.message}`);
    }
  };

  // Loading state
  if (loading) {
    return <div>Loading approvals...</div>;
  }

  // Error state
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Access Permission Management</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Approval ID</th>
            <th style={styles.th}>Approval Name</th>
            <th style={styles.th}>Create Date</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}></th>
          </tr>
        </thead>
        <tbody>
          {approvals.map((approval) => (
            <tr
              key={approval.id}
              style={
                approval.status === 'Accepted'
                  ? { ...styles.row, ...styles.acceptedRow }
                  : approval.status === 'Rejected'
                  ? { ...styles.row, ...styles.rejectedRow }
                  : styles.row
              }
            >
              <td style={styles.td}>{approval.approval_id}</td>
              <td style={styles.td}>{approval.approval_name}</td>
              <td style={styles.td}>{new Date(approval.create_date).toLocaleDateString()}</td>
              <td style={styles.td}>{approval.status}</td>
              <td style={styles.tdActions}>
                <button onClick={() => acceptApproval(approval)} style={styles.acceptButton}>
                  Accept
                </button>
                <button onClick={() => rejectApproval(approval)} style={styles.rejectButton}>
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    overflowX: 'auto',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    fontSize: '24px',
    marginBottom: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  th: {
    padding: '10px 15px',
    backgroundColor: '#4CAF50',
    color: 'white',
    textAlign: 'left',
    borderBottom: '2px solid #ddd',
    fontWeight: 'bold',
  },
  td: {
    padding: '12px 15px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
  },
  tdActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    padding: '12px 15px',
    borderBottom: '1px solid #ddd',
  },
  row: {
    backgroundColor: '#fff',
  },
  acceptedRow: {
    backgroundColor: '#d4edda',
  },
  rejectedRow: {
    backgroundColor: '#f8d7da',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  rejectButton: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default AccessPermission;
