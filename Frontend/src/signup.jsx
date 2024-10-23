import React, { useState } from 'react';
import axios from 'axios';
import './signup.css'; // Make sure you have appropriate styles

const SignupPage = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        middlename: '', // Optional field
        username: '',
        email: '',
        password: '',
        userType: 'athlete' // Default user type
    });

    const [error, setError] = useState(''); // For error messages
    const [message, setMessage] = useState(''); // For success messages

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Clear previous messages
            setError('');
            setMessage('');

            // Make a POST request to the backend signup endpoint
            const response = await axios.post('http://localhost:8080/api/signup', formData);

            // Handle success
            setMessage(response.data); // Backend returns success message
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
            <form onSubmit={handleSubmit} className="signup-form">
                <div className="form-group">
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Middle Name (optional):</label>
                    <input
                        type="text"
                        name="middlename"
                        value={formData.middlename}
                        onChange={handleChange}
                    />
                </div>
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
                <button type="submit" className="signup-button">Sign Up</button>

                {/* Display success or error message below the button */}
                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default SignupPage;
