import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AllUsersManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false); // New state for add user modal
  const [selectedUser, setSelectedUser] = useState({
    id: '',
    userId: '',
    userName: '',
    email: '',
    address: '',
    password: '', // Password for adding a new user
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8082/api/users/all');
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching users.');
      setLoading(false);
    }
  };

  // Delete user by ID
  const deleteUser = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8082/api/users/${userId}`);
        setUsers(users.filter(user => user.id !== userId)); // Remove the deleted user from state
      } catch (error) {
        console.error('Error deleting user:', error);
        setError('Failed to delete user.');
      }
    }
  };

  // Open modal with selected user details for update
  const openUpdateModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  // Handle form change for update modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser({ ...selectedUser, [name]: value });
  };

  // Handle update form submission
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8082/api/users/${selectedUser.id}`, {
        userName: selectedUser.userName,
        email: selectedUser.email, // Include the email field in the update
        address: selectedUser.address,
      });
      setShowModal(false);
      fetchUsers(); // Refresh users after update
    } catch (error) {
      console.error('Error updating user:', error);
      setError('Failed to update user.');
    }
  };

  // Open the Add User modal
  const openAddUserModal = () => {
    setSelectedUser({
      id: '',
      userId: '',
      userName: '',
      email: '',
      address: '',
      password: '',
    });
    setShowAddModal(true);
  };

  // Handle add user form submission
  const handleAddUserSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8082/auth/create', {
        userId: selectedUser.userId,
        userName: selectedUser.userName,
        email: selectedUser.email,
        address: selectedUser.address,
        password: selectedUser.password,
      });
      setShowAddModal(false);
      fetchUsers(); // Refresh users after adding a new user
    } catch (error) {
      console.error('Error adding new user:', error);
      setError('Failed to add new user.');
    }
  };

  // Loading state
  if (loading) {
    return <div>Loading users...</div>;
  }

  // Error state
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>All Users Management</h2>
      <button onClick={openAddUserModal} style={styles.addButton}>Add New User</button> {/* New Button to open the add user modal */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>User ID</th>
            <th style={styles.th}>User Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Address</th>
            <th style={styles.th}></th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} style={styles.row}>
              <td style={styles.td}>{user.userId}</td>
              <td style={styles.td}>{user.userName}</td>
              <td style={styles.td}>{user.email}</td>
              <td style={styles.td}>{user.address}</td>
              <td style={styles.tdActions}>
                <button onClick={() => openUpdateModal(user)} style={styles.updateButton}>
                  Update
                </button>
                <button onClick={() => deleteUser(user.id)} style={styles.deleteButton}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for updating user details */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.largeModal}>
            <h3 style={styles.modalTitle}>Update User Information</h3>
            <form onSubmit={handleUpdateSubmit} style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>User ID</label>
                <input
                  type="text"
                  name="userId"
                  value={selectedUser.userId}
                  disabled // Make this field read-only
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={selectedUser.email} // Ensure email is displayed and can be updated
                  onChange={handleInputChange} // Allow email to be updated
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>User Name</label>
                <input
                  type="text"
                  name="userName"
                  value={selectedUser.userName}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Address</label>
                <input
                  type="text"
                  name="address"
                  value={selectedUser.address}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.modalActions}>
                <button type="button" onClick={() => setShowModal(false)} style={styles.cancelButton}>
                  Cancel
                </button>
                <button type="submit" style={styles.saveButton}>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for adding a new user */}
      {showAddModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.largeModal}>
            <h3 style={styles.modalTitle}>Add New User</h3>
            <form onSubmit={handleAddUserSubmit} style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>User ID</label>
                <input
                  type="text"
                  name="userId"
                  value={selectedUser.userId}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>User Name</label>
                <input
                  type="text"
                  name="userName"
                  value={selectedUser.userName}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={selectedUser.email}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Address</label>
                <input
                  type="text"
                  name="address"
                  value={selectedUser.address}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Password</label>
                <input
                  type="password"
                  name="password"
                  value={selectedUser.password}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.modalActions}>
                <button type="button" onClick={() => setShowAddModal(false)} style={styles.cancelButton}>
                  Cancel
                </button>
                <button type="submit" style={styles.saveButton}>Add User</button>
              </div>
            </form>
          </div>
        </div>
      )}
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
  addButton: {
    marginBottom: '20px',
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
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
  updateButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Darker background
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  largeModal: {
    backgroundColor: '#fff',
    padding: '40px', // Increased padding for content
    borderRadius: '12px',
    width: '60%', // Large modal width
    maxWidth: '900px', // Maximum width for larger screens
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
    margin: '20px',
  },
  modalTitle: {
    fontSize: '28px', // Larger title font
    marginBottom: '20px',
    textAlign: 'center',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '5px',
    fontSize: '18px', // Larger font for labels
  },
  input: {
    padding: '12px', // Larger input padding
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default AllUsersManagement;
