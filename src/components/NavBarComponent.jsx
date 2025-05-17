import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useAuth } from "./AuthContext";

const NavBarComponent = () => {
  const { logout } = useAuth();
  const navigator = useNavigate();

  // const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();

  // const logIn = (e) => {
  //   e.preventDefault();

  //   // setIsLoggedIn(true);
  //   // setAuthUser({
  //   //   Name: "Santa Claus",
  //   // });
  // };

  const logoutUser = (e) => {
    e.preventDefault();
    logout();
    navigator("/");

    // setIsLoggedIn(false);
    // setAuthUser(null);
  };

  // const { setAuth } = useContext(AuthContext);

  // const handleSelect = (eventKey) => alert(`selected ${eventKey}`);
  // const handleSelect = (eventKey) => navigator(`${eventKey}`);

  return (
    <>
      {/* <Navbar bg="primary" data-bs-theme="dark"> */}
      <Navbar className="navbar navbar-custom d-flex navbar-brand text-light">
        <Container>
          <Navbar.Brand className="navbar-brand text-light">
            BingeBuddy: An Online Movie Rating Platform
          </Navbar.Brand>

          <Nav className="justify-content-end nav-link navbar-brand text-light">
            <button
              className="btn btn-success logoutButton"
              name="logoutButton"
              type="submit"
              onClick={(e) => {
                logoutUser(e);
              }}
            >
              Logout
            </button>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBarComponent;
