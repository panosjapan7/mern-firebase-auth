import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { fire } from "../fire";
import { User } from "@firebase/auth-types";
import { UserContext } from "../context/UserContext";
import ListAllNumbers from "../components/phonebook/ListAllNumbers";

// interface HomeProps {
//   displayName?: string | null | undefined;
//   signOut?: () => void;
// }

const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  fire.auth().onAuthStateChanged((user) => {
    user ? setIsLoggedIn(true) : setIsLoggedIn(false);
    setLoggedUser(user);
    setIsLoading(false);
    return;
  });

  const signOut = () => {
    fire.auth().signOut();
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  console.log("user: ", user);
  return (
    <div>
      <h1>Home</h1>
      {!isLoggedIn ? (
        <>
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
          {/* <p>{`You are loggged in, ${user._delegate.displayName}!!!`}</p> */}
          <button onClick={signOut}>Sign out</button>
          <ListAllNumbers />
        </>
      )}
    </div>
  );
};

export default Home;
