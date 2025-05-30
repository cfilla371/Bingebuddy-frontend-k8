import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import { useAuth } from "./AuthContext";
import validator from "validator";

const LoginPageComponent = () => {
  
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");



  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const errorsCopy = { ...errors };

  const navigate = useNavigate();
  const { login } = useAuth();
  const { user } = useAuth();

  let i = 0; 

  const handleChangeUsername = (e) => {
    setUserName(e.target.value);
    setErrors((prev) => ({ ...prev, username: "" }));
    setError(""); 
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    setErrors((prev) => ({ ...prev, password: "" }));
    setError(""); 
  };


  const validateForm = (username, password) => {
    let isValid = true;
    const errorsCopy = { username: "", password: "" };

    if (!username.trim() || !password.trim()) {
      errorsCopy.username = "Enter Email & Password";
      isValid = false;
    }

    if (!validator.isEmail(username)) {
      errorsCopy.username = "Please enter a valid email";
      isValid = false;
    }

    if (password.length < 8 || !/\d/.test(password)) {
      errorsCopy.password = "Password must contain a number & be at least 8 characters";
      isValid = false;
    }

    setErrors(errorsCopy);
    return isValid;
  };
  // --- End of validateForm() ---

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm(username, password)) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/loginjwt",
        { username, password },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );

      if (response.status === 200) {
        const { token, user } = response.data;

        localStorage.setItem("Token", token);
        localStorage.setItem("User", JSON.stringify(user));

        const userId = user.id;
        navigate(`/dashboard-main/${userId}`);
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Error logging in! Please retry.");
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div className="container login-container">
          <div className="login-form">
            <h2 className="text-center header">Login to your Account</h2>

            <div className="input-container">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter email"
                value={username}
                autoComplete="email"
                required
                onChange={handleChangeUsername}
              />
              {errorsCopy.username && (
                <div className="invalid-feedback"> {errorsCopy.username} </div>
              )}
            </div>

            <div className="input-container">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter password"
                value={password}
                autoComplete="current-password"
                required
                onChange={handleChangePassword}
              />
              {errorsCopy.password && (
                <div className="invalid-feedback"> {errorsCopy.password} </div>
              )}
            </div>

            <div className="input-container">
              <button
                className="btn btn-primary mb-2 login-button"
                type="submit"
              >
                Login
              </button>
            </div>

            <div className="login-link">
              <p className="registration-link">
                Don't have an account? <a href="/signup">Click here to Sign Up</a>
              </p>
            </div>
          </div>

          <p className="cerror">
            {error && <span>{error}</span>}
          </p>
        </div>
      </form>

      <div className="flex">
        <div className="home-image"></div>
      </div>
    </div>
  );
};

export default LoginPageComponent;
