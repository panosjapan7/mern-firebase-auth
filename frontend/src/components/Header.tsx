import { Link, useNavigate } from "react-router-dom";
import { fire } from "../fire";

interface Props {
  isLoggedIn: boolean | null;
}

const Header: React.FC<Props> = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const signOut = () => {
    fire.auth().signOut();
    navigate("/login");
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
      {isLoggedIn === false ||
        (isLoggedIn === true && (
          <div>
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              HOME
            </Link>
          </div>
        ))}
      <div
        style={{
          display: "flex",
          gap: 40,
        }}
      >
        {isLoggedIn === false && (
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
        {isLoggedIn === true && (
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
                Log out
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
