import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


function AddUser() {
    const history = useNavigate();
    const [inputs,setInputs] = useState({
      name:"",
      gmail:"",
      age:"",
      address:"",

    });
    const handleChange =(e)=>{
      setInputs ((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit =async(e)=>{
    e.preventDefault ();
      console.log(inputs);
      await sendRequest();
      window.alert("User added Successfully");
      history('userdetails');
};

const sendRequest = async()=>{
  await axios.post("http://Localhost:3000/users",{
    name:String(inputs.name),
    gmail:String(inputs.gmail),
    age:String(inputs.age),
    address:String(inputs.address),
  }).then(res => res.data);
}

  return (
    <div>
      <h1>Add User</h1>
      <form onSubmit={handleSubmit}>
        <label>name</label>
        <br/>
        <input type="text" name="name" onChange={handleChange} value={inputs.name} require></input>
        <br></br>
        <br></br>
        <label>gmail</label>
        <br/>
        <input type="text" name="gmail" onChange={handleChange} value={inputs.gmail} require></input>
        <br></br>
        <br></br>
        <label>age</label>
        <br/>
        <input type="text" name="age" onChange={handleChange} value={inputs.age} require></input>
        <br></br>
        <br></br>
        <label>address</label>
        <br/>
        <input type="text" name="address" onChange={handleChange} value={inputs.address} require></input>
        <br></br>
        <br></br>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default AddUser;
