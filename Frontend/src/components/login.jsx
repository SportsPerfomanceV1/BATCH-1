import React, {useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './LoginRegister.css';
import showPasswordIcon from '../images/show.png';
import hidePasswordIcon from '../images/hide.png';

const LoginPage = ({ setLoggedIn }) => {
  const navigate = usenavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    userType: 'athlete' // Default user type
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    document.title = 'Log-in Page';
  }, []);

  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
  };

  const validateEmail= (email) => {
    const emailRegex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex
    return emailRegex.test(email);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setMessage('');
      const response = await axios.post('http://localhost:8080/api/login', formData);
      setMessage(response.data.message);

      // Set login state and save to sessionStorage
      setLoggedIn(true);
      sessionStorage.setItem("loggedIn", "true");
      sessionStorage.setItem("username", formData.username); // Save username to sessionStorage
      sessionStorage.setItem("userType", formData.userType); // Save userType to sessionStorage

      if (response.data.redirectUrl) {
          navigate(response.data.redirectUrl);
      }
    } catch (error) {
      setError(error.response?.data.error || 'Login failed. Please try again.');
    }
  };

  return (
      <div className="form-container">
        <form className="form-box" onSubmit={handleSubmit}>
          <h3 className="form-header">Login</h3>
          <input
            type="email"
            placeholder="Email*"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="password-field">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password*"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <img
              src={showPassword ? hidePasswordIcon : showPasswordIcon}
              alt="Toggle Password Visibility"
              className="password-toggle-icon"
              onClick={togglePasswordVisibility}
            />
          </div>
          <button type="submit" className="submit-btn">Login</button>
          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
  );
};

export default Login;
