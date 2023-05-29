import React, { useContext, useState } from "react";
import { fire } from "../fire";
import { User } from "@firebase/auth-types";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Register = () => {
  const { setUser } = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);

  const navigate = useNavigate();

  let adminUID = "panos";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Register the user with Firebase authentication
    let registeredUser: User | null = null;

    try {
      fire
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const registeredUser = userCredential.user;
          const uid = registeredUser?.uid; // Retrieve the UID of the signed-up user

          let firebaseUser = fire.auth().currentUser;
          return firebaseUser?.updateProfile({
            displayName: name,
          });
        })
        .then(() => {
          setUser(registeredUser);
          navigate("/");
        });
    } catch (error) {
      setError("Error registering the user");
      console.log("Registration error: ", error);
    }
  };
  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={({ target }) => setName(target.value)}
          required={true}
        />
        <br />
        <br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          required={true}
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          required={true}
        />
        <br />
        <br />
        <button type="submit">Register</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Register;
