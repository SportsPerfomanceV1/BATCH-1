import React, { useState } from 'react';
import './Home.css';

const Home = () => {
    const [modalContent, setModalContent] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const backgroundStyle = {
        fontFamily: 'sans-serif',
        backgroundImage: "url('/images/background.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        color: 'black',
    };

    const events = [
        {
            title: "Ranji Trophy",
            date: "10/11/2024",
            venue: "Uppal Stadium, HYD",
            category: "Cricket",
            imgSrc: "./images/cricket.jpg",
        },
        {
            title: "Summer Tennis Tournament",
            date: "12/11/2024",
            venue: "Gachibowli Indoor Stadium, HYD",
            category: "Tennis",
            imgSrc: "./images/tennis.jpg",
        },
        {
            title: "All India Chess Tournament",
            date: "12/12/2024",
            venue: "Uppal Indoor Stadium, HYD",
            category: "Chess",
            imgSrc: "./images/chess.jpg",
        },
    ];

    const openModal = (event) => {
        setModalContent(event);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <div style={backgroundStyle}>
            <div className="navbar">
                <div className="navbar-brand"><b>Athletic Analytics</b></div>
                <div>
                    <a href="/news"><b>News</b></a>
                    <a href="/events"><b>Events</b></a>
                    <a href="/results"><b>Results</b></a>
                    <a href="/coaches"><b>Coaches</b></a>
                    <a href="/athletes"><b>Athletes</b></a>
                    <a href="/login"><b>Login/Signup</b></a>
                </div>
            </div>

            <div className="header">
                <h1>Sports Performance Monitoring System</h1>
            </div>

            <div className="events">
                {events.map((event, index) => (
                    <div key={index} className="card" onClick={() => openModal(event)}>
                        <img src={event.imgSrc} alt={event.title} />
                        <h3><b>{event.title}</b></h3>
                        <p><b>Date:</b> {event.date}</p>
                        <p><b>Venue:</b> {event.venue}</p>
                        <p><b>Category:</b> {event.category}</p>
                    </div>
                ))}
            </div>

            {modalVisible && (
                <div className="full-screen" onClick={closeModal}>
                    <div className="full-screen-content">
                        <img src={modalContent.imgSrc} alt={modalContent.title} />
                        <h3><b>{modalContent.title}</b></h3>
                        <p>{modalContent.date}</p>
                        <p>{modalContent.venue}</p>
                        <p>{modalContent.category}</p>
                        <button id="close-modal" onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
