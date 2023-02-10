import React from "react";

import Notes from "./Notes";
const Home = (props) => {
  return (
    <div>
      <Notes mode={props.mode} notify={props.notify} />
    </div>
  );
};

export default Home;
