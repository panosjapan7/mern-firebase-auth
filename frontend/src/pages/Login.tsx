import React, { useState, useContext } from "react";
import { fire } from "../fire";
import { User as FirebaseUser } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import GoogleOAuth from "../components/GoogleOAuth";

const Login = () => {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const trimmedEmail = email.trim();
      await fire.auth().signInWithEmailAndPassword(trimmedEmail, password);
      const user = fire.auth().currentUser;
      setUser(user as FirebaseUser);
      navigate("/");
    } catch (error) {
      setError("Incorrect email or password");
      console.log("Login error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          onChange={({ target }) => setEmail(target.value)}
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <br />
        <br />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Log in"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div style={{ marginTop: 50 }}>
        <GoogleOAuth />
      </div>
      <div style={{ marginTop: 50 }}>
        <Link to="/reset-password">Forgot Password?</Link>
      </div>
    </div>
  );
};

export default Login;
