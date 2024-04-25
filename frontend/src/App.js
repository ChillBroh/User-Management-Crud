import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import AddUser from "./Components/AddUser/AddUser";
import Users from "./Components/UserDetails/Users";
import UpdateUser from "./Components/UpdateUser/UpdateUser";
import NavigationBar from "./Components/AdminNavigation/NavigationBar";
import Nav from "./Components/Nav/Nav";

function App() {
  return (
    <div>
      <Nav />
      <NavigationBar />
      <React.Fragment>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<Users />} />
          <Route path="/mainhome" element={<Home />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/userdetails" element={<Users />} />
          <Route path="/userdetails/:id" element={<UpdateUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
