import React, {useEffect,useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function UpdateUser() {

    const [inputs, setInputs ] = useState({});
    const history = useNavigate();
    const id = useParams().id;

    useEffect(()=>{
        const fetchHandler = async ()=>{
          await axios
          .get(`http://Localhost:3000/users/${id}`) 
          .then((res)=> res.data) 
          .then((data)=>setInputs(data.user));
        };
        fetchHandler();
    },[id]);

       const sendRequest = async ()=>{
          await axios
          .put(`http://Localhost:3000/users/${id}`,{
          name:String(inputs.name),
          gmail:String(inputs.gmail),
          age:String(inputs.age),
          address:String(inputs.address),
        })
        .then((res)=> res.data) ;   
    };
   
    const handleChange =(e)=>{
        setInputs ((prevState) => ({
              ...prevState,
              [e.target.name]: e.target.value,
      }));
    };
  
    const handleSubmit = async(e)=>{
      e.preventDefault ();
        console.log(inputs);

      sendRequest().then(()=> {
        window.alert("User details updated successfully..!");
        history("/userdetails");
      });
  };
  
  return (
    <div>
    <h1>Add User</h1>  
    <form onSubmit={handleSubmit}>
        <label>name</label>
        <br/>
        <input 
        type="text" 
        name="name" 
        onChange={handleChange} 
        value={inputs.name} 
        require
        ></input>
        <br></br>
        <br></br>
        <label>gmail</label>
        <br/>
        <input 
        type="text" 
        name="gmail" 
        onChange={handleChange} 
        value={inputs.gmail} 
        require
        ></input>
        <br></br>
        <br></br>
        <label>age</label>
        <br/>
        <input 
        type="text" 
        name="age" 
        onChange={handleChange} 
        value={inputs.age} 
        require
        ></input>
        <br></br>
        <br></br>
        <label>address</label>
        <br/>
        <input type="text" 
        name="address" 
        onChange={handleChange} 
        value={inputs.address} 
        require
        ></input>
        <br></br>
        <br></br>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default UpdateUser;
