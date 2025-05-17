import React, { useState } from "react";
import SidebarComponent from "./SidebarComponent";
import { useNavigate } from "react-router-dom";

export default function SearchMovie() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showMovies, setShowMovies] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("Token");
  const user = localStorage.getItem("User");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = () => {
    fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=a6836b7c`)
      .then((res) => res.json())
      .then((json) => {
        if (json.Search) {
          const movies = json.Search.map((movie) => ({
            title: movie.Title,
            poster: movie.Poster,
            imdbId: movie.imdbID,
          }));
          setShowMovies(movies);
        }
      });
  };

  
  const handleAddToWatchlist = (imdbID) => {
   
    const token = localStorage.getItem("Token");
    const storedUser = localStorage.getItem("User");

    if (!token || !storedUser) {
        alert("You must be logged in to add to your watchlist!");
        return;
    }

    const user = JSON.parse(storedUser); 
    if (!user.id) {
        alert("You must be logged in to add to your watchlist!");
        return;
    }

    console.log(" Adding to Watchlist for User:", user.id);
    console.log("🎬 Movie ID:", imdbID);
    console.log(
      "🔗 Request URL:",
      `http://localhost:8080/user-watchlists/${user.id}?imdbId=${imdbID}&status=PLANNED`
    );
    
    fetch(`http://localhost:8080/user-watchlists/${user.id}?imdbId=${imdbID}&status=PLANNED`, {

        method: "POST",
        headers: {
  
            Authorization: `Bearer ${token}`,
        },
       
    })
    .then((res) => {
        if (!res.ok) throw new Error("Failed to add movie to watchlist.");
        return res.text();
    })
    .then(() => {
        alert("Movie added to watchlist!");
        navigate(`/dashboard-watchlists/${user.id}`); 
    })
    .catch((err) => {
        console.error(" Error adding to watchlist:", err);
        alert("Failed to add to watchlist.");
    });
};
  

  const displayMovies = (movie) => {
    return (
      <div key={movie.imdbId} className="movie-card">
        <h3 className="movie-title">{movie.title}</h3>
        <img
          src={movie.poster}
          alt={movie.title}
          className="movie-poster"
          onClick={() => navigate(`/single-movie/${movie.imdbId}`)} 
        />
        <button
          className="btn-watchlist"
          onClick={() => handleAddToWatchlist(movie.imdbId)} 
        >
          ➕ Add to Watchlist
        </button>
      </div>
    );
  };

  return (
    <div className="flex">
      <SidebarComponent />
      <div className="search-container">
        <h1>Search for a Movie</h1>
        <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Enter movie title" />
        <button onClick={handleSubmit} className="search-btn">Search</button>
        <div className="movie-list">{showMovies.map(displayMovies)}</div>
      </div>
    </div>
  );
}


