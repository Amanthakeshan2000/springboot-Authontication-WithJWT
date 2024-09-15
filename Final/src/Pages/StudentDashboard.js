import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { FaBars, FaClipboardList, FaUndo, FaCalendarAlt, FaUsers, FaBuilding, FaUser } from 'react-icons/fa';
import Navbar from '../Components/Navbar';
import ReturnForm from './returnForm';
import CreateRequestPage from './CreateRequestPage'; // Import the CreateRequestPage component
import RequestHistory from './RequestHistory';
import AllUsersManagement from './allUsersManagement';
import AccessPermission from './AccessPermission';
import CreateAccess from './CreateAccess';

import ManageAccess from './manageAccess';
import Dashboard from './stDashboard';
import UserProfile from './userProfile';
import logo from '../Assets/Logo.png';
import '../Css/bootstrap.css';
import '../Css/Sidebar.css';
import '../Css/Transitions.css'; // Import the CSS file for transitions

export default function StudentDashboard() {
  // States for sidebar and active menu
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState('Dashboard');
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [isEventsOpen, setIsEventsOpen] = useState(false);

  // Toggle sidebar function
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Toggle request submenu
  const toggleRequestMenu = () => {
    setIsRequestOpen(!isRequestOpen);
  };

  // Toggle events submenu
  const toggleEventsMenu = () => {
    setIsEventsOpen(!isEventsOpen);
  };

  return (
    <div className="App a">
      <div className="main-content m">
        <Navbar />
        <div className="content cc">
          <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
            <div className="logo">
              <img src={logo} alt="NSBM Inventory Management System" />
            </div>
            <div className="menu">
              <div
                className={`menuItem ${activeMenuItem === 'Dashboard' ? 'active' : ''}`}
                onClick={() => setActiveMenuItem('Dashboard')}
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
                <span onClick={() => setActiveMenuItem('CreateRequest')}>Create Request</span>
                <span onClick={() => setActiveMenuItem('RequestHistory')}>Request History</span>
              </div>

              <div
                className={`menuItem ${activeMenuItem === 'Return' ? 'active' : ''}`}
                onClick={() => setActiveMenuItem('Return')}
              >
                <FaUndo className="icon" />
                <span>Return</span>
              </div>

              {/* <div
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
                className={`menuItem ${activeMenuItem === 'Workplaces' ? 'active' : ''}`}
                onClick={() => setActiveMenuItem('Workplaces')}
              >
                <FaBuilding className="icon" />
                <span>Workplaces</span>
              </div> */}

              <div
                className={`menuItem ${activeMenuItem === 'Employees' ? 'active' : ''}`}
                onClick={() => setActiveMenuItem('UserProfile')}
              >
                <FaUser className="icon" />
                <span>Admin Profile</span>
              </div>
              <div
                className={`menuItem ${activeMenuItem === 'Teams' ? 'active' : ''}`}
                onClick={() => setActiveMenuItem('allUsersManagement')}
              >
                <FaUsers className="icon" />
                <span>User Management</span>
              </div>
            
              <div
                className={`menuItem ${activeMenuItem === 'Teams' ? 'active' : ''}`}
                onClick={() => setActiveMenuItem('createAccess')}
              >
                <FaCalendarAlt className="icon" />
                <span>Create Access Name</span>
              </div>
              <div
                className={`menuItem ${activeMenuItem === 'Teams' ? 'active' : ''}`}
                onClick={() => setActiveMenuItem('accessPermission')}
              >
                <FaBuilding className="icon" />
                <span>Access Permission</span>
              </div>
              <div
                className={`menuItem ${activeMenuItem === 'Teams' ? 'active' : ''}`}
                onClick={() => setActiveMenuItem('manageAccess')}
              >
                <FaClipboardList className="icon" />
                <span>Manage Access</span>
              </div>
            </div>
          </div>

          <div className="main-content-area">
            <TransitionGroup>
              <CSSTransition
                key={activeMenuItem}
                timeout={300}
                classNames="fade"
              >
                <div>
                  {/* Conditionally render based on activeMenuItem */}
                  {activeMenuItem === 'Dashboard' && <Dashboard />}
                  {activeMenuItem === 'CreateRequest' && <CreateRequestPage />}
                  {activeMenuItem === 'RequestHistory' && <RequestHistory />}
                  {activeMenuItem === 'Return' && <ReturnForm />}
                  {activeMenuItem === 'UserProfile' && <UserProfile />}
                  {activeMenuItem === 'allUsersManagement' && <AllUsersManagement />}
                  {activeMenuItem === 'accessPermission' && <AccessPermission />}
                  {activeMenuItem === 'createAccess' && <CreateAccess />}
                  {activeMenuItem === 'manageAccess' && <ManageAccess />}
                </div>
              </CSSTransition>
            </TransitionGroup>
          </div>
        </div>
      </div>
    </div>
  );
}
