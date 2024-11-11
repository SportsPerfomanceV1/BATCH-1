// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './events.css';
//
//
// const EventPage = () => {
//     const [events, setEvents] = useState([]);
//     const [userRegistrations, setUserRegistrations] = useState([]); // State for user registrations
//     const [error, setError] = useState('');
//     const [viewCompleted, setViewCompleted] = useState(false); // State to toggle between views
//     const [athleteId, setAthleteId] = useState(null); // State for athlete ID
//     const navigate = useNavigate();
//
//     useEffect(() => {
//         // Check if the user is logged in
//         const loggedIn = sessionStorage.getItem('loggedIn') === 'true';
//
//         if (!loggedIn) {
//             // Redirect to login page if the user is not logged in
//             navigate('/login');
//         } else {
//             // Fetch athlete ID based on the logged-in username
//             const fetchAthleteId = async () => {
//                 const username = sessionStorage.getItem('username'); // Get username from sessionStorage
//                 if (username) {
//                     try {
//                         const response = await axios.get(`http://localhost:8080/api/athletes/${username}`);
//                         setAthleteId(response.data.id); // Set athlete ID from response
//                     } catch (error) {
//                         console.error('Error fetching athlete ID:', error);
//                         setError('Failed to fetch athlete ID. Please try again later.');
//                     }
//                 } else {
//                     setError('Username not found in session. Please log in again.');
//                 }
//             };
//
//             fetchAthleteId();
//
//             // Fetch events data if the user is logged in
//             const fetchEvents = async () => {
//                 try {
//                     const response = await axios.get('http://localhost:8080/api/events');
//                     setEvents(response.data);
//                     console.log('Fetched events:', response.data); // Log the fetched events
//                 } catch (error) {
//                     console.error('Error fetching events:', error);
//                     setError('Failed to fetch events. Please try again later.');
//                 }
//             };
//
//             // Fetch user's registrations
//             const fetchUserRegistrations = async () => {
//                 if (athleteId) {
//                     try {
//                         const response = await axios.get(`http://localhost:8080/api/registrations?athleteId=${athleteId}`);
//                         setUserRegistrations(response.data); // Set user registrations from response
//                     } catch (error) {
//                         console.error('Error fetching user registrations:', error);
//                         setError('Failed to fetch registrations. Please try again later.');
//                     }
//                 }
//             };
//
//             fetchEvents();
//             fetchUserRegistrations();
//         }
//     }, [navigate, athleteId]); // Add athleteId to the dependency array
//
//     // Function to determine if an event is upcoming
//     const isEventUpcoming = (eventDate) => {
//         const currentDate = new Date();
//         const [day, month, year] = eventDate.split('/').map(Number); // Assuming date format is DD/MM/YYYY
//         const eventDateObj = new Date(year, month - 1, day); // Month is 0-indexed
//         return eventDateObj >= currentDate; // Compare dates
//     };
//
//     // Filter events based on the view mode
//     const filteredEvents = events.filter(event =>
//         viewCompleted ? !isEventUpcoming(event.date) : isEventUpcoming(event.date)
//     );
//
//     // Function to check if the user is already registered for the event
//     const isRegistered = (eventId) => {
//         return userRegistrations.some(registration => registration.eventId === eventId);
//     };
//
//     // Function to fetch user registrations
//     const updateUserRegistrations = async () => {
//         if (athleteId) {
//             try {
//                 const response = await axios.get(`http://localhost:8080/api/registrations?athleteId=${athleteId}`);
//                 setUserRegistrations(response.data);
//             } catch (error) {
//                 console.error('Error fetching user registrations:', error);
//             }
//         }
//     };
//
//     // Function to handle registration
//     const handleRegister = async (eventId) => {
//         const confirmed = window.confirm("Are you sure you want to register for this event?");
//         if (confirmed) {
//             try {
//                 // Ensure athleteId is available
//                 if (!athleteId) {
//                     alert('Athlete ID is not available. Please log in again.');
//                     return;
//                 }
//
//                 const response = await axios.post('http://localhost:8080/api/registrations', { eventId, athleteId });
//                 alert(response.data); // Show success message
//                 // Fetch user registrations again to update the state
//                 updateUserRegistrations();
//             } catch (error) {
//                 alert('Registration failed. Please try again.');
//             }
//         }
//     };
//
//     return (
//         <div className="event-container">
//             <h2>{viewCompleted ? 'Completed Events' : 'Upcoming Events'}</h2>
//             <button onClick={() => setViewCompleted(!viewCompleted)}>
//                 {viewCompleted ? 'Show Upcoming Events' : 'Show Completed Events'}
//             </button>
//             {error && <p className="error-message">{error}</p>}
//             <div className="event-grid">
//                 {filteredEvents.length > 0 ? (
//                     filteredEvents.map(event => (
//                         <div key={event.id} className="event-box">
//                             <img src={event.image_url} alt={event.title} className="event-image" />
//                             <div className="event-details">
//                                 <h2>Game Type: {event.title}</h2>
//                                 <h3>Organizer: {event.organizer}</h3>
//                                 <p>Date: {event.date}</p>
//                                 <p>Time: {event.time}</p>
//                                 <p>Fee: RS {event.fee}</p>
//                                 <p>Location: {event.location}</p>
//                                 {/* Conditionally render the Register button only if the user is not already registered */}
//                                 {!viewCompleted && !isRegistered(event.eventId) && (
//                                     <button className="register-button" onClick={() => handleRegister(event.eventId)}>Register</button>
//                                 )}
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No events available at the moment.</p>
//                 )}
//             </div>
//         </div>
//     );
// };
//
// export default EventPage;
//
//
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './events.css';
// import EventForm from './EventForm';
//
// const EventPage = () => {
//     const [events, setEvents] = useState([]);
//     const [userRegistrations, setUserRegistrations] = useState([]); // State for user registrations
//     const [error, setError] = useState('');
//     const [viewCompleted, setViewCompleted] = useState(false); // State to toggle between views
//     const [athleteId, setAthleteId] = useState(null); // State for athlete ID
//     const navigate = useNavigate();
//
//     useEffect(() => {
//         // Check if the user is logged in
//         const loggedIn = sessionStorage.getItem('loggedIn') === 'true';
//
//         if (!loggedIn) {
//             // Redirect to login page if the user is not logged in
//             navigate('/login');
//         } else {
//             // Fetch athlete ID based on the logged-in username
//             const fetchAthleteId = async () => {
//                 const username = sessionStorage.getItem('username'); // Get username from sessionStorage
//                 if (username) {
//                     try {
//                         const response = await axios.get(`http://localhost:8080/api/athletes/${username}`);
//                         setAthleteId(response.data.id); // Set athlete ID from response
//                     } catch (error) {
//                         console.error('Error fetching athlete ID:', error);
//                         setError('Failed to fetch athlete ID. Please try again later.');
//                     }
//                 } else {
//                     setError('Username not found in session. Please log in again.');
//                 }
//             };
//
//             fetchAthleteId();
//
//             // Fetch events data if the user is logged in
//             const fetchEvents = async () => {
//                 try {
//                     const response = await axios.get('http://localhost:8080/api/events');
//                     setEvents(response.data);
//                     console.log('Fetched events:', response.data); // Log the fetched events
//                 } catch (error) {
//                     console.error('Error fetching events:', error);
//                     setError('Failed to fetch events. Please try again later.');
//                 }
//             };
//
//             // Fetch user's registrations
//             const fetchUserRegistrations = async () => {
//                 if (athleteId) {
//                     try {
//                         const response = await axios.get(`http://localhost:8080/api/registrations?athleteId=${athleteId}`);
//                         setUserRegistrations(response.data); // Set user registrations from response
//                     } catch (error) {
//                         console.error('Error fetching user registrations:', error);
//                         setError('Failed to fetch registrations. Please try again later.');
//                     }
//                 }
//             };
//
//             fetchEvents();
//             fetchUserRegistrations();
//         }
//     }, [navigate, athleteId]); // Add athleteId to the dependency array
//
//     // Function to determine if an event is upcoming
//     const isEventUpcoming = (eventDate) => {
//         const currentDate = new Date();
//         const [day, month, year] = eventDate.split('/').map(Number); // Assuming date format is DD/MM/YYYY
//         const eventDateObj = new Date(year, month - 1, day); // Month is 0-indexed
//         return eventDateObj >= currentDate; // Compare dates
//     };
//
//     // Filter events based on the view mode
//     const filteredEvents = events.filter(event =>
//         viewCompleted ? !isEventUpcoming(event.date) : isEventUpcoming(event.date)
//     );
//
//     // Function to check if the user is already registered for the event
//     const isRegistered = (eventId) => {
//         return userRegistrations.some(registration => registration.eventId === eventId);
//     };
//
//     // Function to fetch user registrations
//     const updateUserRegistrations = async () => {
//         if (athleteId) {
//             try {
//                 const response = await axios.get(`http://localhost:8080/api/registrations?athleteId=${athleteId}`);
//                 setUserRegistrations(response.data);
//             } catch (error) {
//                 console.error('Error fetching user registrations:', error);
//             }
//         }
//     };
//
//     // Function to handle registration
//     const handleRegister = async (eventId) => {
//         const confirmed = window.confirm("Are you sure you want to register for this event?");
//         if (confirmed) {
//             try {
//                 // Ensure athleteId is available
//                 if (!athleteId) {
//                     alert('Athlete ID is not available. Please log in again.');
//                     return;
//                 }
//
//                 const response = await axios.post('http://localhost:8080/api/registrations', { eventId, athleteId });
//                 alert(response.data); // Show success message
//                 // Fetch user registrations again to update the state
//                 updateUserRegistrations();
//             } catch (error) {
//                 alert('Registration failed. Please try again.');
//             }
//         }
//     };
//
//     // Refresh events after creating a new event
//     const refreshEvents = async () => {
//         try {
//             const response = await axios.get('http://localhost:8080/api/events');
//             setEvents(response.data);
//         } catch (error) {
//             setError('Failed to refresh events. Please try again later.');
//         }
//     };
//
//     return (
//         <div className="event-container">
//             <h2>{viewCompleted ? 'Completed Events' : 'Upcoming Events'}</h2>
//             <button onClick={() => setViewCompleted(!viewCompleted)}>
//                 {viewCompleted ? 'Show Upcoming Events' : 'Show Completed Events'}
//             </button>
//             {error && <p className="error-message">{error}</p>}
//             <div className="event-grid">
//                 {filteredEvents.length > 0 ? (
//                     filteredEvents.map(event => (
//                         <div key={event.id} className="event-box">
//                             <img src={event.image_url} alt={event.title} className="event-image" />
//                             <div className="event-details">
//                                 <h2>Game Type: {event.title}</h2>
//                                 <h3>Organizer: {event.organizer}</h3>
//                                 <p>Date: {event.date}</p>
//                                 <p>Time: {event.time}</p>
//                                 <p>Fee: RS {event.fee}</p>
//                                 <p>Location: {event.location}</p>
//                                 {!viewCompleted && !isRegistered(event.eventId) && (
//                                     <button className="register-button" onClick={() => handleRegister(event.eventId)}>Register</button>
//                                 )}
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No events available at the moment.</p>
//                 )}
//             </div>
//             <EventForm refreshEvents={refreshEvents} /> {/* Add EventForm component */}
//         </div>
//     );
// };
//
// export default EventPage;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './events.css';
import EventForm from './EventForm';

