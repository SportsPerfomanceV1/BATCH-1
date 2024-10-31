import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './events.css';

const EventPage = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState('');
    const [viewCompleted, setViewCompleted] = useState(false); // State to toggle between views
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is logged in
        const loggedIn = sessionStorage.getItem('loggedIn') === 'true';

        if (!loggedIn) {
            // Redirect to login page if the user is not logged in
            navigate('/login');
        } else {
            // Fetch events data if the user is logged in
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
        }
    }, [navigate]);

    // Function to determine if an event is upcoming
    const isEventUpcoming = (eventDate) => {
        const currentDate = new Date();
        const [day, month, year] = eventDate.split('/').map(Number); // Assuming date format is DD/MM/YYYY
        const eventDateObj = new Date(year, month - 1, day); // Month is 0-indexed
        return eventDateObj >= currentDate; // Compare dates
    };

    // Filter events based on the view mode
    const filteredEvents = events.filter(event =>
        viewCompleted ? !isEventUpcoming(event.date) : isEventUpcoming(event.date)
    );

    return (
        <div className="event-container">
            <h2>{viewCompleted ? 'Completed Events' : 'Upcoming Events'}</h2>
            <button onClick={() => setViewCompleted(!viewCompleted)}>
                {viewCompleted ? 'Show Upcoming Events' : 'Show Completed Events'}
            </button>
            {error && <p className="error-message">{error}</p>}
            <div className="event-grid">
                {filteredEvents.length > 0 ? (
                    filteredEvents.map(event => (
                        <div key={event.id} className="event-box">
                            <img src={event.image_url} alt={event.title} className="event-image"/>
                            <div className="event-details">
                                <h2>Game Type: {event.title}</h2>
                                <h3>Organizer: {event.organizer}</h3>
                                <p>Date: {event.date}</p>
                                <p>Time: {event.time}</p>
                                <p>Fee: RS {event.fee}</p>
                                <p>Location: {event.location}</p>
                                {/* Conditionally render the Register button */}
                                {!viewCompleted && (
                                    <button className="register-button">Register</button>
                                )}
                            </div>

                        </div>
                    ))
                ) : (
                    <p>No events available at the moment.</p>
                )}
            </div>
        </div>
    );
};

export default EventPage;
