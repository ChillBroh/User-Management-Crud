import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function Login() {
  const history = useNavigate();
  const [user, setUser] = useState({
    email: "",
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
      const res = await sendRequest();
      if (res.data.status === "success") {
        Swal.fire({
          icon: "success",
          title: "Login Success",
          text: "You have been successfully logged in.",
        });
        const role = localStorage.getItem("role");
        redirectUser(role);
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid email or password.",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response.data.message,
      });
    }
  };

  const sendRequest = async () => {
    const res = await axios.post("http://localhost:5000/api/v1/auth/login", {
      email: user.email,
      password: user.password,
      role: user.role,
    });

    if (res.data.status === "success") {
      console.log(res.data);
      const token = res.data.data.token;
      const role = res.data.data.role;
      localStorage.setItem("jsonwebtoken", token);
      localStorage.setItem("role", role);
    }
    return res;
  };

  const redirectUser = (role) => {
    switch (role) {
      case "Customer":
        history("/userdashboard");
        break;
      case "Employee":
        history("/employeedashboard");
        break;
      case "Manager":
        history("/managerdashboard");
        break;
      case "Admin":
        history("/");
        break;
      default:
        history("/userdashboard");
    }
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <div className="register-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            value={user.email}
            onChange={handleInputChange}
            name="email"
          />
          <br />
          <br />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            value={user.password}
            onChange={handleInputChange}
            name="password"
          />
          <br />
          <br />

          <label htmlFor="role">Role:</label>
          <select name="role" value={user.role} onChange={handleInputChange}>
            <option value="Customer">Customer</option>
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
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
