import React, { useEffect, useState } from "react";
import { createUser, getUser, updateUser } from "../services/UserService";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UserComponent = () => {
  const [username, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [genre1, setGenre1] = useState("");
  const [genre2, setGenre2] = useState("");

  const { id } = useParams();

  const [errors, setErrors] = useState({
    username: "",
    firstName: "",
    lastName: "",
    genre1: "",
    genre2: "",
  });

  const navigator = useNavigate();

  useEffect(
    () => {
      if (id) {
        getUser(id)
          .then((response) => {
            setUserName(response.data.userName);
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setGenre1(response.data.genre1);
            setGenre2(response.data.genre2);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    { id }
  );

  const handleLastName = (e) => setLastName(e.target.value);

  function handleUserName(e) {
    setUserName(e.target.value);
  }

  function saveOrUpdateUser(e) {
    e.preventDefault();

    if (validateForm()) {
      const user = { username, firstName, lastName, genre1, genre2 };
      if (id) {
        updateUser(id, user)
          .then((response) => {
            console.log(response.data);
            // code to update existing user
            navigator("/users");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        createUser(user)
          .then((response) => {
            // code to add new user
            navigator("/users");
          })
          .catch((error) => {
          });
      }
    }
  }

  function validateForm() {
    let valid = true;

    const errorsCopy = { ...errors };

    if (username.trim()) {
      errorsCopy.username = "";
    }
    if (firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      errorsCopy.firstName = "First Name is required";
      valid = "false";
    }
    if (lastName.trim()) {
      errorsCopy.lastName = "";
    } else {
      errorsCopy.lastName = "Last Name is required";
      valid = "false";
    }
    if (genre1.trim()) {
      errorsCopy.genre1 = "";
    } else {
      errorsCopy.genre1 = "Please pick a genre!";
      valid = "false";
    }
    if (genre2.trim()) {
      errorsCopy.genre2 = "";
    }
    setErrors(errorsCopy);
    return valid;
  }

  function pageTitle() {
    if (id) {
      return <h2 className="text-center">Update User</h2>;
    } else {
      <h2 className="text-center">Add User</h2>;
    }
  }

  return (
    <div className="container">
      <br /> <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          {pageTitle()}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                {/* Generated automatically, user doesn't have to type in */}
                <label className="form-label"> Email: </label>
                <input
                  type="text"
                  placeholder="Enter Email"
                  name="username"
                  value={username}
                  className={`form-control ${
                    errors.username ? "is-invalid" : ""
                  }`}
                  onChange={handleUser}
                  disabled
                  // readOnly
                ></input>
                {errors.username && (
                  <div className="invalid-feedback"> {errors.username} </div>
                )}
              </div>

              {/* <div>
                            <label className='form-label'> Username (optional): </label>
                            <input
                                type='text'
                                placeholder='Email will be used in posts if username is not provided'
                                name='userName'
                                value={userName}
                                className={`form-control ${errors.userName ? 'is-invalid' : ''}`}
                                onChange={(e) => setUserName(e.target.value)}
                            >
                            </input>
                            {errors.email && <div className='invalid-feedback'> {errors.email} </div>}
                        </div> */}

              <div className="form-group mb-2">
                <label className="form-label"> First Name: </label>
                <input
                  type="text"
                  placeholder="Enter First Name"
                  name="firstName"
                  value={firstName}
                  className={`form-control ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setFirstName(e.target.value)}
                ></input>
                {errors.firstName && (
                  <div className="invalid-feedback"> {errors.firstName} </div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label"> Last Name: </label>
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  name="lastName"
                  value={lastName}
                  className={`form-control ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                  onChange={handleLastName}
                ></input>
                {errors.lastName && (
                  <div className="invalid-feedback"> {errors.lastName} </div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label"> Genre of your choice: </label>
                <input
                  type="text"
                  placeholder="Enter Genre"
                  name="genre1"
                  value={genre1}
                  className={`form-control ${
                    errors.genre1 ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setGenre1(e.target.value)}
                ></input>
                {errors.genre1 && (
                  <div className="invalid-feedback"> {errors.genre1} </div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">
                  {" "}
                  Another Genre of your choice (optional):{" "}
                </label>
                <input
                  type="text"
                  placeholder="Enter Another Genre"
                  name="genre2"
                  value={genre2}
                  className={`form-control ${
                    errors.genre2 ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setGenre2(e.target.value)}
                ></input>
                {errors.genre2 && (
                  <div className="invalid-feedback"> {errors.genre2} </div>
                )}
              </div>

              <button className="btn btn-success" onClick={saveOrUpdateUser}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserComponent;
