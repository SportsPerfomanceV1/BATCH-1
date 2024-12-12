/* /components/registrations.jsx */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './registrations.css';

const RegistrationsPage = () => {
    const [registrations, setRegistrations] = useState([]);
    const [error, setError] = useState('');
    const location = useLocation();
    const eventId = location.state?.eventId;
    const eventName = location.state?.eventName;

    useEffect(() => {
        const fetchRegistrations = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/registrations/event/${eventId}`);
                setRegistrations(response.data);
            } catch (error) {
                console.error('Error fetching registrations:', error);
                setError('Failed to fetch registrations. Please try again later.');
                setRegistrations([]);
            }
        };

        if (eventId) fetchRegistrations();
    }, [eventId]);

    const updateStatus = async (registrationId, newStatus) => {
        try {
            await axios.patch(`http://localhost:8080/api/registrations/${registrationId}/status?status=${newStatus}`);
            setRegistrations(prevRegistrations =>
                prevRegistrations.map(registration =>
                    registration.registrationId === registrationId
                        ? { ...registration, status: newStatus }
                        : registration
                )
            );
        } catch (error) {
            console.error('Error updating registration status:', error);
            setError('Failed to update status. Please try again.');
        }
    };

    return (
        <div className="registrations-container">
            <h2>Registrations for Event {eventId}. {eventName}</h2>
            {error && <p className="error-message">{error}</p>}
            <table className="registrations-table">
                <thead>
                    <tr>
                        <th>Registration ID</th>
                        <th>Athlete ID</th>
                        <th>Athlete</th>
                        <th>Event</th>
                        <th>Registration Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {registrations.map(registration => (
                        <tr key={registration.registrationId}>
                            <td>{registration.registrationId}</td>
                            <td>{registration.athleteId}</td>
                            <td>{registration.athleteName}</td>
                            <td>{registration.eventId}. {registration.eventName}</td>
                            <td>{new Date(registration.registrationDate).toLocaleDateString()}</td>
                            <td className={`status-${registration.status.toLowerCase()}`}>
                                {registration.status}
                            </td>
                            <td>
                                {registration.status === 'Pending' && (
                                    <>
                                        <button
                                            className="accept-button"
                                            onClick={() => updateStatus(registration.registrationId, 'Accepted')}
                                        >
                                            Accept
                                        </button>
                                        <button
                                            className="reject-button"
                                            onClick={() => updateStatus(registration.registrationId, 'Rejected')}
                                        >
                                            Reject
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RegistrationsPage;