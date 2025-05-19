import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import SidebarComponent from "./SidebarComponent";
import axios from "axios";
import { useAuth } from "./AuthContext";

const DashboardMainComponent = () => {
  const { userId } = useParams(); 
  const { user } = useAuth();
  const navigate = useNavigate();

  const [userFirstName, setUserFirstName] = useState("");
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token && userId) {
      axios
        .get(`http://localhost:8080/user-profile/${userId}`, { 
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUserFirstName(response.data.firstName);
        })
        .catch((error) => console.error(error));
    }
  }, [userId]);

  return (
    <div className="flex">
      <div className={`${open ? "w-72" : "w-20"} bg-dark-purple duration-300 h-screen p-5 pt-8 relative`}>
        <img
          src="../src/Images/Dashboard-Images/control.png"
          className={`absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 border-dark-purple ${!open && "rotate-180"}`}
        />
        <div className="flex gap-x-4 items-center">
          <img src="../src/Images/Dashboard-Images/logo.png" className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`} />
          <h1 className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"}`}>Dashboard</h1>
        </div>
        <div>
        <SidebarComponent />
        </div>
      </div> 

      <div className="h-screen flex-1 p-7">
        <h1>Welcome BingeBuddy {userFirstName}!</h1>
        <div className="container-dashmain">
          <div className="header"></div>
          <div className="logo-image"></div>
          <div className="content">
            <p className="logo-text">
              Welcome to Bingebuddy – your go-to destination for honest, insightful, and entertaining movie reviews!
            </p>
            <p className="logo-text">
              Whether you’re searching for the next must-watch blockbuster, a hidden indie gem, or a binge-worthy film series, we have got you covered.
            </p>
            <p className="logo-text">
              Stay updated with the latest releases, explore classics, and join a community of fellow movie lovers who share your passion for cinema.
            </p>
            <p className="logo-text">
              Let Bingebuddy be your trusted guide for what to watch next!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMainComponent;

