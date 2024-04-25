// User.js

import React, { useEffect, useState } from "react";
import "./User.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function User() {
  const { id } = useParams();
  const [user, setUser] = useState();

  useEffect(() => {
    const user = async () => {
      const res = await axios.get(`http://localhost:5000/api/v1/user/${id}`);
      setUser(res.data.message);
    };
    user();
  }, []);
  const history = useNavigate();

  const deleteHandler = async () => {
    await axios
      .delete(`http://localhost:5000/users/${user._id}`)
      .then((res) => res.data)
      .then(() => history("/"))
      .then(() => history("/userdetails"));
  };

  return (
    <div className="user-display">
      <h1>User Display</h1>
      <br></br>
      <h1>ID: {user._id}</h1>
      <h1>Name: {user.name}</h1>
      <h1>Email: {user.email}</h1>
      <h1>Password: {user.password}</h1>
      <h1>Role: {user.role}</h1>
      <Link to={`/userdetails/${user._id}`}>Update</Link>
      <button onClick={deleteHandler}>Delete</button>
    </div>
  );
}

export default User;
