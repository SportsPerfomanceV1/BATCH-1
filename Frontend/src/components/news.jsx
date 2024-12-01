import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './news.css';

const NewsPage = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/events');
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
                setError('Failed to fetch events. Please try again later.');
            }
        };

        fetchEvents();
    }, []);

    const isEventUpcoming = (eventDate) => {
        const currentDate = new Date();
        const eventDateTime = new Date(eventDate);
        const timeDiff = eventDateTime.getTime() - currentDate.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return daysDiff > 0 ? daysDiff : null;
    };

    const renderNewsCard = (event, daysUntilEvent) => {
        const isCompleted = daysUntilEvent === null;
        const newsHeading = isCompleted
            ? `${event.title} is completed`
            : `${event.title} is upcoming in ${daysUntilEvent} days left`;

        return (
            <div key={event.id} className="news-card">
                <img src={`${process.env.PUBLIC_URL}/event_pics/${event.id}.webp`} alt={event.title} className="news-image" />
                <div className="news-details">
                    <h3>{newsHeading}</h3>
                    <p>Organizer: {event.organizer}</p>
                    <p>Date: {event.date}</p>
                    <p>Time: {event.time}</p>
                    <p>Location: {event.location}</p>
                    <button 
                        onClick={() => navigate(isCompleted ? '/results' : '/events')}
                        className={isCompleted ? "view-result-btn" : "view-event-btn"}
                    >
                        {isCompleted ? "View Result" : "View Event"}
                    </button>
                </div>
            </div>
        );
    };

    const upcomingNews = events
        .filter(event => isEventUpcoming(event.date) !== null)
        .map(event => renderNewsCard(event, isEventUpcoming(event.date)));

    const completedNews = events
        .filter(event => !isEventUpcoming(event.date))
        .map(event => renderNewsCard(event, null));

    return (
        <div className="news-container">
            <div className="upcoming-news">
                <h2>Upcoming Event News</h2>
                {upcomingNews}
            </div>
            <div className="completed-news">
                <h2>Completed Event News</h2>
                {completedNews}
            </div>
        </div>
    );
};

export default NewsPage;