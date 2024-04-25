import React, { useEffect, useRef, useState } from "react";
import NavigationBar from "../AdminNavigation/NavigationBar";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import "./Users.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const URL = "http://localhost:5000/api/v1/user/";

const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return { users: [] }; // Return empty array if there's an error
  }
};

function Users() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchHandler().then((data) => setUsers(data.users));
  }, []);

  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    DocumentTitle: "Users Report",
    onAfterPrint: () => alert("Users Report Successfully Downloaded!"),
  });

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filteredUsers = data.users.filter((user) =>
        Object.values(user).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setUsers(filteredUsers);
      setNoResults(filteredUsers.length === 0);
    });
  };

  const deleteUser = async (id) => {
    // Ask for confirmation
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    // If confirmed, proceed with deletion
    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/v1/user/${id}`);
        setUsers(users.filter((user) => user._id !== id));
        Swal.fire("Deleted!", "The user has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting user:", error);
        Swal.fire("Error!", "Failed to delete user.", "error");
      }
    }
  };

  return (
    <div className="container">
      <h1>User Details Display Page</h1>
      <div className="search-container">
        <div>
          {" "}
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            name="search"
            placeholder="Search User Details"
          />
        </div>
        <div>
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
      <div className="user-btn">
        <div>
          <Link to="/adduser">
            <button>Add User</button>
          </Link>
        </div>
        <div>
          <button onClick={handlePrint}>Download Report</button>
        </div>
      </div>

      {noResults ? (
        <div className="no-results">No Users Found</div>
      ) : (
        <div ref={ComponentsRef} className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={i}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>{user.role}</td>
                  <td>
                    <div className="table-btn">
                      <div>
                        <Link to={`/userdetails/${user._id}`}>Update</Link>
                      </div>
                      <div>
                        <button onClick={() => deleteUser(user._id)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Users;
