import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
const Navbar = (props) => {
  let location = useLocation();
  const cleanLocal = () => {
    localStorage.clear();
  };
  const { mode, changeMode } = props;
  return (
    <div>
      {/* <Link to={"/"}>Home</Link>
      <Link to={"/about"}>About</Link> */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link
            className="navbar-brand"
            to={localStorage.getItem("name") ? "/home" : "/"}
          >
            AnyNotes
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.path === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to={localStorage.getItem("name") ? "/home" : "/"}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.path === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>

            {localStorage.getItem("name") ? (
              <form className="d-flex">
                <span className="navbar-text mx-4">
                  Welcome, {localStorage.getItem("name")}
                </span>
                <Link
                  className="btn btn-primary mx-2"
                  to={"/"}
                  role="button"
                  onClick={cleanLocal}
                >
                  <i className="fa-solid fa-right-from-bracket"></i>
                </Link>
              </form>
            ) : (
              <form className="d-flex">
                <Link className="btn btn-primary mx-2" to={"/"} role="button">
                  Login
                </Link>
                {/* <Link
                  className="btn btn-primary mx-2"
                  to={"/signup"}
                  role="button"
                >
                  Sign Up
                </Link> */}
              </form>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
