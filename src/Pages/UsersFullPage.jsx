import React, { useState, useEffect } from "react";
import axios from "axios"; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from "react-router-dom";
import Dashboard from '../Components/Dashboard';
import './CSS/UsersFullPage.css';

function UsersFullPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { viewdata } = location.state || {};
  const APi_Url = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    phone: "",
    email: "",
    password: "",
    DateOfBirth: "",
    gender: "",
    companyName: "",
    companyType: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zipCode: ""
  });

  const [loading, setLoading] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false); // New state for loader on update button

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${APi_Url}/digicoder/crm/api/v1/admin/getone/${viewdata._id}`);
        const adminData = response.data.admin;

        setFormData({
          name: adminData.name || "",
          email: adminData.email || "",
          mobile: adminData.mobile || "",
          phone: adminData.phone || "",
          password: adminData.password || "",
          gender: adminData.gender || "",
          DateOfBirth: adminData.DateOfBirth || "",
          companyType: adminData.companyType || "",
          companyName: adminData.companyName || "",
          street: adminData.street || "",
          zipCode: adminData.zipCode || "",
          city: adminData.city || "",
          state: adminData.state || "",
          country: adminData.country || ""
        });

        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("Failed to fetch user data.");
      }
    };

    fetchData();
  }, [viewdata._id]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = () => {
    setIsEditing(true);
    setIsDisabled(false);
  };

  const handleSave = async () => {
    setIsUpdating(true); // Show loader
    try {
      const response = await axios.put(
        `${APi_Url}/digicoder/crm/api/v1/admin/update/${viewdata._id}`, 
        formData
      );

      if (response.status === 200) {
        toast.success("Updated successfully!");
      } else {
        toast.error("Failed to update.");
      }
    } catch (error) {
      toast.error("Error while updating user data.");
    }
    setIsUpdating(false); // Hide loader
    setIsEditing(false);
    setIsDisabled(true);
  };

  const handleBack = () => {
    navigate('/manageUser');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Dashboard active={'fullLead'}>
        <div className="content fullLead-outer">
          <div className="fullLead-outer">
            <div className="fullLeads-header">
              <div className="back-btn">
                <button onClick={handleBack}><i className="ri-arrow-left-line"></i> Back</button>
              </div>
            </div>

            <div className="fullLeads-view-data">
              <div className="view-data-title">
                <span>Primary Information</span>
              </div>
              <div className="view-info-form">
                <div className="form-row">
                  <div>
                    <div className="label">Name</div>
                    <input type="text" className="input-field" name="name" value={formData.name} onChange={handleChange} disabled={isDisabled} />
                  </div>
                  <div>
                    <div className="label">Email</div>
                    <input type="email" className="input-field" name="email" value={formData.email} onChange={handleChange} disabled={isDisabled} />
                  </div>
                  <div>
                    <div className="label">Password</div>
                    <input type="text" className="input-field" name="password" value={formData.password} onChange={handleChange} disabled={isDisabled} />
                  </div>
                  <div>
                    <div className="label">Phone Number</div>
                    <input type="number" className="input-field" disabled name="phone" value={formData.mobile} onChange={handleChange} />
                  </div>
                  <div>
                    <div className="label">Date Of Birth</div>
                    <input type="date" className="input-field" name="DateOfBirth" value={formData.DateOfBirth} onChange={handleChange} disabled={isDisabled} />
                  </div>
                  <div>
                    <div className="label">Gender</div>
                    <select className="input-field" name="gender" value={formData.gender} onChange={handleChange} disabled={isDisabled}>
                      <option value="" disabled>-- Select --</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="view-data-title">
                <span>Company Information</span>
              </div>
              <div className="view-info-form">
                <div className="form-row">
                  <div>
                    <div className="label">Company Type</div>
                    <input type="text" className="input-field" name="companyType" value={formData.companyType} onChange={handleChange} disabled={isDisabled} />
                  </div>
                  <div>
                    <div className="label">Company Name</div>
                    <input type="text" className="input-field" name="companyName" value={formData.companyName} onChange={handleChange} disabled={isDisabled} />
                  </div>
                  <div>
                    <div className="label">Street</div>
                    <input type="text" className="input-field" name="street" value={formData.street} onChange={handleChange} disabled={isDisabled} />
                  </div>
                  <div>
                    <div className="label">Zip Code</div>
                    <input type="number" className="input-field" name="zipCode" value={formData.zipCode} onChange={handleChange} disabled={isDisabled} />
                  </div>
                  <div>
                    <div className="label">City</div>
                    <input type="text" className="input-field" name="city" value={formData.city} onChange={handleChange} disabled={isDisabled} />
                  </div>
                  <div>
                    <div className="label">State</div>
                    <input type="text" className="input-field" name="state" value={formData.state} onChange={handleChange} disabled={isDisabled} />
                  </div>
                  <div>
                    <div className="label">Country</div>
                    <input type="text" className="input-field" name="country" value={formData.country} onChange={handleChange} disabled={isDisabled} />
                  </div>
                </div>
              </div>

              <div className="view-edit-btn">
                <button onClick={isEditing ? handleSave : handleUpdate} disabled={isUpdating}>
                  {isUpdating ? "Saving..." : isEditing ? "Save" : "Update"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Dashboard>
    </div>
  );
}

export default UsersFullPage;
