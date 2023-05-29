import React, { useState } from "react";
import { fire } from "../../fire";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);

  const navigate = useNavigate();

  let adminUID = "panos";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Register the user with Firebase authentication
    try {
      fire
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Add custom logic to assign a default role to the user
          const user = userCredential.user;
          const uid = user?.uid; // Retrieve the UID of the signed-up user

          let role = "user"; // Set default role

          if (uid === adminUID) {
            role = "admin";
          } else {
            role = "user";
          }

          const customClaims = {
            role: role,
            displayName: name,
          };

          let firebaseUser = fire.auth().currentUser;
          firebaseUser?.updateProfile({
            displayName: name,
          });

          console.log("User registered with default role: ", user);
        });
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
    </div>
  );
};

export default Register;
