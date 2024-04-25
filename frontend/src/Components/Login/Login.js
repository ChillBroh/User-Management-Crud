import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import Nav from "../Nav/Nav";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  const history = useNavigate();
  const [user, setUser] = useState({
    email: "", // Changed from gmail to email
    password: "",
    role: "user",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendRequest();
      if (response.status === "ok") {
        alert("Login success");
        redirectUser(response.role, response.redirect);
      } else {
        alert("Login error");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const sendRequest = async () => {
    return await axios
      .post("http://localhost:5000/login", {
        email: user.email, // Changed from gmail to email
        password: user.password,
        role: user.role,
      })
      .then((res) => res.data);
  };

  const redirectUser = (role, redirect) => {
    switch (role) {
      case "user":
        history("/userdashboard");
        break;
      case "employee":
        history("/employeedashboard");
        break;
      case "manager":
        history("/managerdashboard");
        break;
      case "admin":
        history(redirect); // Redirect to "/userdetails" for admin
        break;
      default:
        history("/userdashboard");
    }
  };

  return (
    <div style={{ marginTop: "50px" }}>
      {/* <Nav /> */}
      <div className="register-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            value={user.email}
            onChange={handleInputChange}
            name="email"
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

          <label htmlFor="role">Role:</label>
          <select name="role" value={user.role} onChange={handleInputChange}>
            <option value="user">User</option>
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
          <br />
          <br />

          <input type="submit" value="Login" />
        </form>

        {/* Link to register page */}
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
