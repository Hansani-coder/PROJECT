import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {
    const history = useNavigate ();
    const [user,setUser] = useState({
        name:"",
        gmail:"",
        password:"",
    })
   const handleInputChange =(e) => {
       const {name,value} = e.target;
       setUser((prevUser) => ({...prevUser,[name]:value}));
   };
    const handleSubmit =(e) => {
      e.preventDefault();
      
      sendRequest().then(()=> {
        alert("Register Success..!");
        history("/userdetails");
      }).catch((err) => {
          alert(err.message);
      })
    };

    const sendRequest = async() =>{
        await axios.post("http://Localhost:3000/users",{
           name:String(user.name), 
           gmail:String(user.gmail), 
           password:String(user.password), 
        })
        .then((res) => res.data);
    }
  return (
    <div>
      <h1>User Register</h1>
      <from onSubmit={handleSubmit}>
        <label>Name</label>
        <input type='text' value={user.name} onChange={handleInputChange} name="name" required></input><br></br><br></br>
        <label>Gmail</label>
        <input type='email' value={user.gmail} onChange={handleInputChange} name="gmail" required></input><br></br><br></br>
        <label>Password</label>
        <input type='password' value={user.password} onChange={handleInputChange} name="password" required></input><br></br><br></br>   
      <button>Register</button>
      </from>
    </div>
  )
}

export default Register;
