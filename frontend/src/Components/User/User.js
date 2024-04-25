// User.js

import React from 'react';
import './User.css';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function User(props) {
    const { _id, name, email, password, image, role } = props.user;
    const history = useNavigate();

    const deleteHandler = async () => {
        await axios.delete(`http://localhost:5000/users/${_id}`)
            .then(res => res.data)
            .then(() => history("/"))
            .then(() => history("/userdetails"));
    }

    return (
        <div className="user-display">
            <h1>User Display</h1>
            <br></br>
            <h1>ID: {_id}</h1>
            <h1>Name: {name}</h1>
            <h1>Email: {email}</h1>
            <h1>Password: {password}</h1>
            <h1>Image: {image}</h1>
            <h1>Role: {role}</h1>
            <Link to={`/userdetails/${_id}`}>Update</Link>
            <button onClick={deleteHandler}>Delete</button>
        </div>
    );
}

export default User;
