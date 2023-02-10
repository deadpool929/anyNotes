import React, { useContext, useState } from "react";
import contextNotes from "../context/notes/noteContext";
const AddNote = (props) => {
  const context = useContext(contextNotes);
  const { addNote } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handleNote = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    localStorage.setItem("alert", "Note added");
    props.notify();
  };
  return (
    <div className="">
      <h1>Add a note</h1>
      <div className="container my-3">
        <form>
          <div className="form-group  my-3">
            <label htmlFor="exampleInputEmail1">Title</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Title (Atleast 5 Characters)"
              onChange={onChange}
              name="title"
              value={note.title}
            />
          </div>
          <div className="form-group  my-3">
            <label htmlFor="exampleInputPassword1">Description</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              onChange={onChange}
              placeholder="Description (Atleast 5 Characters)"
              name="description"
              value={note.description}
            />
          </div>
          <div className="form-group  my-3">
            <label htmlFor="exampleInputPassword1">Tag</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              onChange={onChange}
              placeholder="Tag"
              name="tag"
              value={note.tag}
            />
          </div>

          <button
            disabled={note.title.length < 5 || note.description.length < 5}
            type="submit"
            className="btn btn-primary  my-3"
            onClick={handleNote}
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
