import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import Nav from "../Nav/Nav";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Register() {
  const history = useNavigate();
  const [user, setUser] = useState({
    name: "",
    gmail: "",
    password: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    sendRequest()
      .then(() => {
        alert("Register Success");
        history("/userdetails");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const sendRequest = async () => {
    await axios
      .post("http://localhost:5000/register", {
        name: String(user.name),
        gmail: String(user.gmail),
        password: String(user.password),
      })
      .then((res) => res.data);
  };

  return (
    <div style={{ marginTop: "50px" }}>
      {/* <Nav/> */}
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            value={user.name}
            onChange={handleInputChange}
            name="name"
            required
          />
          <br />
          <br />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            value={user.gmail}
            onChange={handleInputChange}
            name="gmail"
            required
          />
          <br />
          <br />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            value={user.password}
            onChange={handleInputChange}
            name="password"
            required
          />
          <br />
          <br />

          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password"
            value={user.password}
            onChange={handleInputChange}
            name="confirm-password"
            required
          />
          <br />
          <br />

          <input type="submit" value="Register" />
        </form>

        {/* Link to login page */}
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
