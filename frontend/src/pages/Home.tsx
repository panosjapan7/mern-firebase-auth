import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ListAllNumbers from "../components/phonebook/ListAllNumbers";
import ListAllUsers from "../components/phonebook/ListAllUsers";
import { UserContext } from "../context/UserContext";

const Home: React.FC = () => {
  const { user } = useContext(UserContext);

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h1>Home</h1>
      {!user ? (
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
          {user && (
            <>
              <p>
                You are loggged in,
                <span style={{ fontWeight: "bold" }}> {user.displayName}</span>!
              </p>
              <p>
                Your email address is:{" "}
                {user.emailVerified ? (
                  <span style={{ fontWeight: "bold", color: "green" }}>
                    verified!
                  </span>
                ) : (
                  <span style={{ fontWeight: "bold", color: "red" }}>
                    unverified :(
                  </span>
                )}
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 20,
                  flexWrap: "wrap",
                }}
              >
                <ListAllNumbers uid={user.uid} />
                <ListAllUsers />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
