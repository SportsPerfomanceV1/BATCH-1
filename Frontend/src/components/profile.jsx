import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './profile.css';

const ProfilePage = () => {
    const [profileData, setProfileData] = useState({ firstname: '', lastname: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProfileData = async () => {
            const username = sessionStorage.getItem("username");
            const userType = sessionStorage.getItem("userType");

            if (!username || !userType) {
                setError("User not logged in or userType missing.");
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8080/api/profile/${username}`, {
                    params: { userType }
                });
                setProfileData(response.data);
            } catch (error) {
                setError("Failed to load profile details.");
            }
        };

        fetchProfileData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData({
            ...profileData,
            [name]: value
        });
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        const username = sessionStorage.getItem("username");
        const userType = sessionStorage.getItem("userType");

        if (!username || !userType) {
            setError("User not logged in or userType missing.");
            return;
        }

        try {
            const response = await axios.put(`http://localhost:8080/api/profile/update/${username}`, profileData, {
                params: { userType }
            });

            if (response.status === 200) {
                setMessage("Profile updated successfully.");
            }
        } catch (error) {
            setError("Failed to update profile details.");
        }
    };

    return (
        <div className="profile-container">
            <h2>User Profile</h2>
            {error && <p className="error-message">{error}</p>}
            {message && <p className="success-message">{message}</p>}
            {!error && (
                <form onSubmit={handleUpdateProfile}>
                    <div className="form-group">
                        <label htmlFor="firstname">First Name:</label>
                        <input
                            type="text"
                            id="firstname"
                            name="firstname"
                            value={profileData.firstname}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastname">Last Name:</label>
                        <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            value={profileData.lastname}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={profileData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={profileData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn">Update Profile</button>
                </form>
            )}
        </div>
    );
};

export default ProfilePage;
