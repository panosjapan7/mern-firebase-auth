import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import AddNumber from "./components/phonebook/AddNumber";
import Register from "./pages/Register";
import { UserContext } from "./context/UserContext";
import Home from "./pages/Home";
import ProtectedPage from "./pages/ProtectedPage";
import Header from "./components/Header";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const { user, setUser } = useContext(UserContext);

  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-number" element={<AddNumber />} />
          <Route path="/protected-page" element={<ProtectedPage />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
