import { useState, useEffect } from "react";
import React from "react";
import SidebarComponent from "./SidebarComponent";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const DashboardProfileComponent = () => {
  const [userData, setUserData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    genre: "",
    anotherGenre: "",
  });

  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(" useEffect triggered: Running loadData()");
    loadData();
  }, []); 

  const loadData = async () => {
    console.log("🔵 Running loadData() function...");

    try {
      
      const token = localStorage.getItem("Token");
      if (!token) {
        setErrors("Cannot get user profile - No Token Found");
        console.log("No Token Found - Cannot get user profile");
        return;
      }

      console.log("Token Found:", token);

      let decodedToken;
      try {
        decodedToken = jwtDecode(token);
        console.log("Decoded Token:", decodedToken);
      } catch (err) {
        console.log("Error Decoding Token:", err);
        setErrors("Invalid token");
        return;
      }

      const userId = decodedToken.userId || decodedToken.sub;
      console.log("Extracted User ID:", userId);

      if (!userId) {
        setErrors("User ID not found in token");
        console.log("User ID missing in token");
        return;
      }

      const apiUrl = `http://localhost:8080/user-profile/${userId}`;
      console.log("🌐 Fetching data from:", apiUrl);

      const response = await axios.get(apiUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("API Response Received:", response);

    
      if (!response.data) {
        setErrors("No user data found");
        console.log("No User Data Found in Response");
        return;
      }

      console.log("Setting User Data:", response.data);
      setUserData(response.data);
    } catch (error) {
      console.error("Error Fetching Profile:", error);
      setErrors("Failed to fetch user profile");
    }
  };

  return (
    <div className="flex">
      <SidebarComponent />
      <div className="container">
        <h1 className="center">User Profile</h1>
        <div className="row">
          <div className="card col-md-6 offset-md-3">
            <div className="card-body">
              <form>
                {errors ? (
                  <label className="form-label text-danger">Error: {errors} </label>
                ) : (
                  <>
                    <div className="form-group mb-2">
                      <label className="form-label">Username:</label>
                      <input
                        type="text"
                        placeholder="Email"
                        name="username"
                        value={userData.username}
                        className="form-control"
                        disabled
                      />
                    </div>
                    <div className="form-group mb-2">
                      <label className="form-label">First Name:</label>
                      <input
                        type="text"
                        placeholder="Enter First Name"
                        name="firstName"
                        value={userData.firstName}
                        className="form-control"
                        disabled
                      />
                    </div>
                    <div className="form-group mb-2">
                      <label className="form-label">Last Name:</label>
                      <input
                        type="text"
                        placeholder="Enter Last Name"
                        name="lastName"
                        value={userData.lastName}
                        className="form-control"
                        disabled
                      />
                    </div>
                    <div className="form-group mb-2">
                      <label className="form-label">Favorite Genre:</label>
                      <input
                        type="text"
                        placeholder="Enter Genre"
                        name="genre"
                        value={userData.genre}
                        className="form-control"
                        disabled
                      />
                    </div>
                    <div className="form-group mb-2">
                      <label className="form-label">Another Genre (optional):</label>
                      <input
                        type="text"
                        placeholder="Enter Another Genre"
                        name="genre2"
                        value={userData.anotherGenre}
                        className="form-control"
                        disabled
                      />
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfileComponent;


