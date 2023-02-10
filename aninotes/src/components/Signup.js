import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Text from "./Text";

const Signup = (props) => {
  let history = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();

    if (json.success) {
      localStorage.setItem("alert", "Signup Successfull");
      props.notify();
      history("/");
    } else {
      localStorage.setItem("alert", "Use Valid Credentials");
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
          <h1>Sign-up</h1>
          <div className="form-group my-2">
            <label htmlFor="formGroupExampleInput">Name</label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              placeholder="Enter name"
              name="name"
              onChange={onChange}
              value={credentials.name}
            />
          </div>
          <div className="form-group my-2">
            <label htmlFor="exampleInputEmail1">Email </label>
            <input
              type="email"
              className="form-control"
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
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              name="password"
              onChange={onChange}
              value={credentials.password}
            />
          </div>

          <button type="submit" className="btn btn-primary my-2 mx-3">
            Signup
          </button>
          <Link className="btn btn-primary mx-3" to="/" role="button">
            Login
          </Link>
        </form>
      </div>
    </>
  );
};

export default Signup;
