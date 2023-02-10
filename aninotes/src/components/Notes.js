import React, { useContext, useEffect, useRef, useState } from "react";
import contextNotes from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
const Notes = (props) => {
  const context = useContext(contextNotes);
  const { state, getNotes, editNote } = context;

  useEffect(() => {
    getNotes();
  }, []);
  const ref = useRef(null);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  const updateNotes = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleNote = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const dark = {
    backgroundColor: "black",
    color: "white",
    // borderRadius: "50px 10px",
    borderColor: "white",
  };
  const white = {
    // borderRadius: "50px 10px",
  };

  return (
    <>
      <AddNote notify={props.notify} />

      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModalCenter"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div
            className="modal-content"
            style={props.mode === "Dark" ? dark : white}
          >
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Edit Note
              </h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
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
                    name="etitle"
                    value={note.etitle}
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
                    name="edescription"
                    value={note.edescription}
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
                    name="etag"
                    value={note.etag}
                  />
                </div>

                {/* <button
                  type="submit"
                  className="btn btn-primary  my-3"
                  onClick={handleNote}
                >
                  Add Note
                </button> */}
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={
                  note.etitle.length < 5 || note.edescription.length < 5
                }
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  handleNote();
                  localStorage.setItem("alert", "Note Updated");
                  props.notify();
                }}
                data-bs-dismiss="modal"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h1>Your Notes</h1>

        {state.length === 0 ? (
          <div className="container mx-2">No Notes to Display 😓</div>
        ) : (
          state.map((note) => {
            return (
              <Noteitem
                key={note._id}
                note={note}
                updateNotes={updateNotes}
                mode={props.mode}
                notify={props.notify}
              />
            );
          })
        )}
      </div>
    </>
  );
};

export default Notes;
