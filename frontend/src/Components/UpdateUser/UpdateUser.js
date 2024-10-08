import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useParams } from "react-router";
import UpdateUsers from "./UpdateUsers.css"; // Assuming your CSS file name
import Nav from "../Nav/Nav";
import Swal from "sweetalert2";

function UpdateUser() {
  const [inputs, setInputs] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/user/${id}`
        );
        const user = response.data.message; // Assuming response structure
        setInputs(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [id]);

  const sendRequest = async () => {
    try {
      await axios.patch(`http://localhost:5000/api/v1/user/${id}`, {
        name: inputs.name,
        password: inputs.password,
        role: inputs.role, // Pass the role to update
      });
      // Successful update, show confirmation with Swal
      Swal.fire("Success!", "User has been updated.", "success");
      const role = localStorage.getItem("role");
      if (role === "Admin") {
        navigate("/userdetails");
      }
      if (role === "Customer") {
        navigate("/userdashboard");
      }
      if (role === "Employee") {
        navigate("/employeedashboard");
      }
      if (role === "Manager") {
        navigate("/managerdashboard");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      Swal.fire("Error!", "User update failed.", "error");
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
    <div>
      <Nav />
      <div className="form-card">
        <h1 className="header">Update User</h1>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <br />
          <input
            type="text"
            name="name"
            defaultValue={inputs?.name}
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
            value={inputs?.email}
            onChange={handleChange}
            readOnly
          />
          <br />
          <br />
          <label>Password:</label>
          <br />
          <input
            type="password"
            name="password"
            value={inputs?.password}
            onChange={handleChange}
            required
          />
          <br />
          <br />
          <label>Role:</label> {/* New field for the user role */}
          <br />
          <select
            name="role"
            value={inputs?.role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Employee">Employee</option>
            <option value="Customer">Customer</option>
          </select>
          <br />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
