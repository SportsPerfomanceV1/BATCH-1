import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './home.css';

const HomePage = () => {
    const [events, setEvents] = useState([]);
    const [userRegistrations, setUserRegistrations] = useState([]);
    const [athleteId, setAthleteId] = useState(null);
    const [coachId, setCoachId] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const images = [
        '/images/slideshow/cricket.webp', 
        '/images/slideshow/football.webp', 
        '/images/slideshow/basketball.webp', 
        '/images/slideshow/marathon.webp', 
        '/images/slideshow/baseball.webp'
    ];
    const firstName =sessionStorage.getItem('firstName');

    // Slideshow
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [images.length]);
    
    useEffect(() => {
        const loggedIn = sessionStorage.getItem('loggedIn') === 'true';
        const userType = sessionStorage.getItem('userType');

        if (!loggedIn) {
            navigate('/login');
        } else if (userType === 'athlete'){
            const fetchAthleteId = async () => {
                const username = sessionStorage.getItem('username');
                if (username) {
                    try {
                        const response = await axios.get(`http://localhost:8080/api/athletes/${username}`);
                        setAthleteId(response.data.id);
                    } catch (error) {
                        console.log('Error fetching athlete ID:', error);
                        setError('Failed to fetch athlete ID. Please try again later.');
                    }
                } else {
                    setError('Username not found in session. Please log in again.');
                }
            };

            const fetchEvents = async () => {
                try {
                    const response = await axios.get('http://localhost:8080/api/events');
                    setEvents(response.data);
                } catch (error) {
                    console.log('Error fetching events:', error);
                    setError('Failed to fetch events. Please try again later.');
                }
            };

            fetchAthleteId();
            fetchEvents();
        }
        else if (userType === 'coach'){
            const fetchCoachId = async () => {
                const username = sessionStorage.getItem('username');
                if (username) {
                    try {
                        const response = await axios.get(`http://localhost:8080/api/coach/${username}`);
                        setCoachId(response.data.id);
                    } catch (error) {
                        console.log('Error fetching coach ID:', error);
                        setError('Failed to fetch coach ID. Please try again later.');
                    }
                } else {
                    setError('Username not found in session. Please log in again.');
                }
            };
            const fetchEvents = async () => {
                try {
                    const response = await axios.get('http://localhost:8080/api/events');
                    setEvents(response.data);
                } catch (error) {
                    console.log('Error fetching events:', error);
                    setError('Failed to fetch events. Please try again later.');
                }
            };
            fetchCoachId();
            fetchEvents();
        }
    }, [navigate]);

    useEffect(() => {
        const fetchUserRegistrations = async () => {
            if (athleteId) {
                try {
                    const response = await axios.get(`http://localhost:8080/api/registrations?athleteId=${athleteId}`);
                    setUserRegistrations(response.data);
                } catch (error) {
                    console.error('Error fetching user registrations:', error);
                    setError('Failed to fetch registrations. Please try again later.');
                }
            }
        };

        fetchUserRegistrations();
    }, [athleteId]);

    const isEventUpcoming = (eventDate) => {
        const currentDate = new Date().toISOString().split("T")[0];
        return eventDate >= currentDate;
    };

    const upcomingEvents = events
        .filter((event) => isEventUpcoming(event.date) && !userRegistrations.some((reg) => reg.eventId === event.id))
        .slice(0, 3);

    const registeredEvents = userRegistrations.map((registration) => {
        const event = events.find((e) => e.id === registration.eventId);
        return event ? { ...event, registrationStatus: registration.status } : null;
    }).filter(Boolean);

    const recentlyCompletedEvent = registeredEvents
        .filter((event) => !isEventUpcoming(event.date))
        .slice(0, 1);

    const upcomingRegisteredEvents = registeredEvents
        .filter((event) => isEventUpcoming(event.date))
        .slice(0, 2);

    const renderEventCard = (event, isRegistered = false) => (
        <div className="event-card" key={event.id}>
            <img src={`${process.env.PUBLIC_URL}/event_pics/${event.id}.webp`} alt={event.title} className="event-picture" />
            <h3>{event.title}</h3>
            <ul>
                <li><strong>Organizer :</strong> {event.organizer}</li>
                <li><strong>Date :</strong> {event.date}</li>
                <li><strong>Location :</strong> {event.location}</li>
                {isRegistered ? (
                    <li><strong>Status :</strong> <span className={`status-${event.registrationStatus.toLowerCase()}`}>{event.registrationStatus}</span></li>
                ) : (
                    <li><strong>Fees :</strong> {event.fee}</li>
                )}
            </ul>
            <button className="view-event-btn" onClick={() => navigate('/events')}>View Event</button>
        </div>
    );

    const getTimeofDay = () => {
        const hours = new Date().getHours();
        if (hours < 12){
            return 'Morning';
        } else if (hours < 18){
            return 'Afternoon';
        } else {
            return 'Evening';
        }
    };

    const renderSlideshow = () => (
        <div className="slideshow">
            {images.map((image, index) => (
                <img
                    key={index}
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className={`slideshow-image ${index === currentSlide ? 'fade' : ''}`}
                    style={{ opacity: index === currentSlide ? 3 : 0 }}
                />
            ))}
            <div className="slideshow-overlay">
                <h1>Good {getTimeofDay()}, {firstName}!</h1>
                <p className='welcome-msg'>Welcome to Athelytics,</p>
                <p>Your one-stop destination for sports and events</p>
            </div>
        </div>
    );

    return (
        <div className="home-page">
            <div className="hero-section">
                {renderSlideshow()}
            </div>
            
            <div className="content-section">
                <div className="section-container">
                    <div className="events-section">
                        <h2>Upcoming Events</h2>
                        <div className="event-grid">
                            {upcomingEvents.length > 0 ? (
                                upcomingEvents.map((event) => renderEventCard(event))
                            ) : (
                                <p className="no-events">
                                    No upcoming events available at the moment. Check back soon for exciting new events!
                                </p>
                            )}
                        </div>
                        <Link to="/events" className="view-all-btn">View all events</Link>
                    </div>
                    {sessionStorage.getItem('userType') === 'athlete' && (
                    <div className="events-section">
                        <h2>Your Registered Events</h2>
                        <div className="event-grid">
                            {recentlyCompletedEvent.concat(upcomingRegisteredEvents).length > 0 ? (
                                <>
                                    {recentlyCompletedEvent.map((event) => renderEventCard(event, true))}
                                    {upcomingRegisteredEvents.map((event) => renderEventCard(event, true))}
                                </>
                            ) : (
                                <p className="no-events">
                                    You haven't registered for any events yet. Explore our upcoming events and join the excitement!
                                </p>
                            )}
                        </div>
                        <Link to="/events" className="view-all-btn">View all events</Link>
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
