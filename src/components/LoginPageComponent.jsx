import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import { useAuth } from "./AuthContext";
import validator from "validator";
const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_API_URL;

const LoginPageComponent = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login } = useAuth(); 

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

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    console.log("LoginPageComponent: Starting login process...");

    if (!validateForm(username, password)) {
      console.log("LoginPageComponent: Form validation failed.");
      return;
    }

    try {
      console.log("LoginPageComponent: Attempting axios POST to", `${BASE_URL}/api/loginjwt`);
      const response = await axios.post(
        `${BASE_URL}/api/loginjwt`,
        { username, password },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );

      console.log("LoginPageComponent: Axios response received. Status:", response.status);
      console.log("LoginPageComponent: Response data:", response.data); 

      if (response.status === 200) {
        const { token, user } = response.data;

        console.log("LoginPageComponent: Login successful (200 OK). User:", user, "Token:", token);

        localStorage.setItem("Token", token);
        localStorage.setItem("User", JSON.stringify(user));
        console.log("LoginPageComponent: Stored token and user in localStorage.");

        console.log("LoginPageComponent: Calling AuthContext login function...");
        login(user, token);
        console.log("LoginPageComponent: AuthContext login function called.");

        const userId = user.id;
        console.log("LoginPageComponent: Navigating to dashboard for userId:", userId);
        navigate(`/dashboard-main/${userId}`);
        console.log("LoginPageComponent: navigate() function called.");
      } else {
        setError("Invalid username or password");
        console.log("LoginPageComponent: Login failed, status not 200. Setting error.");
      }
    } catch (error) {
      console.error("LoginPageComponent: Error during login API call:", error);
      if (error.response) {
        console.error("LoginPageComponent: Error Response Data:", error.response.data);
        console.error("LoginPageComponent: Error Response Status:", error.response.status);
      } else if (error.request) {
        console.error("LoginPageComponent: No response received:", error.request);
      } else {
        console.error("LoginPageComponent: Error setting up request:", error.message);
      }
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
              {errors.username && (
                <div className="invalid-feedback"> {errors.username} </div>
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
              {errors.password && (
                <div className="invalid-feedback"> {errors.password} </div>
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