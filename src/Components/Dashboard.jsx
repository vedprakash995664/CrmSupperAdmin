import React, { useEffect, useState } from "react";
import "./CSS/Dashboard.css";
import { ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'; 

const Dashboard = ({ children, active }) => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false);
  const [isShow, setIsShow] = useState(false);  
  const user = "Ved Prakash"; 
  const navigate = useNavigate();
  
  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  const toggleDropdown = () => {
    setDropdownActive(!dropdownActive);
  };

  const handleIsShow = () => {
    setIsShow(prevState => !prevState);
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  const handlelogout = () => {
    Swal.fire({
      title: 'Are you sure ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, log me out',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Logged out successfully!',
          icon: 'success',
        }).then(() => {
          sessionStorage.removeItem("Token");
          navigate('/');
        });
      } else {
        Swal.fire({
          title: 'Thanks',
          text: 'You are still logged in.',
          icon: 'info',
        });
      }
    });
  };

  useEffect(() => {
    const tokenId = sessionStorage.getItem('Token');
    if (!tokenId) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <div className={`sidebar ${sidebarActive ? "active" : ""}`}>
      <div className="sidebar-logo"><img src="/Images/cr.gif" style={{width:"200px"}} alt="" /></div>
        <div className="navigation">
          <ul className="sidebar-nav-links">
            <Link className="navigation-link" to="/dashboard">
              <li>
                <button className={`sidebar-link ${active === 'dashboard' && 'active'}`}>
                  <i className="ri-dashboard-horizontal-fill"></i> &nbsp;Dashboard
                </button>
              </li>
            </Link>
            <Link className="navigation-link" to="/addUser">
              <li>
                <button className={`sidebar-link ${active === 'leads' && 'active'}`}>
                <i class="ri-user-add-fill"></i> &nbsp;Add Users
                </button>
              </li>
            </Link>
            <Link className="navigation-link" to="/manageUser">
              <li>
                <button className={`sidebar-link ${active === 'assigned' && 'active'}`}>
                <i class="ri-group-fill"></i>&nbsp;Manage Users
                </button>
              </li>
            </Link>
            {/* <Link className="navigation-link" to="/manageUser">
              <li>
                <button className={`sidebar-link ${active === 'assigned' && 'active'}`}>
                <i class="ri-group-fill"></i>&nbsp;Add Company Type
                </button>
              </li>
            </Link> */}
          </ul>  
        </div>
        <div className="logout-div">
          <button className="sidebar-linkk" onClick={() => handlelogout()}>
            <i className="ri-logout-circle-line"></i> &nbsp;Logout
          </button>
        </div>
        <button className="sidebar-close-btn" onClick={toggleSidebar}>
          ×
        </button>
      </div>

      <div className="main-content">
        <header className="header">
          <h1 className="header-title">Welcome Back, {user}</h1>
          <button className="hamburger" onClick={toggleSidebar}>
            {sidebarActive ? "×" : "☰"}  
          </button>
          <div>
            <div className="sidebar-profile">
              <img 
                src="/Images/ved.jpg" 
                alt="" 
                className="img-fluid" 
                onClick={handleIsShow}
              />
            </div>
            {isShow && (
              <div className="newDiv">
                <div className={`newDiv-item ${active === 'profile' && 'newDiv-active'}`} onClick={handleProfile}><i className="ri-profile-fill" style={{color:"#3454D1"}}></i> Profile</div>
                <div className="newDiv-item logout" onClick={() => handlelogout()}><i className="ri-logout-circle-line" style={{color:"#3454D1"}}></i> Logout</div>
              </div>
            )}
          </div>
        </header>

        <div className="content-wrapper">
          <div className="content">
            {children}
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Dashboard;
