import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import AddNumber from "./components/phonebook/AddNumber";
import Register from "./pages/Register";
import { UserContext } from "./context/UserContext";
import Home from "./pages/Home";

function App() {
  const { user, setUser } = useContext(UserContext);

  console.log("user: ", user);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-number" element={<AddNumber />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
