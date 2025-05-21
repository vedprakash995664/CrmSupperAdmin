import React from 'react';
import Dashboard from '../Components/Dashboard';
import './CSS/MainDashboard.css'; 

// Import icons
import { MdPersonAdd, MdBlock, MdManageAccounts } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

function MainDashboard() {
  const navigate=useNavigate()
  return (
    <Dashboard>
  
      <div className="dashboard-container">
        <div className="card-container">
          
          <div className="dashboard-card add-user" onClick={()=>navigate('/addUser')} style={{cursor:"pointer"}}>
            <MdPersonAdd size={40} className="card-icon" />
            <h3>Add New User</h3>
            <p>Create and manage new user profiles.</p>
          </div>

          <div className="dashboard-card blocked-user" onClick={()=>navigate('/deletedUser')} style={{cursor:"pointer"}}>
            <MdBlock size={40} className="card-icon" />
            <h3>Blocked Users</h3>
            <p>View and manage blocked users.</p>
          </div>

          <div className="dashboard-card managed-user" onClick={()=>navigate('/manageUser')} style={{cursor:"pointer"}}>
            <MdManageAccounts size={40} className="card-icon" />
            <h3>Managed Users</h3>
            <p>View all managed user accounts.</p>
          </div>

        </div>
      </div>
    </Dashboard>
  );
}

export default MainDashboard;
