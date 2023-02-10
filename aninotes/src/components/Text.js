import React from "react";
import Typewriter from "typewriter-effect";
const Text = () => {
  return (
    <div
      style={{
        marginTop: "1px",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "50px",
      }}
    >
      <Typewriter
        onInit={(typewriter) => {
          typewriter

            .typeString(`Anynotes`)

            .pauseFor(1000)
            .deleteAll()
            .typeString("All notes in one place.")
            .pauseFor(1000)
            .deleteAll()
            .typeString("Thanks for Visiting 🙏")
            .start();
        }}
      />
    </div>
  );
};

export default Text;
