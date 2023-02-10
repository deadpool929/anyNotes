import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Darkmode from "./components/Darkmode";
import Text from "./components/Text";
function App() {
  const [show, setShow] = useState("");
  const [mode, setMode] = useState("Light");
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
    // setMode("Light");
  }, []);
  const changeMode = () => {
    if (mode === "Light") {
      setMode("Dark");
      document.body.style.backgroundColor = "black";
      document.body.style.color = "white";
    } else {
      setMode("Light");
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
    }
  };
  const notify = () => {
    toast(`🦄 ${localStorage.getItem("alert")}`, {
      theme: `${mode === "Dark" ? "dark" : "light"}`,
      autoClose: 1300,
    });
  };
  return (
    <div>
      <NoteState>
        <Navbar
          mode={mode}
          setMode={setMode}
          changeMode={changeMode}
          notify={notify}
        />
        <Alert />
        <Darkmode
          mode={mode}
          setMode={setMode}
          changeMode={changeMode}
          notify={notify}
        />

        <div className="container my-3 ">
          <Routes>
            <Route
              exact
              path="/home"
              element={<Home mode={mode} notify={notify} />}
            />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/" element={<Login notify={notify} />} />
            <Route exact path="/signup" element={<Signup notify={notify} />} />
          </Routes>
        </div>
      </NoteState>
      <ToastContainer
        theme={mode === "Dark" ? "dark" : "light"}
        autoClose={2000}
      />
    </div>
  );
}

export default App;
