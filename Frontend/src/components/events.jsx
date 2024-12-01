import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './events.css';

const EventPage = () => {
    const [events, setEvents] = useState([]);
    const [userRegistrations, setUserRegistrations] = useState([]);
    const [error, setError] = useState('');
    const [viewCompleted, setViewCompleted] = useState(true);
    const [athleteId, setAthleteId] = useState(null);
    const [userType, setUserType] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const loggedIn = sessionStorage.getItem('loggedIn') === 'true';

        if (!loggedIn) {
            navigate('/login');
        } else {
            const fetchedUserType = sessionStorage.getItem('userType');
            setUserType(fetchedUserType || '');

            const fetchAthleteId = async () => {
                const username = sessionStorage.getItem('username');
                const userType = sessionStorage.getItem('userType');
                if (username && userType==='athlete') {
                    try {
                        const response = await axios.get(`http://localhost:8080/api/athletes/${username}`);
                        setAthleteId(response.data.id); // Set athlete ID from response
                    } catch (error) {
                        console.error('Error fetching athlete ID:', error);
                        setError('Failed to fetch athlete ID. Please try again later.');
                    }
                } else if (!username && userType==='athlete'){
                    setError('Username not found in session. Please log in again.');
                }
            };

            fetchAthleteId();

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

            const fetchUserRegistrations = async () => {
                if (athleteId) {
                    try {
                        const response = await axios.get(`http://localhost:8080/api/registrations?athleteId=${athleteId}`);
                        console.log('Fetched user registrations:', response.data); // Debugging
                        setUserRegistrations(Array.isArray(response.data) ? response.data : []); // Ensure it's an array
                    } catch (error) {
                        console.error('Error fetching user registrations:', error);
                        setError('Failed to fetch registrations. Please try again later.');
                    }
                }
            };

            fetchEvents();
            refreshEvents();
            fetchUserRegistrations();
        }
    }, [navigate, athleteId]);

    const isEventUpcoming = (eventDate) => {
        const currentDate = new Date().toISOString().split("T")[0];
        return eventDate >= currentDate;
    };

    const isRegistered = (eventId) => {
        return userRegistrations.some(registration => registration.eventId === eventId);
    };

    // Function to fetch user registrations
    const updateUserRegistrations = async () => {
        if (athleteId) {
            try {
                const response = await axios.get(`http://localhost:8080/api/registrations?athleteId=${athleteId}`);
                setUserRegistrations(Array.isArray(response.data) ? response.data : []); // Ensure it's an array
            } catch (error) {
                console.error('Error fetching user registrations:', error);
            }
        }
    };

    const handleRegister = async (eventId) => {
        if (isRegistered(eventId)) { 
            window.alert("Already registered for the event");
            return;
        }
        
        const confirmed = window.confirm("Are you sure you want to register for this event?");
        if (confirmed) {
            try {
                if (!athleteId) {
                    alert('Athlete ID is not available. Please log in again.');
                    return;
                }
                const response = await axios.post('http://localhost:8080/api/registrations', { eventId, athleteId });
                alert(response.data);
                updateUserRegistrations();
            } catch (error) {
                alert('Registration failed. Please try again.');
            }
        }
    };

    const completedEvents = events.filter(event => !isEventUpcoming(event.date));
    const upcomingEvents = events.filter(event => isEventUpcoming(event.date));

    const refreshEvents = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/events');
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
            setError('Failed to fetch events. Please try again later.');
        }
    };

    return (
        <div className="events-container">
            <div className="completed-events">
                <h2>Completed Events</h2>
                {error && <p className="error-message">{error}</p>}
                <div className="event-grid">
                    {completedEvents.map(event => (
                        <div key={event.id} className="event-card">
                    <img src={`${process.env.PUBLIC_URL}/event_pics/${event.id}.webp`} alt={event.title} />
                    <h3>{event.title}</h3>
                    <p>Organizer: {event.organizer}</p>
                    <p>Date: {event.date}</p>
                    <p>Time: {event.time}</p>
                    <p>Fee: RS {event.fee}</p>
                    <p>Location: {event.location}</p>
                    {userType === 'coach' ? (
                        <button onClick={() => navigate('/results')}>View Results</button>
                    ) : (
                        isRegistered(event.id) ? (
                        <button onClick={() => navigate('/results')}>View Result</button>
                        ) : (
                        <button>Not Participated</button>
                        )
                    )}
                    </div>
                ))}
                </div>
            </div>
            <div className="upcoming-events">
                <h2>Upcoming Events</h2>
                <div className="event-grid">
                {upcomingEvents.map(event => (
                    <div key={event.id} className="event-card">
                    <img src={`${process.env.PUBLIC_URL}/event_pics/${event.id}.webp`} alt={event.title} className="event-image" />
                    <h3>{event.title}</h3>
                    <p>Organizer: {event.organizer}</p>
                    <p>Date: {event.date}</p>
                    <p>Time: {event.time}</p>
                    <p>Fee: RS {event.fee}</p>
                    <p>Location: {event.location}</p>
                    {userType === 'coach' ? (
                        <button onClick={() => navigate('/registrations', { state: { eventId: event.id } })}>
                           View Registrations
                        </button>
                    ) : (
                        isRegistered(event.id) ? (
                        <button>Already Registered</button>
                        ) : (
                        <button onClick={() => handleRegister(event.id)}>Register</button>
                        )
                    )}
                    </div>
                ))}
                </div>
            </div>
        </div>
      );
};

export default EventPage;
