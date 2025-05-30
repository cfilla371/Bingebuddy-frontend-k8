import React, { useEffect, useState } from "react";
import DashboardProfileComponent from "./DashboardProfileComponent";
import { jwtDecode } from "jwt-decode";

const DecodeTokenComponent = () => {
  useEffect(() => {
    const decodeToken = () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
          throw new Error("No token found");
        }

        const decodedToken = jwtDecode(token);
        console.log("Decoded Token:  " + decodedToken.username);
      } catch (error) {
        console.error("Error decoding token", error);
      }
    };

    decodeToken();
  }, []); nt

  return (
    <div>
      <DashboardProfileComponent subject={subject} />
      {/* {subject ? <p>Subject: {subject}</p> : <p>Loading...</p>} */}
    </div>
  );
};

export default DecodeTokenComponent;
