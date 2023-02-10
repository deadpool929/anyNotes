import React, { useState } from "react";
import Notes from "../../components/Notes";
import contextNotes from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000/";
  const s1 = [];

  const [state, setState] = useState(s1);

  const getNotes = async () => {
    const response = await fetch(`${host}api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),

        // "auth-token":
        //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkNjRkZTg3MzUxMjExMGE1M2Q2ZjNkIn0sImlhdCI6MTY3NTAwNzMyMH0.36O-x2G4kmgbf3i4ejjace5qO_y1VP1wFEAQYTKjvlk",
      },
    });
    const json = await response.json();

    setState(json);
  };

  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
        // "auth-token":
        //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkNjRkZTg3MzUxMjExMGE1M2Q2ZjNkIn0sImlhdCI6MTY3NTAwNzMyMH0.36O-x2G4kmgbf3i4ejjace5qO_y1VP1wFEAQYTKjvlk",
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();

    setState(state.concat(json));
    // const newNote = state.filter((state) => {
    //   return state._id !== id;
    // });
    // setState(newNote);
  };

  // const deleteNode = (id) => {
  //   const newNote = state.filter((state) => {
  //     return state._id !== id;
  //   });
  //   setState(newNote);
  // };

  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}api/notes//updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
        // "auth-token":
        //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkNjRkZTg3MzUxMjExMGE1M2Q2ZjNkIn0sImlhdCI6MTY3NTAwNzMyMH0.36O-x2G4kmgbf3i4ejjace5qO_y1VP1wFEAQYTKjvlk",
      },

      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json();

    let newNotes = JSON.parse(JSON.stringify(state));

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setState(newNotes);
  };

  const deleteNotes = async (id) => {
    const response = await fetch(`${host}api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
        // "auth-token":
        //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkNjRkZTg3MzUxMjExMGE1M2Q2ZjNkIn0sImlhdCI6MTY3NTAwNzMyMH0.36O-x2G4kmgbf3i4ejjace5qO_y1VP1wFEAQYTKjvlk",
      },
    });
    const json = await response.json();
    console.log(json);
    setState(json);
    const newNote = state.filter((state) => {
      return state._id !== id;
    });
    setState(newNote);
  };

  return (
    <contextNotes.Provider
      value={{ state, addNote, editNote, getNotes, deleteNotes }}
    >
      {props.children}
    </contextNotes.Provider>
  );
};

export default NoteState;
