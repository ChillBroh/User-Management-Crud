import React, { useState, useEffect } from 'react';
import './Profile.css';
import axios from 'axios';

function Profile() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        image: ''
    });

    useEffect(() => {
        // Fetch user data from the backend
        axios.get('/api/users/current')
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    const [editableFields, setEditableFields] = useState({
        name: false,
        email: false,
        password: false,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`/api/users/${user._id}`, user);
            console.log('Profile updated:', response.data);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const toggleEditMode = (field) => {
        setEditableFields({ ...editableFields, [field]: !editableFields[field] });
    };

    return (
        <div className="profile-container">
            <h2>User Profile</h2>
            <form onSubmit={handleSubmit}>
                <div className="profile-image">
                    <img src={user.image} alt="User" />
                </div>
                <div className="profile-info">
                    <div>
                        <label htmlFor="name">Name:</label>
                        {editableFields.name ? (
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={user.name}
                                onChange={handleInputChange}
                                required
                            />
                        ) : (
                            <span>{user.name}</span>
                        )}
                        <button type="button" onClick={() => toggleEditMode('name')}>
                            {editableFields.name ? 'Save' : 'Edit'}
                        </button>
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        {editableFields.email ? (
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={user.email}
                                onChange={handleInputChange}
                                required
                            />
                        ) : (
                            <span>{user.email}</span>
                        )}
                        <button type="button" onClick={() => toggleEditMode('email')}>
                            {editableFields.email ? 'Save' : 'Edit'}
                        </button>
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        {editableFields.password ? (
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={user.password}
                                onChange={handleInputChange}
                                required
                            />
                        ) : (
                            <span>******</span>
                        )}
                        <button type="button" onClick={() => toggleEditMode('password')}>
                            {editableFields.password ? 'Save' : 'Edit'}
                        </button>
                    </div>
                </div>
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
}

export default Profile;
