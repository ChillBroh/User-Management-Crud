import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useParams } from "react-router";
import UpdateUsers from "./UpdateUsers.css";

function UpdateUser() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        console.log("User details response:", response.data);
        if (response.data.users) {
          const user = response.data.users[0];
          setInputs({
            name: user.name || "",
            email: user.email || "",
            password: user.password || "",
            role: user.role || "", // New field for user role
          });
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [id]);

  const sendRequest = async () => {
    try {
      await axios.put(`http://localhost:5000/users/${id}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
        role: inputs.role, // Pass the role to update
      });
      history("/userdetails");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    sendRequest();
  };

  return (
    <div className="form-card">
      <h1 className="header">Update User</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <br />
        <input
          type="text"
          name="name"
          value={inputs.name}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <label>Email:</label>
        <br />
        <input
          type="email"
          name="email"
          value={inputs.email}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <label>Password:</label>
        <br />
        <input
          type="password"
          name="password"
          value={inputs.password}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <label>Role:</label> {/* New field for the user role */}
        <br />
        <select
          name="role"
          value={inputs.role}
          onChange={handleChange}
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

export default UpdateUser;
