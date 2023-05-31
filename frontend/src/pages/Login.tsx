import React, { useState, useContext } from "react";
import { fire } from "../fire";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import GoogleOAuth from "../components/GoogleOAuth";

const Login = () => {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      fire
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setUser(user);
        });

      navigate("/");
    } catch (error) {
      setError("Incorrect email or password");
      console.log("Login error: ", error);
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
        <button type="submit">Sign in</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div style={{ marginTop: 50 }}>
        <GoogleOAuth />
      </div>
    </div>
  );
};

export default Login;
