import React, { useContext, useState } from "react";
import { fire } from "../fire";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { addUserToMongo } from "../services/userServices";
import GoogleOAuth from "../components/GoogleOAuth";

const Register = () => {
  const { setUser } = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Register the user with Firebase authentication
    try {
      const userCredential = await fire
        .auth()
        .createUserWithEmailAndPassword(email, password);
      const registeredUser = userCredential.user;

      const firebaseUser = fire.auth().currentUser;
      await firebaseUser?.updateProfile({
        displayName: name,
      });

      addUserToMongo(
        registeredUser?.uid,
        registeredUser?.email!,
        registeredUser?.displayName!,
        ["user"],
        registeredUser?.metadata.creationTime!
      );

      setUser(registeredUser);
      navigate("/");
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
      <div>
        <GoogleOAuth />
      </div>
    </div>
  );
};

export default Register;
