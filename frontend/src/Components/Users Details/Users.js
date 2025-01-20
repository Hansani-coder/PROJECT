import React, { useState, useEffect, useRef } from 'react';
import Nav from '../Nav/Nav';
import axios from "axios"; 
import User from '../User/User';
import { useReactToPrint } from "react-to-print"; 
const URL = "http://localhost:3000/users"; 
const fetchHandler = async () => {
   return await axios.get(URL).then((res) => res.data);
}

function Users() {
  const [users, setUsers] = useState([]); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchHandler().then((data) => setUsers(data.users));
  }, []);

  const componentsRef = useRef(); 
  const handlePrint = useReactToPrint({
     content: () => componentsRef.current,
     documentTitle: "Users Report", 
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

  const handleSendReport = () => {
    //Create the WhatsApp Chat URL
    const PhoneNumber = "+94740510256";
    const message = `select User Reports`
    const WhatsAppUrl = `http://web.whatsapp.com/send?phone=${PhoneNumber}&text=${encodeURI (
     message  
    )}`;

    //Open the WhatsApp chat in anew window
    window.open(WhatsAppUrl,"_blank");
  }

  return (
    <div>
      <Nav />
      <h1>Users Details Display Page</h1>
      <input
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        name="search"
        placeholder="Search Users Details" 
      />
      <button onClick={handleSearch}>Search</button>

      {noResults ? (
        <div>
          <p>No Users Found</p>
        </div>
      ) : (
        <div ref={componentsRef}>
          {users && users.map((user, i) => (
            <div key={i}>
              <User user={user} />
            </div>
          ))}
        </div>
      )}
      <button onClick={handlePrint}>Download Report</button>
      <br></br>
      <button onClick={handleSendReport}>Send WhatsApp Message</button>
    </div>
  );
}

export default Users;
