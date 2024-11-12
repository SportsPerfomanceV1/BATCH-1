import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setIsLoading(true); // Start loading indicator

        // Validate fields
        if (!username || !email || !password) {
            setErrorMessage('All fields are required.');
            setIsLoading(false); // Stop loading indicator
            return;
        }

        // Validate email format
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setErrorMessage('Invalid email format.');
            setIsLoading(false); // Stop loading indicator
            return;
        }

        try {
            // Send login request to backend
            const response = await axios.post('http://localhost:8080/admin/login', {
                username,
                email,
                password,
            });

            // Handle successful response
            if (response.status === 200) {
                setErrorMessage(''); // Clear any previous errors
                sessionStorage.setItem('isAdmin', 'true'); // Store admin status
                sessionStorage.setItem('loggedIn', 'true'); // Set login flag
                navigate('/admin/dashboard'); // Redirect to dashboard
            }
        } catch (error) {
            console.error('Login failed:', error);
            setErrorMessage('Invalid username, email, or password.');
        } finally {
            setIsLoading(false); // Stop loading indicator
        }
    };

    return (
        <div className="login-container">
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button type="submit" className="login-button" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;
