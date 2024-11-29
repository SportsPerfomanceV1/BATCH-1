import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './admin-dashboard.css';

const Dashboard = () => {
    const [events, setEvents] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [adminId, setAdminId] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const images = [
        '/images/cricket.jpg', 
        '/images/football.jpg', 
        '/images/basketball.jpg', 
        '/images/marathon.jpg', 
        '/images/baseball.jpg'
    ];
    const firstName =sessionStorage.getItem('firstName');

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval);
    }, [images.length]);
    
    useEffect(() => {
        const loggedIn = sessionStorage.getItem('loggedIn') === 'true';
        const userType = sessionStorage.getItem('userType');

        if (!loggedIn) {
            navigate('/login');
        } else if (userType === 'admin'){
            const fetchAdminId = async () => {
                const username = sessionStorage.getItem('username');
                if (username) {
                    try {
                        const response = await axios.get(`http://localhost:8080/api/admin/${username}`);
                        setAdminId(response.data.id);
                    } catch (error) {
                        console.log('Error fetching admin ID:', error);
                        setError('Failed to fetch admin ID. Please try again later.');
                    }
                } else {
                    setError('Username not found in session. Please log in again.');
                }
            };

            const fetchEvents = async () => {
                try {
                    const response = await axios.get('http://localhost:8080/api/events');
                    const allEvents = response.data;
                    const upcomingEvents = allEvents
                        .filter((event) => isEventUpcoming(event.date))
                        .sort((a, b) => new Date(a.date) - new Date(b.date))
                        .slice(0, 4);
                    setEvents(upcomingEvents);
                } catch (error) {
                    console.log('Error fetching events:', error);
                    setError('Failed to fetch events. Please try again later.');
                }
            };
            const isEventUpcoming = (eventDate) => {
                const currentDate = new Date().toISOString().split("T")[0];
                return eventDate >= currentDate;
            };

            fetchAdminId();
            fetchEvents();
        }
    }, [navigate]);

    const renderEventCard = (event) => (
        <div className="event-card" key={event.id}>
            <img src={`${process.env.PUBLIC_URL}/images/${event.id}.jpg`} alt={event.title} className="event-picture" />
            <h3>{event.title}</h3>
            <ul>
                <li><strong>Organizer :</strong> {event.organizer}</li>
                <li><strong>Date :</strong> {event.date}</li>
                <li><strong>Location :</strong> {event.location}</li>
                <li><strong>Fees :</strong> {event.fee}</li>
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
                            {events.length > 0 ? (
                                events.map((event) => renderEventCard(event))
                            ) : (
                                <p className="no-events">
                                    No upcoming events available at the moment. Check back soon for exciting new events!
                                </p>
                            )}
                        </div>
                        <Link to="/events" className="view-all-btn">View all events</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;