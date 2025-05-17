import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import validator from "validator";

const SignUpPageComponent = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    genre: "",
    anotherGenre: "",
  });

  const [registrationSuccess, setRegistrationSuccess] = useState();

  const [error, setError] = useState("");

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  const errorsCopy = { ...errors };

  let i = 0; // Counter to track signup validation

  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();

    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });

    setErrors("", "");
  };

  //  Validation

  // --- start of Validation ---
  function validateForm() {
    if (userData.username.trim && userData.password.trim) {
      // if characters in username-password, set errorsCopy to empty
      errorsCopy.username = "";
      errorsCopy.password = "";
    } else {
      errorsCopy.username = "Enter Email & Password"; // if either email or password is empty, display a generic msg for both
      //errorsCopy.password = "Enter Password";
      console.log("Enter Email & Password");
      i++;
      console.log("Value in i : " + i);
      return;
    }
    if (!validator.isEmail(userData.username)) {
      errorsCopy.username = "Please enter a valid email"; // msg displayed
      console.log("Please enter a valid email");
      console.log("Value in i : " + i);
      i++;
      return;
    }

    if (
      userData.password.length < 8 ||
      !/\d/.test(userData.password.length) ||
      userData.confirmPassword.length < 8 ||
      !/\d/.test(userData.confirmPassword.length)
    ) {
      errorsCopy.password =
        "Passwords cannot be blank & must contain a number & be atleast 8 characters";
      console.log(
        "Passwords cannot be blank & must contain a number & be atleast 8 characters"
      );
      i++;
      console.log("Value in i : " + i);
      return;
    }

    // Checking if passwords match
    if (userData.password !== userData.confirmPassword) {
      console.log("Passwords do not match");
      // setError("Passwords do not match!");
      i++;
      errorsCopy.password = "Passwords do not match!";
      return;
    }

    if (userData.firstName.length <= 0) {
      errorsCopy.firstName = "Please enter First Name";
      console.log("First Name empty");
      i++;
      console.log("Value in i : " + i);
      return;
    }

    if (userData.lastName.length <= 0) {
      errorsCopy.lastName = "Please enter Last Name";
      console.log("Last Name empty");
      i++;
      console.log("Value in i : " + i);
      return;
    }

    if (userData.genre.length <= 0) {
      errorsCopy.lastName = "Please enter a Genre of your choice";
      console.log("Genre empty");
      i++;
      console.log("Value in i : " + i);
      return;
    }
  } // --- End of validateForm() ---

  const handleRegistration = async (e) => {
    e.preventDefault();

    // if (userData.password !== userData.confirmPassword) {
    //   console.log("Passwords do not match");
    //   setError("Passwords do not match!");
    //   return;
    // }
    setError("");

    validateForm();
    setErrors(errorsCopy);
    console.log(
      "From handleRegistration() -- after username password etc validation"
    );

    if (i <= 0) {
      console.log(userData);

      setErrors(errorsCopy);
      console.log(userData);

      try {
        console.log(userData);

        const response = await axios.post(
          "http://localhost:8080/register",
          userData
        );
        // .then((response) => {

        //   if (response.data.id) {
        //     console.log("ID exists!");
        //     setRegistrationSuccess(1);
        //   } else {
        //     console.log("ID doesn't exist!");
        //     setRegistrationSuccess(2);
        //   }
        // });

        if (response.status == 201) {
          console.log("user registered: ", response.data);
          console.log(userData);

          if (response.data.id) {
            setRegistrationSuccess(1);
          } else {
            setRegistrationSuccess(2);
          }
        } else {
          const errorText = await response.text();
          setError(errorText);
          setRegistrationSuccess(2);
        }
      } catch (error) {
        setError("An error occurred during user registration");
        console.log("Registration error: ", error);
        setRegistrationSuccess(2);
      }
      // setRegistrationSuccess(true);
    }
  };

  if (registrationSuccess === 1) {
    return (
      <div className="centered-container">
        <div className="login-container">
          <h1>Registered successfully</h1>
          <p>
            Login to access <a href="/">your account </a>
          </p>
        </div>
      </div>
    );
  } else if (registrationSuccess === 2) {
    return (
      <div className="centered-container">
        <div className="login-container">
          <h1>Something went wrong. Please try again</h1>
          <p>
            <a href="/signup">Click to sign up </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container login-container">
      <form>
        <div className="login-form">
          <h2 className="text-center">Create BingeBuddy Account</h2>

          <div className="input-container">
            <input
              type="email"
              placeholder="Email"
              name="username"
              value={userData.username}
              required
              onChange={handleChange}
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={userData.password}
              required
              onChange={handleChange}
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={userData.confirmPassword}
              required
              onChange={handleChange}
            />
          </div>

          <div className="input-container">
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={userData.firstName}
              required
              onChange={handleChange}
            />
          </div>

          <div className="input-container">
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={userData.lastName}
              required
              onChange={handleChange}
            />
          </div>

          <div className="input-container">
            <input
              type="text"
              placeholder="Enter Genre of choice"
              name="genre"
              value={userData.genre}
              required
              onChange={handleChange}
            />
          </div>

          <div className="input-container">
            <input
              type="text"
              placeholder="Enter Genre Optional"
              name="anotherGenre"
              value={userData.anotherGenre}
              required
              onChange={handleChange}
            />
          </div>

          {error && { error }}

          <button
            className="btn btn-primary mb-2 login-button"
            onClick={handleRegistration}
          >
            SignUp
          </button>

          <div className="login-link">
            <p className="registration-link">
              Already have an account? <a href="/">Login here</a>
            </p>
            <p className="cerror" name="errorlabel">
              {errorsCopy.username}
              {errorsCopy.password}
              {errorsCopy.firstName}
              {errorsCopy.lastName}
              {errorsCopy.genre}
            </p>
          </div>
          <br />
          <p></p>
        </div>
      </form>
    </div>
  );
};

export default SignUpPageComponent;
