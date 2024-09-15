import React, { useState } from 'react';
import axios from 'axios';

function ManageAccess() {
  const [approvalId, setApprovalId] = useState(''); // Stores the input approval ID
  const [approvals, setApprovals] = useState([]); // Stores the list of approvals fetched from the server
  const [searchError, setSearchError] = useState(''); // Error message for search operation
  const [deleteMessage, setDeleteMessage] = useState(''); // Success message for delete operation
  const [errorMessage, setErrorMessage] = useState(''); // Error message for delete operation

  // Handle input change for approvalId
  const handleInputChange = (e) => {
    setApprovalId(e.target.value);
  };

  // Search for approval by approval_Id
  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8083/api/v1/approval/byApprovalId/${approvalId}`);
      setApprovals(response.data); // Store the array of approval data
      setSearchError(''); // Clear any previous search error
    } catch (error) {
      console.error('Error searching approval:', error.response ? error.response.data : error.message);
      setSearchError('Approval not found.');
      setApprovals([]); // Clear approval if not found
    }
  };

  // Handle delete by id, passing all required data
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this approval?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8083/api/v1/approval/deleteApproval/${id}`);
        setDeleteMessage(`Approval with ID ${id} has been deleted successfully.`);
        setApprovals(approvals.filter((approval) => approval.id !== id)); // Remove the deleted approval from the list
      } catch (error) {
        console.error('Error deleting approval:', error.response ? error.response.data : error.message);
        setErrorMessage('Failed to delete approval.');
        setDeleteMessage(''); // Clear success message if delete fails
      }
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <h2 style={styles.title}>Manage Access Permissions</h2>

        {/* Search section */}
        <div style={styles.searchSection}>
          <input
            type="text"
            value={approvalId}
            onChange={handleInputChange}
            style={styles.searchInput}
            placeholder="Enter Approval ID"
          />
          <button onClick={handleSearch} style={styles.searchButton}>
            Search
          </button>
        </div>

        {/* Display search error if any */}
        {searchError && <p style={styles.errorMessage}>{searchError}</p>}

        {/* Display the approval details in a table if found */}
        {approvals.length > 0 && (
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.th}>Approval ID</th>
                <th style={styles.th}>Approval Name</th>
                <th style={styles.th}>Create Date</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {approvals.map((approval) => (
                <tr key={approval.id} style={styles.tableRow}>
                  <td style={styles.td}>{approval.approval_id}</td>
                  <td style={styles.td}>{approval.approval_name ? approval.approval_name : 'N/A'}</td>
                  <td style={styles.td}>{approval.create_date ? new Date(approval.create_date).toLocaleDateString() : 'N/A'}</td>
                  <td style={styles.td}>{approval.status}</td>
                  <td style={styles.tdActions}>
                    <button onClick={() => handleDelete(approval.id)} style={styles.deleteButton}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Display success or error message for delete */}
        {deleteMessage && <p style={styles.successMessage}>{deleteMessage}</p>}
        {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '0vh',
    width: '100%'
    // backgroundColor: '#f9f9f9',
  },
  container: {
    width: '100%',
    maxWidth: '1200px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
  },
  title: {
    color: '#333',
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '30px',
    letterSpacing: '1px',
  },
  searchSection: {
    display: 'flex',
    gap: '15px',
    marginBottom: '20px',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    maxWidth: '500px',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '2px solid #ccc',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  searchButton: {
    padding: '12px 30px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  tableHeader: {
    // backgroundColor: '#1d411d',
    color: '#1d411d',
  },
  th: {
    padding: '12px 15px',
    textAlign: 'left',
    fontSize: '16px',
    fontWeight: 'bold',
    borderBottom: '2px solid #ddd',
  },
  td: {
    padding: '12px 15px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
    fontSize: '14px',
  },
  tdActions: {
    padding: '12px 15px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
  },
  deleteButton: {
    padding: '8px 16px',
    fontSize: '14px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  successMessage: {
    marginTop: '20px',
    color: '#28a745',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  errorMessage: {
    marginTop: '20px',
    color: '#dc3545',
    fontSize: '16px',
    fontWeight: 'bold',
  },
};

export default ManageAccess;
