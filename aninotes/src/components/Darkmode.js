import React from "react";

const Darkmode = (props) => {
  return (
    <div>
      {props.mode === "Light" ? (
        <i
          className="fa-solid fa-moon mx-4 my-4 fa-2x"
          //style={{ height: "50px", width: "50px" }}
          onClick={() => {
            props.changeMode();

            localStorage.setItem("alert", "Dark mode enabled");

            props.notify();
          }}
        ></i>
      ) : (
        <i
          className="fa-regular fa-sun mx-4 my-4 fa-2x"
          onClick={() => {
            props.changeMode();

            localStorage.setItem("alert", "Light mode enabled");

            props.notify();
          }}
        ></i>
      )}
    </div>
  );
};

export default Darkmode;
