import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './profile.css';
import showPasswordIcon from '../image/show.png';
import hidePasswordIcon from '../image/hide.png';

const ProfilePage = () => {
    const [profileData, setProfileData] = useState({ firstname: '', lastname: '', email: '', password: '' });
    const [formData, setFormData] = useState({ ...profileData, newPassword: '', confirmPassword: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [registrations, setRegistrations] = useState([]);
    const [eventDetails, setEventDetails] = useState({});
    const [athleteId, setAthleteId] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [showEditForm, setShowEditForm] = useState(false);
    const updatedData = ({});
    const navigate = useNavigate();

    useEffect(() => {
        const loggedIn = sessionStorage.getItem('loggedIn') === 'true';

        if (!loggedIn) {
            navigate('/login');
        } else {
            const fetchProfileData = async () => {
                const username = sessionStorage.getItem("username");
                const userType = sessionStorage.getItem("userType");
            
                if (!username || !userType) {
                    setError("User not logged in or userType missing.");
                    return;
                }
            
                try {
                    const profileResponse = await axios.get(`http://localhost:8080/api/profile/${username}`, {
                        params: { userType }
                    });
                    setProfileData(profileResponse.data);
            
                    if (userType === 'athlete') {
                        const athleteResponse = await axios.get(`http://localhost:8080/api/athletes/${username}`);
                        setAthleteId(athleteResponse.data.id);
            
                        const registrationsResponse = await axios.get(`http://localhost:8080/api/registrations?athleteId=${athleteResponse.data.id}`);
                        setRegistrations(registrationsResponse.data);
            
                        // Fetch event details for each registration
                        const eventDetailsPromises = registrationsResponse.data.map(reg => 
                            axios.get(`http://localhost:8080/api/events/${reg.eventId}`)
                        );
                        const eventDetailsResponses = await Promise.all(eventDetailsPromises);
                        const eventDetailsMap = {};
                        eventDetailsResponses.forEach((response, index) => {
                            eventDetailsMap[registrationsResponse.data[index].eventId] = response.data;
                        });
                        setEventDetails(eventDetailsMap);
                    }
                } catch (error) {
                    console.error('Error fetching profile data:', error);
                    setError("Failed to load profile details or registrations.");
                }
            };
            fetchProfileData();
        }
    }, [navigate]);

    const handleUpdateProfile = async (e) => {
        const username = sessionStorage.getItem("username");
        const userType = sessionStorage.getItem("userType");

        if (!username || !userType) {
            setError("User not logged in or userType missing.");
            return;
        }
        try {
            const response = await axios.patch(`http://localhost:8080/api/profile/update/${username}`, updatedData, {
                params: { userType }
            });
            if (response.status === 200) {
                setMessage("Profile updated successfully.");
                setProfileData(prevData => ({...prevData, ...updatedData}));
                setShowEditForm(false);
            }
        } catch (error) {
            setError("Failed to update profile details.");
        }
    };

    const EditProfileForm = ({ profileData, onSubmit, onCancel }) => {
        const [formData, setFormData] = useState({ ...profileData, newPassword: '', confirmPassword: '' });
        const [showPassword, setShowPassword] = useState(false);
    
        const handleChange = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        };
    
        const togglePasswordVisibility = () => {
            setShowPassword(!showPassword);
        };
    
        const handleSubmit = (e) => {
            e.preventDefault();
            if (formData.newPassword !== formData.confirmPassword) {
                alert("Passwords don't match");
                return;
            }
            const updatedData = {
                firstname: formData.firstname,
                lastname: formData.lastname,
                email: formData.email
            };
            if (formData.newPassword) {
                updatedData.password = formData.newPassword;
            }
            onSubmit(updatedData);
        };
    
        return (
            <div className="edit-profile-form">
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <input
                            type="text"
                            name="firstname"
                            value={formData.firstname}
                            onChange={handleChange}
                            placeholder="First Name"
                            required
                        />
                        <input
                            type="text"
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleChange}
                            placeholder="Last Name"
                            required
                        />
                    </div>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                    />
                    <div className="password-fields">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="newPassword"
                            placeholder="New Password"
                            value={formData.newPassword}
                            onChange={handleChange}
                        />
                        <img
                            src={showPassword ? hidePasswordIcon : showPasswordIcon}
                            alt="Toggle Password Visibility"
                            className="password-toggle-icon"
                            onClick={togglePasswordVisibility}
                        />
                    </div>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    <div className="form-actions">
                        <button type="submit">Update Details</button>
                        <button type="button" onClick={onCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        );
    };

    return (
        <div className="profile-container">
            <div className='user-profile'>
                <h2>User Profile</h2>
                {error && <p className="error-message">{error}</p>}
                {message && <p className="success-message">{message}</p>}
                {!error && (
                    <div className="profile-details">
                        <p><strong>First Name : </strong>{profileData.firstname}</p>
                        <p><strong>Last Name : </strong>{profileData.lastname}</p>
                        <p><strong>Email : </strong>{profileData.email}</p>
                        <button 
                            className="edit-profile-btn"
                            onClick={ () => setShowEditForm(true) }
                        >Edit Profile</button>
                    </div>
                )}
                {showEditForm && (
                    <EditProfileForm
                        profileData={profileData}
                        onSubmit={handleUpdateProfile}
                        onCancel={() => setShowEditForm(false)}
                    />
                )}
            </div>
            <div className='user-registrations'>
                {registrations.length > 0 && (
                    <div className="user-registrations">
                        <h2>Your Registrations</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Organizer</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Location</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {registrations.map((reg) => {
                                    const event = eventDetails[reg.eventId] || {};
                                    return (
                                        <tr key={reg.id}>
                                            <td>{event.title || 'N/A'}</td>
                                            <td>{event.organizer || 'N/A'}</td>
                                            <td>{event.date || 'N/A'}</td>
                                            <td>{event.time || 'N/A'}</td>
                                            <td>{event.location || 'N/A'}</td>
                                            <span className={`status-box ${reg.status.toLowerCase()}`}>
                                                {reg.status || 'N/A'}
                                            </span>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;