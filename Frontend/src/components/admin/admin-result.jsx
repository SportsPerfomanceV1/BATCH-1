import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admin-result.css';

const AdminResultsPage = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [registrations, setRegistrations] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/events');
            setEvents(response.data);
        } catch (error) {
            setError('Failed to fetch events. Please try again later.');
        }
    };

    const handleEntryPublish = async (eventId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/registrations/event/${eventId}`);
            setRegistrations(response.data);
            setSelectedEvent(events.find(event => event.id === eventId));
        } catch (error) {
            setError('Failed to fetch registrations. Please try again later.');
        }
    };

    const handleResultChange = (registrationId, result) => {
        setRegistrations(registrations.map(reg => 
            reg.id === registrationId ? { ...reg, result } : reg
        ));
    };

    const handleSaveResults = async () => {
        try {
            await axios.post(`http://localhost:8080/api/results/${selectedEvent.id}`, registrations);
            setError('Results saved successfully.');
        } catch (error) {
            setError('Failed to save results. Please try again.');
        }
    };

    const handlePublishResults = async () => {
        try {
            await axios.post(`http://localhost:8080/api/results/${selectedEvent.id}/publish`);
            setError('Results published successfully.');
            setSelectedEvent(null);
            setRegistrations([]);
        } catch (error) {
            setError('Failed to publish results. Please try again.');
        }
    };

    const handleClearForm = () => {
        setSelectedEvent(null);
        setRegistrations([]);
    };

    const renderEventCard = (event) => (
        <div key={event.id} className="event-card">
            <img src={`${process.env.PUBLIC_URL}/event_pics/${event.id}.webp`} alt={event.title} className="event-image" />
            <div className="event-details">
                <h3>{event.title}</h3>
                <p>Organizer: {event.organizer}</p>
                <p>Date: {event.date}</p>
                <p>Location: {event.location}</p>
            </div>
            <button onClick={() => handleEntryPublish(event.id)} className="entry-publish-btn">
                Entry/Publish
            </button>
        </div>
    );

    return (
        <div className="admin-results-container">
            <h2>Admin Results Page</h2>
            {error && <p className="error-message">{error}</p>}
            <div className="events-list">
                {events.map(renderEventCard)}
            </div>
            {selectedEvent && (
                <div className="results-popup">
                    <h3>{selectedEvent.title} Results</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Athlete ID</th>
                                <th>Result</th>
                                <th>Published</th>
                            </tr>
                        </thead>
                        <tbody>
                            {registrations.map(reg => (
                                <tr key={reg.id}>
                                    <td>{reg.athleteId}</td>
                                    <td>
                                        <input 
                                            type="text" 
                                            value={reg.result || ''} 
                                            onChange={(e) => handleResultChange(reg.id, e.target.value)}
                                        />
                                    </td>
                                    <td>{reg.published ? 'Yes' : 'No'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="button-group">
                        <button onClick={handleSaveResults}>Save Results</button>
                        <button onClick={handlePublishResults}>Publish Results</button>
                        <button onClick={handleClearForm}>Clear Form</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminResultsPage;