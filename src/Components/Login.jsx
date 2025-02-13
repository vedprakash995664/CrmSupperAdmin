import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./CSS/Login.css";
import axios from "axios";

const Login = () => {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!userName || !password) {
      setError("All fields are required.");
      toast.error("All fields are required.");
      return;
    }
    const formData = { userName, password };
    const APi_Url=import.meta.env.VITE_API_URL
    try {
      const response = await axios.post(`${APi_Url}/digicoder/crm/api/v1/superadmin/login`, formData);

      if (response.data) {
        toast.success("Logged in successfully!");
        const tokenId='sdsfhfdsbc';        
        sessionStorage.setItem('Token',tokenId);
        const SuperAdminID=response.data.existUser._id;
        sessionStorage.setItem("SuperAdmin",SuperAdminID);
        
        setTimeout(() => {
          setuserName("");
          setPassword("");
          navigate('/dashboard',);
        }, 500);
      } else {
        setError("Invalid userName or password.");
        toast.error("Invalid userName or password.");
      }
    } catch (error) {
      setError("An error occurred while processing your request.");
      toast.error("An error occurred while processing your request.");
      console.error(error);
    }
  };

  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField("");
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Welcome Back</h1>
        <p>Access Your Account</p>

        <form onSubmit={handleSubmit}>
          <fieldset className={focusedField === "userName" ? "focused" : ""}>
            <legend>userName</legend>
            <div className="input-group">
              <input
                type="userName"
                id="userName"
                name="userName"
                placeholder="Enter your userName"
                value={userName}
                onChange={(e) => setuserName(e.target.value)}
                onFocus={() => handleFocus("userName")}
                onBlur={handleBlur}
                required
              />
            </div>
          </fieldset>
          <fieldset className={focusedField === "password" ? "focused" : ""}>
            <legend>Password</legend>
            <div className="input-group">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => handleFocus("password")}
                onBlur={handleBlur}
                required
              />
            </div>
          </fieldset>
          <div className="remember-forgot">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={handleRememberMe}
              />
              Remember Me
            </label>
            <a href="/forgot-password" className="forgot-password-link">
              Forgot Password?
            </a>
          </div>
          <br />
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="submit-btn">Login</button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
