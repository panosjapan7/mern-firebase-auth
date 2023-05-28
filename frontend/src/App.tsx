import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { fire } from "./fire";
import "./App.css";
import Login from "./components/sessions/Login";
import ListAllNumbers from "./components/phonebook/ListAllNumbers";
import AddNumber from "./components/phonebook/AddNumber";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  fire.auth().onAuthStateChanged((user) => {
    return user ? setIsLoggedIn(true) : setIsLoggedIn(false);
  });

  const signOut = () => {
    fire.auth().signOut();
  };

  return (
    <div className="App">
      <Router>
        {!isLoggedIn ? (
          <>
            <Routes>
              <Route path="/" element={<Login />} />
            </Routes>
          </>
        ) : (
          <>
            <p>You are loggged in!!!</p>
            <button onClick={signOut}>Sign out</button>
            <Routes>
              <Route path="/add-number" element={<AddNumber />} />
              <Route path="/" element={<ListAllNumbers />} />
            </Routes>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
