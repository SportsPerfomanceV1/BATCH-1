import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Added Link here
import './login.css';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        userType: 'athlete' // Default user type
    });

    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('');
            setMessage('');

            const response = await axios.post('http://localhost:8080/api/login', formData);

            if (response.data.includes('/home')) {
                navigate('/home'); // Navigate to home if athlete
            } else if (response.data.includes('/dashboard')) {
                navigate('/dashboard'); // Navigate to dashboard if coach
            } else {
                setMessage(response.data);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data);
            } else {
                setError('Login failed. Please try again.');
            }
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>User Type:</label>
                    <select name="userType" value={formData.userType} onChange={handleChange}>
                        <option value="athlete">Athlete</option>
                        <option value="coach">Coach</option>
                    </select>
                </div>
                <button type="submit" className="login-button">Login</button>
                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}
            </form>

            {/* Link to signup page */}
            <div className="signup-link">
                <p>Don't have an account? <Link to="/signup">Sign up here</Link></p> {/* Fixed Link component */}
            </div>
        </div>
    );
};

export default LoginPage;
