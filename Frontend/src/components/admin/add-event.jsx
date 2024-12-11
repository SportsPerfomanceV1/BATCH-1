/* /components/admin/add-event.jsx */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './add-event.css';

const AdminEventsPage = () => {
    const [events, setEvents] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newEvent, setNewEvent] = useState({
        title: '',
        organizer: '',
        date: '',
        time: '',
        fee: '',
        location: ''
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

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

    const isEventUpcoming = (eventDate) => {
        const currentDate = new Date().toISOString().split("T")[0];
        return eventDate >= currentDate;
    };

    const handleCreateEvent = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('eventDetails', JSON.stringify(newEvent));

            await axios.post('http://localhost:8080/api/events/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setShowCreateForm(false);
            fetchEvents();
        } catch (error) {
            setError('Failed to create event. Please try again.');
        }
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const renderEventCard = (event) => (
        <div key={event.id} className="add-event-card">
            <img src={`${process.env.PUBLIC_URL}/event_pics/${event.id}.webp`} alt={event.title} className="add-event-img" />
            <div className="add-event-details">
                <h3>{event.title}</h3>
                <p><strong>Organizer:</strong> {event.organizer}</p>
                <p><strong>Date:</strong> {event.date}</p>
                <p><strong>Time:</strong> {event.time}</p>
                <p><strong>Fee:</strong> RS {event.fee}</p>
                <p><strong>Location</strong>: {event.location}</p>
                {isEventUpcoming(event.date) ? (
                    <button onClick={() => navigate('/registrations', { state: { eventId: event.id } })}>
                        View Registrations
                    </button>
                ) : (
                    <button onClick={() => navigate('/admin-results', { state: { eventId: event.id } })}>
                        View Results
                    </button>
                )}
            </div>
        </div>
    );

    return (
        <div className="add-events-container">
            <h2>Admin Events Page</h2>
            <button className="create-event-btn" onClick={() => setShowCreateForm(true)}>Create Event</button>
            {error && <p className="error-message">{error}</p>}
            <div className="add-events-list">
                {events.map(renderEventCard)}
            </div>
            {showCreateForm && (
                <div className="create-event-popup">
                    <form onSubmit={handleCreateEvent}>
                        <h2>Event creation form</h2>
                        <input
                            type="text"
                            placeholder="Title"
                            value={newEvent.title}
                            onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Organizer"
                            value={newEvent.organizer}
                            onChange={(e) => setNewEvent({...newEvent, organizer: e.target.value})}
                            required
                        />
                        <input
                            type="date"
                            value={newEvent.date}
                            onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                            required
                        />
                        <input
                            type="time"
                            value={newEvent.time}
                            onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Fee"
                            value={newEvent.fee}
                            onChange={(e) => setNewEvent({...newEvent, fee: e.target.value})}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Location"
                            value={newEvent.location}
                            onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                            required
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            required
                        />
                        <div className="event-popup-btn-group">
                            <button type="submit">Create Event</button>
                            <button type="button" onClick={() => setShowCreateForm(false)}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AdminEventsPage;