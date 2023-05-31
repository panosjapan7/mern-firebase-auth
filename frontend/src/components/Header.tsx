import { Link } from "react-router-dom";
import { fire } from "../fire";
import { useState } from "react";
import { User } from "@firebase/auth-types";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [, setLoggedUser] = useState<User | null>(null);

  fire.auth().onAuthStateChanged((user) => {
    user ? setIsLoggedIn(true) : setIsLoggedIn(false);
    setLoggedUser(user);
  });

  const signOut = () => {
    fire.auth().signOut();
  };
  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        justifyContent: "space-evenly",
        marginTop: 30,
        paddingBottom: 30,
        borderBottom: "1px solid #D3D3D3",
      }}
    >
      <div>
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          HOME
        </Link>
      </div>
      <div
        style={{
          display: "flex",
          gap: 40,
        }}
      >
        {!isLoggedIn && (
          <>
            <div>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "black" }}
              >
                Login
              </Link>
            </div>
            <div>
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "black" }}
              >
                Register
              </Link>
            </div>
          </>
        )}
        {isLoggedIn && (
          <>
            <div>
              <Link
                to="/protected-page"
                style={{ textDecoration: "none", color: "black" }}
              >
                Admin Page (protected)
              </Link>
            </div>
            <div>
              <p onClick={signOut} style={{ margin: 0, cursor: "pointer" }}>
                Sign out
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
