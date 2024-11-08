// import React, { useState } from 'react';
// import axios from 'axios';
// import './login.css';
// import { useNavigate } from 'react-router-dom';
//
// const LoginPage = ({ setLoggedIn }) => {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         username: '',
//         email: '',
//         password: '',
//         userType: 'athlete'
//     });
//     const [error, setError] = useState('');
//     const [message, setMessage] = useState('');
//
//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             setError('');
//             setMessage('');
//             const response = await axios.post('http://localhost:8080/api/login', formData);
//             setMessage(response.data.message);
//
//             // Set login state and save to sessionStorage
//             setLoggedIn(true);
//             sessionStorage.setItem("loggedIn", "true");
//             sessionStorage.setItem("username", formData.username); // Save username to sessionStorage
//             if (response.data.redirectUrl) {
//                 navigate(response.data.redirectUrl);
//             }
//         } catch (error) {
//             setError(error.response?.data.error || 'Login failed. Please try again.');
//         }
//     };
//
//     return (
//         <div className="login-container">
//             <h2>Login</h2>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     name="username"
//                     placeholder="Username"
//                     value={formData.username}
//                     onChange={handleChange}
//                     required
//                 />
//                 <input
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                 />
//                 <input
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                 />
//                 <select
//                     name="userType"
//                     value={formData.userType}
//                     onChange={handleChange}
//                 >
//                     <option value="athlete">Athlete</option>
//                     <option value="coach">Coach</option>
//                 </select>
//                 <button type="submit">Login</button>
//                 {message && <p className="success-message">{message}</p>}
//                 {error && <p className="error-message">{error}</p>}
//             </form>
//         </div>
//     );
// };
//
// export default LoginPage;


import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setLoggedIn }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        userType: 'athlete' // Default user type
    });
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('');
            setMessage('');
            const response = await axios.post('http://localhost:8080/api/login', formData);
            setMessage(response.data.message);

            // Set login state and save to sessionStorage
            setLoggedIn(true);
            sessionStorage.setItem("loggedIn", "true");
            sessionStorage.setItem("username", formData.username); // Save username to sessionStorage
            sessionStorage.setItem("userType", formData.userType); // Save userType to sessionStorage

            if (response.data.redirectUrl) {
                navigate(response.data.redirectUrl);
            }
        } catch (error) {
            setError(error.response?.data.error || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <select
                    name="userType"
                    value={formData.userType}
                    onChange={handleChange}
                >
                    <option value="athlete">Athlete</option>
                    <option value="coach">Coach</option>
                    <option value="admin">Admin</option> {/* Added Admin user type */}
                </select>
                <button type="submit">Login</button>
                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default LoginPage;
