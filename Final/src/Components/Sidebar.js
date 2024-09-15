import React, { useState } from 'react';
import { FaBars, FaClipboardList, FaCalendarAlt, FaUsers, FaBuilding, FaUser, FaUndo } from 'react-icons/fa';
import '../Css/Sidebar.css';
import logo from '../Assets/Logo.png';
import '../Css/bootstrap.css';

const Sidebar = () => {
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [isEventsOpen, setIsEventsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar initially hidden
  const [activeMenuItem, setActiveMenuItem] = useState('Dashboard'); // Dashboard is active by default

  const toggleRequestMenu = () => {
    setIsRequestOpen(!isRequestOpen);
    setIsEventsOpen(false); // Close events menu when request menu is toggled
    setActiveMenuItem('Request'); // Set 'Request' as active
  };

  const toggleEventsMenu = () => {
    setIsEventsOpen(!isEventsOpen);
    setIsRequestOpen(false); // Close request menu when events menu is toggled
    setActiveMenuItem('Events'); // Set 'Events' as active
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const setActiveItem = (itemName) => {
    setActiveMenuItem(itemName); // Update active item on click
  };

  return (
    <div>
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="logo">
          <img src={logo} alt="NSBM Inventory Management System" />
        </div>
        <div className="menu">
          <div
            className={`menuItem ${activeMenuItem === 'Dashboard' ? 'active' : ''}`}
            onClick={() => setActiveItem('Dashboard')}
          >
            <FaBars className="icon" />
            <span>Dashboard</span>
          </div>
          
          <div
            className={`menuItem ${activeMenuItem === 'Request' ? 'active' : ''}`}
            onClick={toggleRequestMenu}
          >
            <FaClipboardList className="icon" />
            <span>Request</span>
          </div>
          <div className={`submenu ${isRequestOpen ? 'open' : ''}`}>
            <span>Create Request</span>
            <span>Request History</span>
          </div>
          
          <div
            className={`menuItem ${activeMenuItem === 'Return' ? 'active' : ''}`}
            onClick={() => setActiveItem('Return')}
          >
            <FaUndo className="icon" />
            <span>Return</span>
          </div>
          
          <div
            className={`menuItem ${activeMenuItem === 'Events' ? 'active' : ''}`}
            onClick={toggleEventsMenu}
          >
            <FaCalendarAlt className="icon" />
            <span>Events</span>
          </div>
          <div className={`submenu ${isEventsOpen ? 'open' : ''}`}>
            <span>Active Events</span>
          </div>
          
          <div
            className={`menuItem ${activeMenuItem === 'Teams' ? 'active' : ''}`}
            onClick={() => setActiveItem('Teams')}
          >
            <FaUsers className="icon" />
            <span>Teams</span>
          </div>
          
          <div
            className={`menuItem ${activeMenuItem === 'Workplaces' ? 'active' : ''}`}
            onClick={() => setActiveItem('Workplaces')}
          >
            <FaBuilding className="icon" />
            <span>Workplaces</span>
          </div>
          
          <div
            className={`menuItem ${activeMenuItem === 'Employees' ? 'active' : ''}`}
            onClick={() => setActiveItem('Employees')}
          >
            <FaUser className="icon" />
            <span>User Management</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
