import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './results.css';

const ResultPage = () => {
    const [results, setResults] = useState([]);
    const [events, setEvents] = useState({});
    const [allEvents, setAllEvents] = useState([]);
    const [error, setError] = useState('');
    const [athleteId, setAthleteId] = useState('');
    const [userType, setUserType] = useState('');
    const [selectedResult, setSelectedResult] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedIn = sessionStorage.getItem('loggedIn') === 'true';
        const storedUserType = sessionStorage.getItem('userType');
        if (!loggedIn) {
            navigate('/login');
        } else if (storedUserType){
            setUserType(storedUserType);
            if (storedUserType === 'athlete') {
                fetchAthleteIdAndResults();
            } else if (storedUserType === 'coach') {
                fetchEvents();
            }
        }
    }, [navigate]);

    const fetchAthleteIdAndResults = async () => {
        const username = sessionStorage.getItem('username');
        try {
            const athleteResponse = await axios.get(`http://localhost:8080/api/athletes/${username}`);
            setAthleteId(athleteResponse.data.id);
            const resultsResponse = await axios.get(`http://localhost:8080/api/results/athlete/${athleteResponse.data.id}`);
            setResults(resultsResponse.data);

            const eventPromises = resultsResponse.data.map(result => 
                axios.get(`http://localhost:8080/api/events/${result.eventId}`)
            );
            const eventResponses = await Promise.all(eventPromises);
            const eventData = {};
            eventResponses.forEach(response => {
                eventData[response.data.id] = response.data;
            });
            setEvents(eventData);
        } catch (error) {
            console.error('Error fetching athlete data or results:', error);
            setError('Failed to fetch athlete data or results. Please try again later.');
        }
    };

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/events');
            setAllEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
            setError('Failed to fetch events. Please try again later.');
        }
    };

    const handleViewResult = async (eventId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/results/${eventId}`);
            setSelectedResult({
                eventDetails: events[eventId] || events.find(e => e.id === eventId),
                results: response.data
            });
        } catch (error) {
            console.error('Error fetching result details:', error);
            setError('Failed to fetch result details. Please try again later.');
        }
    };

    const handleAllViewResult = async (eventId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/results/${eventId}`);
            setSelectedResult({
                eventDetails: allEvents.find(e => e.id === eventId || e.eventId === eventId),
                results: response.data
            });
        } catch (error) {
            console.error('Error fetching result details:', error);
            setError('Failed to fetch result details. Please try again later.');
        }
    };

    const ResultPopup = ({ result, onClose, athleteId, userType}) => {
        if (!result || !result.results) {
            return null;
        }
        const userResult = result.results.find(r => r.athleteId === athleteId);
        if (!userResult && userType === 'athlete') {
            return <div>No result found for this user.</div>;
        }
        const getPlacementMessage = (position) => {
            if (position <= 3) {
                return `Hooray, you were placed ${position}!`;
            }
            return `You were placed ${position}.`;
        };
        const sortedResults = result.results.sort((a, b) => parseInt(a.result) - parseInt(b.result));

        return (
            <div className="result-popup">
                <div className="result-popup-content">
                    <img src={`${process.env.PUBLIC_URL}/event_pics/${result.eventDetails?.id}.webp`} alt={result.eventDetails?.title} className="event-image" />
                    <h2>{result.eventDetails?.title}</h2>
                    <p><strong>Organizer:</strong> {result.eventDetails?.organizer}</p>
                    <p><strong>Date:</strong> {result.eventDetails?.date}</p>
                    <p><strong>Time:</strong> {result.eventDetails?.time}</p>
                    <p><strong>Location:</strong> {result.eventDetails?.location}</p>
                    {userType === 'athlete' && (
                    <>
                        <p><strong>Your Position:</strong> {userResult.result}</p>
                        <p>{getPlacementMessage(parseInt(userResult.result))}</p>
                    </>
                    )}
                    
                        <table>
                            <thead>
                                <tr>
                                    <th>Position</th>
                                    <th>Athlete ID</th>
                                    <th>Result</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedResults.map((r, index) => (
                                    <tr key={r.id}>
                                        <td>{index + 1}</td>
                                        <td>{r.athleteId}</td>
                                        <td>{r.result}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        );
    };

    const renderEventCard = (event) => (
        <div key={event.id} className="event-card">
            <img src={`${process.env.PUBLIC_URL}/event_pics/${event.id}.webp`} alt={event.title} className="event-image" />
            <div className="event-details">
                <h3>{event.title}</h3>
                <p>Organizer: {event.organizer}</p>
                <p>Date: {event.date}</p>
                <p>Time: {event.time}</p>
                <p>Fee: RS {event.fee}</p>
                <p>Location: {event.location}</p>
                <button onClick={() => handleAllViewResult(event.eventId || event.eventId)}>View Results</button>
            </div>
        </div>
    );

    return (
        <div className="results-container">
            <h2>{userType === 'coach' ? 'Event Results' : 'Your Results'}</h2>
            {error && <p className="error-message">{error}</p>}
            {userType === 'athlete' ? (
                <div className="results-grid">
                    {results.map(result => {
                        const event = events[result.eventId];
                        return (
                            <div key={result.id} className="result-card">
                                <img src={`${process.env.PUBLIC_URL}/event_pics/${event?.id}.webp`} alt={event?.title} className="event-image" />
                                <h3>{event?.title}</h3>
                                <p><strong>Organizer:</strong> {event?.organizer}</p>
                                <p><strong>Date:</strong> {event?.date}</p>
                                <p><strong>Location:</strong> {event?.location}</p>
                                {result.published ? (
                                    <button onClick={() => handleViewResult(result.eventId)}>View Result</button>
                                ) : (
                                    <p className="not-published">Not published</p>
                                )}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="results-grid">
                    {allEvents.map(event => renderEventCard(event, true))}
                </div>
            )}
            {
                selectedResult && <ResultPopup
                                        result={selectedResult}
                                        onClose={() => setSelectedResult(null)}
                                        athleteId={athleteId}
                                        userType={userType}
                                    />
            }
        </div>
    );
};

export default ResultPage;