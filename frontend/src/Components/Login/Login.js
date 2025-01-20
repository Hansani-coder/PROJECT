
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


function Login() {
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
    const handleSubmit = async (e) => {
      e.preventDefault();
      try{
        const response = await sendRequest();
        if (response.Status === "ok") {
alert("Login success..!");
history("/userdetails");
        }else{
            alert("Login error");
        }
      }catch (err){
        alert("Please Enter Valis Gmail & Password..!");
      }
      
    };

    const sendRequest = async() =>{
        await axios
        .post("http://Localhost:3001/users",{
           gmail:user.gmail, 
           password:user.password, 
        })
        .then((res) => res.data);
    };
  return (
    <div>
       <h1>User Login</h1>
      <from onSubmit={handleSubmit}>
        <label>Gmail</label>
        <br></br>
        <input type="email" value={user.gmail} onChange={handleInputChange} name="gmail" required></input>
        <br></br>
        <br></br>
        <label>Password</label>
        <input type="password" value={user.password} onChange={handleInputChange} name="password" required></input>
        <br></br>
        <br></br>   
      <button>Login</button>
      </from>
    </div>
  );
}

export default Login;
