import React, { useState } from 'react';
import axios from 'axios';
import './login-signup.css';
import { Link, useNavigate } from 'react-router-dom';
import showPasswordIcon from '../image/show.png';
import hidePasswordIcon from '../image/hide.png';

const LoginPage = ({ setLoggedIn }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('');
            setMessage('');
            const response = await axios.post('http://localhost:8080/api/login', formData);
            setMessage(response.data.message);

            setLoggedIn(true);
            sessionStorage.setItem("loggedIn", "true");
            sessionStorage.setItem("username", response.data.username);
            sessionStorage.setItem("userType", response.data.userType);
            sessionStorage.setItem("firstName", response.data.firstname);

            if (response.data.redirectUrl) {
                navigate(response.data.redirectUrl);
            }
        } catch (error) {
            setError(error.response?.data.error || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email:*"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <div className="password-fields">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Password:*"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <img
                        src={showPassword ? hidePasswordIcon : showPasswordIcon}
                        alt="Toggle Password Visibility"
                        className="password-toggle-icon"
                        onClick={togglePasswordVisibility}
                    />
                </div>
                <button type="submit">Login</button>
                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}
                <p>
                    Don't have an account? <Link to="/signup">Register here</Link>
                </p>
            </form>
        </div>
    );
};

export default LoginPage;
