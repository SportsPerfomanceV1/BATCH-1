import React, { useState } from 'react';
import axios from 'axios';
import './AddEventPage.css'; // Include custom styling if needed

const AddEventPage = () => {
    const [formData, setFormData] = useState({
        event_id: '',
        date: '',
        fee: '',
        image_url: '',
        location: '',
        time: '',
        title: '',
        organizer: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate all fields
        if (Object.values(formData).some((value) => value.trim() === '')) {
            setMessage('All fields are required.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/admin/events', formData); // Update the endpoint as per your backend
            if (response.status === 201) {
                setMessage('Event added successfully!');
                setFormData({
                    event_id: '',
                    date: '',
                    fee: '',
                    image_url: '',
                    location: '',
                    time: '',
                    title: '',
                    organizer: ''
                });
            } else {
                setMessage('Failed to add the event. Please try again.');
            }
        } catch (error) {
            console.error(error);
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="add-event-container">
            <h1>Add Event</h1>
            <form onSubmit={handleSubmit} className="add-event-form">
                <div className="form-group">
                    <label>Event ID:</label>
                    <input
                        type="text"
                        name="event_id"
                        value={formData.event_id}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Date:</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Fee:</label>
                    <input
                        type="number"
                        name="fee"
                        value={formData.fee}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Image URL:</label>
                    <input
                        type="text"
                        name="image_url"
                        value={formData.image_url}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Location:</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Time:</label>
                    <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Organizer:</label>
                    <input
                        type="text"
                        name="organizer"
                        value={formData.organizer}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Add Event</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default AddEventPage;
