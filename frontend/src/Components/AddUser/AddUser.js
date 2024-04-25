import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import AddUsers from "./AddUsers.css";

function AddUser() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    role: "", // Added role field
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendRequest();
    history("/userdetails");
  };

  const sendRequest = async () => {
    try {
      await axios.post("http://localhost:5000/users", {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
        role: inputs.role, // Include role in the request
      });
      history("/userdetails"); // Redirect to the user details page
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="form-card">
      <h1 className="header">Add User</h1>
      <form onSubmit={handleSubmit}>
        <label>name</label>
        <br />
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={inputs.name}
          required
        />
        <br />
        <br />
        <label>email</label>
        <br />
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={inputs.email}
          required
        />
        <br />
        <br />
        <label>password</label>
        <br />
        <input
          type="text"
          name="password"
          onChange={handleChange}
          value={inputs.password}
          required
        />
        <br />
        <br />
        <label>Role</label> {/* New field for selecting role */}
        <br />
        <select
          name="role"
          onChange={handleChange}
          value={inputs.role}
          required
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="employee">Employee</option>
          <option value="customer">Customer</option>
        </select>
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddUser;
