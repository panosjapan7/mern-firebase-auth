import React, { useContext, useState } from "react";
import { fire } from "../fire";
import { User as FirebaseUser } from "firebase/auth";
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
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Register the user with Firebase authentication
    try {
      if (password.length < 6) {
        setPassword("");
        throw new Error("Password should be at least 6 characters long");
      }
      setIsLoading(true);
      const trimmedEmail = email.trim();
      const userCredential = await fire
        .auth()
        .createUserWithEmailAndPassword(trimmedEmail, password);
      const registeredUser = userCredential.user;

      const firebaseUser = fire.auth().currentUser;

      // Send email verification
      await firebaseUser?.sendEmailVerification();

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

      setUser(registeredUser as FirebaseUser);
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      const errorMessage = (error as Error).message;
      setError(errorMessage);
      console.log("Registration error: ", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
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
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <GoogleOAuth />
      </div>
    </div>
  );
};

export default Register;
