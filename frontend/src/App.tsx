import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { fire } from "./fire";
import { User } from "@firebase/auth-types";
import "./App.css";
import Login from "./pages/Login";
import ListAllNumbers from "./components/phonebook/ListAllNumbers";
import AddNumber from "./components/phonebook/AddNumber";
import Register from "./pages/Register";
import { UserProvider } from "./context/UserContext";
import { UserContext } from "./context/UserContext";

function App() {
  const { user, setUser } = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  fire.auth().onAuthStateChanged((user) => {
    user ? setIsLoggedIn(true) : setIsLoggedIn(false);
    let loggedUser = user;
    setLoggedUser(loggedUser);
    setIsLoading(false);
    return;
  });

  const signOut = () => {
    fire.auth().signOut();
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="App">
      {user !== null ? <p>user has value</p> : <p>user must be null</p>}
      <Router>
        {!isLoggedIn ? (
          <>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
            <div>
              <br />
              <br />
              <Link to="/login">Login</Link>
              <br />
              <br />
              <Link to="/register">Register</Link>
            </div>
          </>
        ) : (
          <>
            <AuthenticatedContent
              displayName={loggedUser?.displayName}
              signOut={signOut}
            />
          </>
        )}
      </Router>
    </div>
  );
}

interface AuthenticatedContentProps {
  displayName: string | null | undefined;
  signOut: () => void;
}

function AuthenticatedContent({
  displayName,
  signOut,
}: AuthenticatedContentProps) {
  const { user, setUser } = useContext(UserContext);
  console.log("user: ", user);
  return (
    <>
      {/* <p>{`You are loggged in, ${user._delegate.displayName}!!!`}</p> */}
      <button onClick={signOut}>Sign out</button>
      <Routes>
        <Route path="/add-number" element={<AddNumber />} />
        <Route path="/" element={<ListAllNumbers />} />
      </Routes>
    </>
  );
}

export default App;
