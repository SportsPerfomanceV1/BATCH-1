import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './events.css';

const EventPage = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/events');
                setEvents(response.data);
                console.log('Fetched events:', response.data); // Log the fetched events
            } catch (error) {
                console.error('Error fetching events:', error);
                setError('Failed to fetch events. Please try again later.');
            }
        };

        fetchEvents();
    }, []);

    return (
        <div className="event-container">
            <h2>Upcoming Events</h2>
            {error && <p className="error-message">{error}</p>}
            {events.length > 0 ? (
                events.map(event => (
                    <div key={event.id} className="event-box">
                        {/* Use the image URL directly from the fetched data */}
                        <img
                            src={process.env.PUBLIC_URL + event.imageUrl}
                            alt={event.eventId}
                            className="event-image"
                        />
                        <div className="event-details">
                            <h3>Organizer: {event.organizer}</h3>
                            <p>Date: {event.date}</p>
                            <p>Time: {event.time}</p>
                            <p>Fee: RS {event.fee}</p>
                            <p>Location: {event.location}</p>
                            <button className="register-button">Register</button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No events available at the moment.</p>
            )}
        </div>
    );
};

export default EventPage;
