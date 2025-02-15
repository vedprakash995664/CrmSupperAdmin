import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "../Components/Dashboard";
import "./CSS/AddUser.css";

function AddUser() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    DateOfBirth: "",
    gender: "",
    companyName: "",
    companyType: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
  });

  const [loading, setLoading] = useState(false);
const APi_Url=import.meta.env.VITE_API_URL
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
console.log(userData);

    try {
      const SuperAdminID=sessionStorage.getItem("SuperAdmin")
      const response = await axios.post(
        `${APi_Url}/digicoder/crm/api/v1/admin/add/${SuperAdminID}`,
        userData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 201) {
        toast.success("User added successfully!");
        setUserData({
          name: "",
          email: "",
          password: "",
          mobile: "",
          DateOfBirth: "",
          gender: "",
          companyName: "",
          companyType: "",
          street: "",
          city: "",
          state: "",
          country: "",
          zipCode: "",
        });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error adding user. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dashboard>
      <form onSubmit={handleSubmit} className="addUser-form">
        <h3 className="addUser-h3">Primary Information</h3>
        <br />
        <div className="addUser-div">
          <label className="addUser-label">Name:</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            className="addUser-input"
            
          />
        </div>
        <div className="addUser-div">
          <label className="addUser-label">Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="addUser-input"
            
          />
        </div>
        <div className="addUser-div">
          <label className="addUser-label">Password:</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            className="addUser-input"
            
          />
        </div>

        <div className="addUser-div">
          <label className="addUser-label">Mobile:</label>
          <input
            type="text"
            name="mobile"
            value={userData.mobile}
            onChange={handleChange}
            className="addUser-input"
            
          />
        </div>
        <div className="addUser-div">
          <label className="addUser-label">Date of Birth:</label>
          <input
            type="date"
            name="DateOfBirth"
            value={userData.DateOfBirth}
            onChange={handleChange}
            className="addUser-input"
            
          />
        </div>

        <div className="addUser-div">
          <label className="addUser-label">Gender:</label>
          <select
            name="gender"
            value={userData.gender}
            onChange={handleChange}
            className="addUser-input"
            
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <h3 className="addUser-h3">Secondary Information</h3>
        <br />
        <div className="addUser-div">
          <label className="addUser-label">Company Name:</label>
          <input
            type="text"
            name="companyName"
            value={userData.companyName}
            onChange={handleChange}
            className="addUser-input"
          />
        </div>
        <div className="addUser-div">
          <label className="addUser-label">Company Type:</label>
          <input
            type="text"
            name="companyType"
            value={userData.companyType}
            onChange={handleChange}
            className="addUser-input"
          />
        </div>
        <div className="addUser-div">
          <label className="addUser-label">Street:</label>
          <input
            type="text"
            name="street"
            value={userData.street}
            onChange={handleChange}
            className="addUser-input"
          />
        </div>
        <div className="addUser-div">
          <label className="addUser-label">Zip Code:</label>
          <input
            type="text"
            name="zipCode"
            value={userData.zipCode}
            onChange={handleChange}
            className="addUser-input"
          />
        </div>
        <div className="addUser-div">
          <label className="addUser-label">City:</label>
          <input
            type="text"
            name="city"
            value={userData.city}
            onChange={handleChange}
            className="addUser-input"
          />
        </div>
        <div className="addUser-div">
          <label className="addUser-label">State:</label>
          <input
            type="text"
            name="state"
            value={userData.state}
            onChange={handleChange}
            className="addUser-input"
          />
        </div>
        <div className="addUser-div">
          <label className="addUser-label">Country:</label>
          <input
            type="text"
            name="country"
            value={userData.country}
            onChange={handleChange}
            className="addUser-input"
          />
        </div>
        <br />

        <div className="addUser-div">
          <button type="submit" className="addUser-button" disabled={loading}>
            {loading ? "Adding User..." : "Add User"}
          </button>
        </div>
      </form>

      <ToastContainer />
    </Dashboard>
  );
}

export default AddUser;
