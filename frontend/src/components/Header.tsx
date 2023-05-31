import { Link } from "react-router-dom";
import { fire } from "../fire";

const Header = () => {
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
        <Link to="/">HOME</Link>
      </div>
      <div
        style={{
          display: "flex",
          gap: 20,
        }}
      >
        <div>
          <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
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
        <div>
          <p onClick={signOut} style={{ margin: 0, cursor: "pointer" }}>
            Sign out
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
