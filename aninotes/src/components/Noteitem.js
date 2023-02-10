import React, { useContext } from "react";
import contextNotes from "../context/notes/noteContext";
const Noteitem = (props) => {
  const context = useContext(contextNotes);
  const { deleteNotes } = context;
  const { note, updateNotes } = props;
  const dark = {
    backgroundColor: "black",
    color: "white",
    borderRadius: "50px 10px",
    borderColor: "white",
  };
  const white = {
    borderRadius: "50px 10px",
  };
  return (
    <div className="col-md-3 my-3 ">
      <div className="card " style={props.mode === "Dark" ? dark : white}>
        <div className="card-body ">
          <h3 className="card-title ">{note.title}</h3>
          <p className="card-text">{note.description}</p>
          <h5 className="card-title badge bg-primary text-wrap">{note.tag}</h5>

          <i
            className="fa-solid fa-trash mx-3"
            onClick={() => {
              deleteNotes(note._id);
              localStorage.setItem("alert", "Note Deleted");
              props.notify();
            }}
          ></i>
          <i
            className="fa-solid fa-pen-to-square"
            onClick={() => updateNotes(note)}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
