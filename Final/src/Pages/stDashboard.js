import React from 'react';
import { useNavigate } from "react-router-dom";


export default function UniversityDashboard() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '70vh',
    backgroundColor: '#f4fbff',
    borderRadius:'10px',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const headerStyle = {
    backgroundColor: '#005b8c',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
    textAlign: 'center',
    fontWeight: 'bold'
  };

  const contentStyle = {
    flex: 1,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: '20px'
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    width: '250px',
    textAlign: 'center',
    transition: 'transform 0.3s ease-in-out'
  };

  const cardTitleStyle = {
    fontSize: '18px',
    marginBottom: '10px',
    color: '#004d00'
  };

  const cardDescriptionStyle = {
    fontSize: '14px',
    color: '#666'
  };

  const buttonStyle = {
    backgroundColor: '#008ad5',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
    marginTop: '10px'
  };

  const buttonHoverStyle = {
    backgroundColor: '#005b8c'
  };

  return (
    <div style={containerStyle}>
   <div style={headerStyle}>
        <h1>Dashboard</h1>
      </div>
      <br/>
      {/* <div style={contentStyle}>
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} style={cardStyle}>
            <h2 style={cardTitleStyle}>Card {index + 1}</h2>
            <p style={cardDescriptionStyle}>This is the description for card {index + 2}.</p>
            <button
              style={buttonStyle}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
              onClick={() => handleNavigation(`/card${index + 1}`)}
            >
              View Details
            </button>
          </div>
        ))}
      </div> */}
    </div>
  );
}
