import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admin-result.css';

const AdminResultsPage = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [registrations, setRegistrations] = useState([]);
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');
    const [publishResults, setPublishResults] = useState(false);

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
            setResults(response.data.map(reg => ({
                athleteId: reg.athleteId,
                eventId: eventId,
                result: '',
                published: false
            })));
        } catch (error) {
            setError('Failed to fetch registrations. Please try again later.');
        }
    };

    const handleResultChange = (athleteId, value) => {
        setResults(prevResults => prevResults.map(result => 
            result.athleteId === athleteId ? { ...result, result: value } : result
        ));
    };

    const handleSaveResults = async () => {
        try {
            const resultsToSave = results.map(result => ({
                ...result,
                published: publishResults
            }));
            await axios.post('http://localhost:8080/api/results/save', resultsToSave);
            setError('Results saved successfully.');
            setSelectedEvent(null);
            setRegistrations([]);
            setResults([]);
        } catch (error) {
            console.log(error);
            setError('Failed to save results. Please try again.');
            
        }
    };

    const renderEventCard = (event) => (
        <div key={event.id} className="admin-result-card">
            <img src={`${process.env.PUBLIC_URL}/event_pics/${event.id}.webp`} alt={event.title} className="admin-result-img" />
            <div className="admin-result-details">
                <h3>{event.title}</h3>
                <p><strong>Organizer:</strong> {event.organizer}</p>
                <p><strong>Date:</strong> {event.date}</p>
                <p><strong>Time:</strong> {event.time}</p>
                <p><strong>Fee:</strong> RS {event.fee}</p>
                <p><strong>Location</strong>: {event.location}</p>
                <button onClick={() => handleEntryPublish(event.id)} className="entry-publish-btn">
                    Entry & Publish
                </button>
            </div>
        </div>
    );

    return (
        <div className="admin-results-container">
            <h2>Admin Results Page</h2>
            {error && <p className="error-message">{error}</p>}
            <div className="admin-results-list">
                {events.map(renderEventCard)}
            </div>
            {selectedEvent && (
                <div className="admin-result-popup">
                    <h3>{selectedEvent.title} - Enter Results</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Athlete ID</th>
                                <th>Result</th>
                            </tr>
                        </thead>
                        <tbody>
                            {registrations.map(reg => (
                                <tr key={reg.athleteId}>
                                    <td>{reg.athleteId}</td>
                                    <td>
                                        <input 
                                            type="text" 
                                            value={results.find(r => r.athleteId === reg.athleteId)?.result || ''}
                                            onChange={(e) => handleResultChange(reg.athleteId, e.target.value)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="button-group">
                        <label>
                            <input 
                                type="checkbox" 
                                checked={publishResults}
                                onChange={(e) => setPublishResults(e.target.checked)}
                            />
                            Publish Results
                        </label>
                        <button onClick={handleSaveResults}>Save Results</button>
                        <button onClick={() => setSelectedEvent(null)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminResultsPage;
