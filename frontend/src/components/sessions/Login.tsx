import React, { useState } from "react";
import { fire } from "../../fire";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`submitted email: ${email}, submitted password: ${password}`);
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log("Incorrect name or password");
      });
  };
  return (
    <div>
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
    </div>
  );
};

export default Login;
