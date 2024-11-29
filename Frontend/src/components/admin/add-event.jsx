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
        location: '',
        image_url: ''
    });
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
            await axios.post('http://localhost:8080/api/events/create', newEvent);
            setShowCreateForm(false);
            fetchEvents();
        } catch (error) {
            setError('Failed to create event. Please try again.');
        }
    };

    const renderEventCard = (event) => (
        <div key={event.id} className="event-card">
            <img src={`${process.env.PUBLIC_URL}/images/${event.id}.jpg`} alt={event.title} className="event-image" />
            <div className="event-details">
                <h3>{event.title}</h3>
                <p>Organizer: {event.organizer}</p>
                <p>Date: {event.date}</p>
                <p>Time: {event.time}</p>
                <p>Fee: RS {event.fee}</p>
                <p>Location: {event.location}</p>
                {isEventUpcoming(event.date) ? (
                    <button onClick={() => navigate('/registrations', { state: { eventId: event.id } })}>
                        View Registrations
                    </button>
                ) : (
                    <button onClick={() => navigate('/results', { state: { eventId: event.id } })}>
                        View Results
                    </button>
                )}
            </div>
        </div>
    );

    return (
        <div className="admin-events-container">
            <h2>Admin Events Page</h2>
            <button className="create-event-btn" onClick={() => setShowCreateForm(true)}>Create Event</button>
            {error && <p className="error-message">{error}</p>}
            <div className="events-list">
                {events.map(renderEventCard)}
            </div>
            {showCreateForm && (
                <div className="create-event-popup">
                    <form onSubmit={handleCreateEvent}>
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
                            type="text"
                            placeholder="Image URL"
                            value={newEvent.image_url}
                            onChange={(e) => setNewEvent({...newEvent, image_url: e.target.value})}
                            required
                        />
                        <button type="submit">Create Event</button>
                        <button type="button" onClick={() => setShowCreateForm(false)}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AdminEventsPage;