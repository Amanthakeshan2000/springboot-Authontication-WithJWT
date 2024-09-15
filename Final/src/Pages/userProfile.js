import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserProfile() {
  const [user, setUser] = useState({
    id: '',
    userId: '',
    userName: '',
    email: '',
    address: '',
    password:'',
    profileImage: null,
  });

  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null);    // Error state
  const [successMessage, setSuccessMessage] = useState(''); // Success message state

  useEffect(() => {
    const token = localStorage.getItem('authToken'); // Get the token from localStorage
    
    if (token) {
      try {
        // Decode the token to extract the email
        const base64Url = token.split('.')[1]; 
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); 
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const decodedToken = JSON.parse(jsonPayload);
        console.log(decodedToken);

        if (decodedToken.sub) {
          console.log('Email from Token:', decodedToken.sub); 

          // Call the API to get the user details by email
          fetchUserData(decodedToken.sub);
        } else {
          console.log('No email found in token.');
          setError('No email found in token.');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        setError('Failed to decode token.');
        setLoading(false);
      }
    } else {
      console.log('No token found');
      setError('No token found.');
      setLoading(false);
    }
  }, []); // Empty dependency array ensures this only runs once on mount

  // Fetch user data from the API
  const fetchUserData = async (email) => {
    try {
      console.log(`Fetching user data for email: ${email}`);
      const response = await axios.get(`http://localhost:8082/api/users/email/${email}`);
      const userData = response.data;
      console.log('User data fetched:', userData);

      // Set the form data with user details from the response
      setUser({
        id: userData.id,
        userId: userData.userId,
        userName: userData.userName,
        email: userData.email,
        address: userData.address,
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Failed to fetch user data.');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call API to update user information
      const response = await axios.put(`http://localhost:8082/api/users/${user.id}`, {
        password: user.password,
        email: user.email,
        userName: user.userName,
        address: user.address,
      });

      console.log('User updated:', response.data);
      setSuccessMessage('User updated successfully!');
    } catch (error) {
      console.error('Error updating user data:', error);
      setError('Failed to update user.');
    }
  };

  // Conditional rendering for loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.profileContainer}>
        <img
          src={user.profileImage ? URL.createObjectURL(user.profileImage) : 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1726185600&semt=ais_hybrid'}
          alt="Profile"
          style={styles.profileImage}
        />
      </div>
      {/* <h2 style={styles.title}>Admin Profile</h2> */}
      <form onSubmit={handleSubmit} style={styles.form}>
        {successMessage && <div style={styles.successMessage}>{successMessage}</div>}
        <div style={styles.inputGroup}>
          <label style={styles.label}>User ID:</label>
          <input
            type="text"
            name="userId"
            value={user.userId}
            onChange={handleChange}
            style={styles.input}
            disabled // Make this field read-only
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            style={styles.input}
            disabled // Make this field read-only
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>User Name:</label>
          <input
            type="text"
            name="userName"
            value={user.userName}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
    
        <div style={styles.inputGroup}>
          <label style={styles.label}>Address:</label>
          <input
            type="text"
            name="address"
            value={user.address}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <br />
        <button type="submit" style={styles.button}>
          Update
        </button>
        <br />
      </form>
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  profileContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  profileImage: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #4CAF50',
  },
  title: {
    fontSize: '24px',
    color: '#333',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    width: '100%',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  label: {
    marginBottom: '5px',
    fontSize: '16px',
    color: '#555',
    margin: '1% 10% auto',
    textAlign: 'left',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '80%',
    margin: '0 auto',
    display: 'block',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '80%',
    margin: '0 auto',
    display: 'block',
  },
  successMessage: {
    color: 'green',
    marginBottom: '10px',
  },
};

export default UserProfile;
