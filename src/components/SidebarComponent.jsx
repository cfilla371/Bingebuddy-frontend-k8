import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useParams, Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_API_URL;


const SidebarComponent = () => {
  const [open, setOpen] = useState(true);
   const { user } = useAuth();
   const { userId } = useParams();
  

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token && userId) {
      axios
        .get(`${BASE_URL}/api/user-profile/${userId}`, { 
          headers: { Authorization: `Bearer ${token}` },
        })
    }
  }, [userId]);

  const Menus = [
    { title: "Dashboard", src: "Chart_fill",  path: `/dashboard-main/${userId}`},
    { title: "Profile", src: "User", path: `/user-profile/${userId}`},
    { title: "Reviews", src: "Chat", path: `/user-reviews/${userId}`},
    { title: "Comments", src: "Folder", path: `/user-comments/${userId}`},
    { title: "Watchlists!", src: "Calendar", path: `/user-watchlists/${userId}`},
    { title: "Trends", src: "Chart", path: `/user-trends/${userId}` },
    { title: "Search Movies", src: "Search", path: "/search-movie" },
    { title: "Search Users", src: "Search", path: "/search-user" },
    //{ title: "Settings", src: "Setting", path:"/user-settings/1" },
  ];

  return (
    <div className="flex">
      {/* 1 */}
      <div
        className={`${open ? "w-72" : "w-20"} 
      bg-dark-purple duration-300 h-screen p-5 pt-8 relative`}
      >
        <img
          src="../src/Images/Dashboard-Images/control.png"
          className={`absolute cusor-pointer rounded-full -right-3 top-9 w-7 border-2 border-dark-purple 
        ${!open && "rotate-180"}`}
          // onClick={() => setOpen(!open)}
        />

        <div className="flex gap-x-4 items-center">
          <img
            src="../src/Images/Dashboard-Images/logo.png"
            className={`cursor-pointer duration-500 
        ${open && "rotate-[360deg]"}`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 
        ${!open && "scale-0"}`}
          >
            Welcome
          </h1>
        </div>

        <ul className="pt-6">
          {Menus.map((menu, index) => (
            <li
              key={index}
              className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2
        hover:bg-light-white rounded-md
        ${menu.gap ? "mt-9" : "mt-2"} 
        ${index === 0}`}
            >
              {/* index === 0 && "bg-light-white" */}
              <Link to={menu.path} className="nav-link text-truncate">
                <img src={`../src/Images/Dashboard-Images/${menu.src}.png`} />
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {menu.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* 1 */}
    </div>
  );
};

export default SidebarComponent;
