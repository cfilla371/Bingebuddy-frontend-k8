import React, { useState } from "react";
import SidebarComponent from "./SidebarComponent";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_API_URL;


const SearchUserComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
   const [userId, setUserId] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("Token"));

  const displayUsers = (user) => {
    return <a href={`/user-reviews/${user.id}`} key={user.id}>{user.username} </a>; 
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = () => {
    if (searchTerm === "") {
      alert("Enter a search term");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/search/${searchTerm}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userList = response.data.map(user => ({
          id: user.id,
          username: user.username
        }));

        setUsers(userList); 

      } catch (error) {
        setUsers([]); 
      }
    };

    fetchData();
  };

  return (
    <div className="flex">
      <div>
        <SidebarComponent />
      </div>
      <b>
        <input type="text" value={searchTerm} onChange={handleSearch} />
        <button onClick={handleSubmit}>Search</button>
      </b>
      <ul>
        {users.map((user) => displayUsers(user))}
      </ul>
    </div>
  );
};

export default SearchUserComponent;