const EventPage = () => {
    const [events, setEvents] = useState([]);
    const [userRegistrations, setUserRegistrations] = useState([]); // State for user registrations
    const [error, setError] = useState('');
    const [viewCompleted, setViewCompleted] = useState(false); // State to toggle between views
    const [athleteId, setAthleteId] = useState(null); // State for athlete ID
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is logged in
        const loggedIn = sessionStorage.getItem('loggedIn') === 'true';

        if (!loggedIn) {
            // Redirect to login page if the user is not logged in
            navigate('/login');
        } else {
            // Fetch athlete ID based on the logged-in username
            const fetchAthleteId = async () => {
                const username = sessionStorage.getItem('username'); // Get username from sessionStorage
                if (username) {
                    try {
                        const response = await axios.get(`http://localhost:8080/api/athletes/${username}`);
                        setAthleteId(response.data.id); // Set athlete ID from response
                    } catch (error) {
                        console.error('Error fetching athlete ID:', error);
                        setError('Failed to fetch athlete ID. Please try again later.');
                    }
                } else {
                    setError('Username not found in session. Please log in again.');
                }
            };

            fetchAthleteId();

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

            // Fetch user's registrations
            const fetchUserRegistrations = async () => {
                if (athleteId) {
                    try {
                        const response = await axios.get(`http://localhost:8080/api/registrations?athleteId=${athleteId}`);
                        setUserRegistrations(response.data); // Set user registrations from response
                    } catch (error) {
                        console.error('Error fetching user registrations:', error);
                        setError('Failed to fetch registrations. Please try again later.');
                    }
                }
            };

            fetchEvents();
            fetchUserRegistrations();
        }
    }, [navigate, athleteId]); // Add athleteId to the dependency array

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

    // Function to check if the user is already registered for the event
    const isRegistered = (eventId) => {
        return userRegistrations.some(registration => registration.eventId === eventId);
    };

    // Function to fetch user registrations
    const updateUserRegistrations = async () => {
        if (athleteId) {
            try {
                const response = await axios.get(`http://localhost:8080/api/registrations?athleteId=${athleteId}`);
                setUserRegistrations(response.data);
            } catch (error) {
                console.error('Error fetching user registrations:', error);
            }
        }
    };

    // Function to handle registration
    const handleRegister = async (eventId) => {
        const confirmed = window.confirm("Are you sure you want to register for this event?");
        if (confirmed) {
            try {
                // Ensure athleteId is available
                if (!athleteId) {
                    alert('Athlete ID is not available. Please log in again.');
                    return;
                }

                const response = await axios.post('http://localhost:8080/api/registrations', { eventId, athleteId });
                alert(response.data); // Show success message
                // Fetch user registrations again to update the state
                updateUserRegistrations();
            } catch (error) {
                alert('Registration failed. Please try again.');
            }
        }
    };

    // Refresh events after creating a new event
    const refreshEvents = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/events');
            setEvents(response.data);
        } catch (error) {
            setError('Failed to refresh events. Please try again later.');
        }
    };

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
                            <img src={event.image_url} alt={event.title} className="event-image" />
                            <div className="event-details">
                                <h2>Game Type: {event.title}</h2>
                                <h3>Organizer: {event.organizer}</h3>
                                <p>Date: {event.date}</p>
                                <p>Time: {event.time}</p>
                                <p>Fee: RS {event.fee}</p>
                                <p>Location: {event.location}</p>
                                {!viewCompleted && !isRegistered(event.eventId) && (
                                    <button className="register-button" onClick={() => handleRegister(event.eventId)}>Register</button>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No events available at the moment.</p>
                )}
            </div>
            <EventForm refreshEvents={refreshEvents} /> {/* Add EventForm component */}
        </div>
    );
};

export default EventPage;
