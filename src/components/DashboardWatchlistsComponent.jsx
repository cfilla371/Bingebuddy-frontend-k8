import React, { useState, useEffect } from "react";
import SidebarComponent from "./SidebarComponent";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_API_URL;

const DashboardWatchlistsComponent = () => {
  const [watchlists, setWatchlists] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("PLANNED");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const fetchWatchlist = async () => {
    try {
      const token = localStorage.getItem("Token");
      if (!token) {
        setError("No token found. Please log in.");
        return;
      }

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId || decodedToken.sub;
      if (!userId) {
        setError("User ID not found in token.");
        return;
      }

      const response = await axios.get(`${BASE_URL}/api/user-watchlists/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setWatchlists(response.data);
    } catch (error) {
      setError("Failed to load watchlist.");
    }
  };

  return (
    <div className="flex">
      <SidebarComponent />
      <div className="container">
        <h2 className="text-center header">Watchlists</h2>

        {error && <p className="text-danger text-center">{error}</p>}

        <form className="center">
          <h4>Pick from the list to check out the status of your movies:</h4>
          <select id="watchlists" name="watchlists" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
            <option value="PLANNED">PLANNED</option>
            <option value="WATCHING">WATCHING</option>
            <option value="COMPLETED">COMPLETED</option>
          </select>
        </form>

        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Date Added</th>
              <th>Movie</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
  {watchlists
    .filter((item) => item.status === selectedStatus) 
    .map((watchlistItem) => {
      const dateAdded = watchlistItem.scheduledDate
        ? new Date(watchlistItem.scheduledDate).toLocaleDateString()
        : "No Date Available";

      const movieTitle = watchlistItem.movie?.title || watchlistItem.movie?.Title || "No Movie Data";

      return (
        <tr key={watchlistItem.id}>
          <td>{dateAdded}</td>
          <td>{movieTitle}</td>
          <td>{watchlistItem.status}</td>
        </tr>
      );
    })}
</tbody>

        </table>
      </div>
    </div>
  );
};

export default DashboardWatchlistsComponent;

