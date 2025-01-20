import React from "react";
import { Route, Routes } from "react-router-dom";
import './App.css';

import Home from "./Components/Home/Home";
import AddUser from "./Components/AddUser/AddUser";
import User from "./Components/User/User";
import UpdateUser from "./Components/UpdateUser/UpdateUser";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import ContactUs from "./Components/ContactUs/ContactUs";
import SendPDF from "./Components/SendPDF/SendPDF";
import ImgUploader from "./Components/ImgUploader/ImgUploader";  // Ensure correct import path

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/mainhome" element={<Home />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/userdetails" element={<User />} />
          <Route path="/regi" element={<Register />} />
          <Route path="/log" element={<Login />} />
          <Route path="/conus" element={<ContactUs />} />
          <Route path="/sendpdf" element={<SendPDF />} />
          <Route path="/imagepart" element={<ImgUploader />} />
          <Route path="/userdetails/:id" element={<UpdateUser />} />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
