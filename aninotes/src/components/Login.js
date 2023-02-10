import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Text from "./Text";

const Login = (props) => {
  let history = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();

    if (json.success) {
      localStorage.setItem("token", json.authToken);
      localStorage.setItem("name", json.Uname);
      localStorage.setItem("alert", "Login Successfull");
      history("/home");
      props.notify();
    } else {
      localStorage.setItem("alert", "Please Enter Valid Credentials");
      props.notify();
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Text />
      <div
        style={{
          marginTop: "100px",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="form-group my-2 ">
            <label htmlFor="exampleInputEmail1">Email</label>
            <input
              type="email"
              className="form-control "
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="email"
              onChange={onChange}
              value={credentials.email}
            />
          </div>
          <div className="form-group my-2">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control "
              id="exampleInputPassword1"
              placeholder="Password"
              name="password"
              onChange={onChange}
              value={credentials.password}
            />
          </div>

          <button type="submit" className="btn btn-primary my-2 mx-3">
            Login
          </button>
          <Link className="btn btn-primary mx-3" to="/signup" role="button">
            Signup
          </Link>
        </form>
      </div>
    </>
  );
};

export default Login;
