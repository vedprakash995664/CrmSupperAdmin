import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from "react-router-dom";
import Dashboard from '../Components/Dashboard';
import './CSS/UsersFullPage.css';

function UsersFullPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { viewdata } = location.state || [];
  const { tableTitle } = location.state || [];


  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Password: "",
    Gender: "",
    DateOfBirth: "",
    CompanyType: "",
    CompanyName: "",
    Street: "",
    ZipCode: "",
    City: "",
    State: "",
    Country: "",
  });

  const [loading, setLoading] = useState(true); // Loading state for data fetching
  const [isDisabled, setIsDisabled] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const APi_Url=import.meta.env.VITE_API_URL
  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await axios.get(`${APi_Url}/digicoder/crm/api/v1/admin/getone/${viewdata._id}`);
        setFormData({
          Name:response.data.admin.name,
          Email: response.data.admin.email,
          Phone: response.data.admin.mobile,
          Password: response.data.admin.password,
          Gender: response.data.admin.gender,
          DateOfBirth: response.data.admin.DateOfBirth,
          CompanyType: response.data.admin.companyType,
          CompanyName: response.data.admin.companyName,
          Street: response.data.admin.street,
          ZipCode: response.data.admin.zipCode,
          City: response.data.admin.city,
          State: response.data.admin.state,
          Country: response.data.admin.country,


        })
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("Failed to fetch user data.");
      }
    };

    fetchData();
  }, [viewdata.id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = () => {
    setIsEditing(true);
    setIsDisabled(false);
  };

  const handleSave = async () => {
    try {
      console.log("Form Data:", formData);
      // API call to update the user data without token
      const response = await axios.put(`http://your-api-endpoint.com/users/${viewdata._id}`, formData);

      if (response.status === 200) {
        toast.success("Updated successfully!");
      } else {
        toast.error("Failed to update.");
      }
    } catch (error) {
      toast.error("Error while updating user data.");
    }
    setIsEditing(false);
    setIsDisabled(true);
  };

  const handleBack = () => {
    navigate('/manageUser');
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state while data is being fetched
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
              <div className="fullLeads-icons">
                <button style={{ color: "red" }}><i className="ri-delete-bin-5-fill"></i></button>
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
                    <input
                      type="text"
                      className="input-field"
                      name="Name"
                      value={formData.Name}
                      onChange={handleChange}
                      disabled={isDisabled}
                    />
                  </div>
                  <div>
                    <div className="label">Email</div>
                    <input
                      type="email"
                      className="input-field"
                      name="Email"
                      value={formData.Email}
                      onChange={handleChange}
                      disabled={isDisabled}
                    />
                  </div>
                  <div>
                    <div className="label">Password</div>
                    <input
                      type="text"
                      className="input-field"
                      name="Password"
                      value={formData.Password}
                      onChange={handleChange}
                      disabled={isDisabled}
                    />
                  </div>
                  <div>
                    <div className="label">Phone Number</div>
                    <input
                      type="number"
                      className="input-field"
                      name="Phone"
                      value={formData.Phone}
                      onChange={handleChange}
                      disabled={isDisabled}
                    />
                  </div>
                  <div>
                    <div className="label">Date Of Birth</div>
                    <input
                      type="date"
                      className="input-field"
                      name="DateOfBirth"
                      value={formData.DateOfBirth}
                      onChange={handleChange}
                      disabled={isDisabled}
                    />
                  </div>
                  <div>
                    <div className="label">Gender</div>
                    <select
                      className="input-field"
                      name="Gender"
                      value={formData.Gender}
                      onChange={handleChange}
                      disabled={isDisabled}
                    >
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
                    <input
                      type="text"
                      className="input-field"
                      name="CompanyName"
                      value={formData.CompanyType}
                      onChange={handleChange}
                      disabled={isDisabled}
                    />
                  </div>
                  <div>
                    <div className="label">Company Name</div>
                    <input
                      type="text"
                      className="input-field"
                      name="CompanyName"
                      value={formData.CompanyName}
                      onChange={handleChange}
                      disabled={isDisabled}
                    />
                  </div>
                  <div>
                    <div className="label">Street</div>
                    <input
                      type="text"
                      className="input-field"
                      name="Street"
                      value={formData.Street}
                      onChange={handleChange}
                      disabled={isDisabled}
                    />
                  </div>
                  <div>
                    <div className="label">Zip Code</div>
                    <input
                      type="number"
                      className="input-field"
                      name="ZipCode"
                      value={formData.ZipCode}
                      onChange={handleChange}
                      disabled={isDisabled}
                    />
                  </div>
                  <div>
                    <div className="label">City</div>
                    <input
                      type="text"
                      className="input-field"
                      name="City"
                      value={formData.City}
                      onChange={handleChange}
                      disabled={isDisabled}
                    />
                  </div>
                  <div>
                    <div className="label">State</div>
                    <input
                      type="text"
                      className="input-field"
                      name="State"
                      value={formData.State}
                      onChange={handleChange}
                      disabled={isDisabled}
                    />
                  </div>
                  <div>
                    <div className="label">Country</div>
                    <input
                      type="text"
                      className="input-field"
                      name="Country"
                      value={formData.Country}
                      onChange={handleChange}
                      disabled={isDisabled}
                    />
                  </div>
                </div>
              </div>

              <div className="view-edit-btn">
                <button onClick={isEditing ? handleSave : handleUpdate}>
                  {isEditing ? "Save" : "Update"}
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
