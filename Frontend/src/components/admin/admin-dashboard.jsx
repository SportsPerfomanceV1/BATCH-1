/* /components/admin/admin-dashboard.jsx */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './admin-dashboard.css';

const AdminDashboard = () => {
    const [events, setEvents] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const images = [
        '/images/slideshow/cricket.webp', 
        '/images/slideshow/football.webp', 
        '/images/slideshow/basketball.webp', 
        '/images/slideshow/marathon.webp', 
        '/images/slideshow/baseball.webp'
    ];
    const firstName =sessionStorage.getItem('firstName');

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
        } else if (userType === 'admin'){
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

//            fetchAdminId();
            fetchEvents();
        }
    }, [navigate]);

    const renderEventCard = (event) => (
        <div className="admin-event-card" key={event.id}>
            <img src={`${process.env.PUBLIC_URL}/event_pics/${event.id}.webp`} alt={event.title} className="admin-event-img"/>
            <h3>{event.title}</h3>
            <p><strong>Organizer:</strong> {event.organizer}</p>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Fees:</strong> {event.fee}</p>
            <button className="admin-view-event-btn" onClick={() => navigate('/events')}>View Event</button>
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
        <div className="admin-slideshow">
            {images.map((image, index) => (
                <img
                    key={index}
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className={`admin-slideshow-image ${index === currentSlide ? 'fade' : ''}`}
                    style={{ opacity: index === currentSlide ? 3 : 0 }}
                />
            ))}
            <div className="admin-slideshow-overlay">
                <h1>Good {getTimeofDay()}, {firstName}!</h1>
                <p className='welcome-msg'>Welcome to Athelytics,</p>
                <p>Your one-stop destination for sports and events</p>
            </div>
        </div>
    );

    return (
        <div className="admin-page">
            <div className="admin-hero-section">
                {renderSlideshow()}
            </div>

            <div className="admin-events-section">
                {error && <p className="admin-error-message">{error}</p>}
                <h2>Upcoming Events</h2>
                <div className="admin-event-grid">
                    {events.length > 0 ? (
                        events.map((event) => renderEventCard(event))
                    ) : (
                        <p className="admin-no-events">
                            No upcoming events available at the moment. Check back soon for exciting new events!
                        </p>
                    )}
                </div>
                <Link to="/events" className="admin-view-all-btn">View more events</Link>
            </div>
        </div>
    );
};

export default AdminDashboard;