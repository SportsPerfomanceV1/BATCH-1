import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import './login-signup.css';
import showPasswordIcon from '../image/show.png';
import hidePasswordIcon from '../image/hide.png';

const SignupPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
//        middlename: '', // Optional field
        username: '',
        email: '',
        password: '',
        confirmPassword: '', // Added confirmPassword state
        userType: 'athlete' // Default user type
    });

    const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
    const [error, setError] = useState(''); // For error messages
    const [message, setMessage] = useState(''); // For success messages

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Ensure passwords match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            // Clear previous messages
            setError('');
            setMessage('');

            // Make a POST request to the backend signup endpoint
            const response = await axios.post('http://localhost:8080/api/signup', formData);

            // Handle success
            setMessage(response.data.message || 'Signup successful! Redirecting to login...');
            navigate('/login'); // Redirect to the login page after a signup
        } catch (error) {
            // Handle error
            if (error.response && error.response.data) {
                setError(error.response.data); // Backend returns error message
            } else {
                setError('Signup failed. Please try again.');
            }
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form className="signup-form" onSubmit={handleSubmit}>
                <div className='name-fields'>
                    <input
                        type="text"
                        name="firstname"
                        placeholder="First Name:*"
                        value={formData.firstname}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="lastname"
                        placeholder="Last Name:*"
                        value={formData.lastname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <input
                    type="text"
                    name="username"
                    placeholder="Username:*"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
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
                <small>Min 5 alphabets and Min 3 numbers are required*</small>
                <PasswordStrengthMeter password={formData.password} />
                <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Confirm Password:*"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />
                <select name="userType" value={formData.userType} onChange={handleChange}>
                    <option value="athlete">Athlete</option>
                    <option value="coach">Coach</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit">Sign Up</button>
                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}
                <p>
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            </form>
        </div>
    );
};

export default SignupPage;
