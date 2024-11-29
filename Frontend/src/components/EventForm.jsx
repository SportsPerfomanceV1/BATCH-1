import React, { useState } from 'react';
import axios from 'axios';
import './EventForm.css';

const EventForm = ({ refreshEvents }) => {
    const [title, setTitle] = useState('');
    const [organizer, setOrganizer] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [fee, setFee] = useState('');
    const [location, setLocation] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [message, setMessage] = useState('');

    const refreshEvents = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/events');
            setEvents(response.data); // Update events state
        } catch (error) {
            console.error('Error fetching events:', error);
            setError('Failed to fetch events. Please try again later.');
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const eventData = { title, organizer, date, time, fee, location, image_url: imageUrl };
        try {
            await axios.post('http://localhost:8080/api/events', eventData);
            setMessage('Event created successfully!');
            // Clear form fields
            setTitle('');
            setOrganizer('');
            setDate('');
            setTime('');
            setFee('');
            setLocation('');
            setImageUrl('');
            // Refresh events list
            refreshEvents();
        } catch (error) {
            setMessage('Failed to create event. Please try again.');
        }
    };

    return (
        <div className="event-form-container">
            <h2>Create New Event</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </label>
                <label>
                    Organizer:
                    <input type="text" value={organizer} onChange={(e) => setOrganizer(e.target.value)} required />
                </label>
                <label>
                    Date:
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                </label>
                <label>
                    Time:
                    <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
                </label>
                <label>
                    Fee:
                    <input type="number" value={fee} onChange={(e) => setFee(e.target.value)} required />
                </label>
                <label>
                    Location:
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
                </label>
                <label>
                    Image URL:
                    <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                </label>
                <button type="submit">Create Event</button>
            </form>
        </div>
    );
};

export default EventForm;


// import React, { useState } from 'react';
// import axios from 'axios';
// import './createEvent.css';
//
// const EventForm = ({ refreshEvents }) => {
//     const [eventDetails, setEventDetails] = useState({
//         eventId: '',
//         image_url: '',
//         date: '',
//         time: '',
//         fee: '',
//         organizer: '',
//         location: '',
//         title: ''
//     });
//     const [error, setError] = useState('');
//
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setEventDetails({ ...eventDetails, [name]: value });
//     };
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:8080/api/events', eventDetails);
//             alert('Event created successfully');
//             refreshEvents(); // Refresh the events list
//         } catch (error) {
//             console.error('Error creating event:', error);
//             setError('Failed to create event. Please try again later.');
//         }
//     };
//
//     return (
//         <div className="create-event-container">
//             <h2>Create New Event</h2>
//             {error && <p className="error-message">{error}</p>}
//             <form onSubmit={handleSubmit} className="create-event-form">
//                 <label>
//                     Event ID:
//                     <input type="text" name="eventId" value={eventDetails.eventId} onChange={handleChange} required />
//                 </label>
//                 <label>
//                     Image URL:
//                     <input type="text" name="image_url" value={eventDetails.image_url} onChange={handleChange} required />
//                 </label>
//                 <label>
//                     Date:
//                     <input type="text" name="date" value={eventDetails.date} onChange={handleChange} required placeholder="DD/MM/YYYY" />
//                 </label>
//                 <label>
//                     Time:
//                     <input type="text" name="time" value={eventDetails.time} onChange={handleChange} required />
//                 </label>
//                 <label>
//                     Fee:
//                     <input type="number" name="fee" value={eventDetails.fee} onChange={handleChange} required />
//                 </label>
//                 <label>
//                     Organizer:
//                     <input type="text" name="organizer" value={eventDetails.organizer} onChange={handleChange} required />
//                 </label>
//                 <label>
//                     Location:
//                     <input type="text" name="location" value={eventDetails.location} onChange={handleChange} required />
//                 </label>
//                 <label>
//                     Title:
//                     <input type="text" name="title" value={eventDetails.title} onChange={handleChange} required />
//                 </label>
//                 <button type="submit">Create Event</button>
//             </form>
//         </div>
//     );
// };
//
// export default EventForm;
