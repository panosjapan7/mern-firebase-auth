import React, { useState } from "react";
import { fire } from "../fire";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | undefined>();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fire.auth().sendPasswordResetEmail(email);
      setEmail("");
      setSuccessMessage("Instructions sent to the email address!");
    } catch (error) {
      console.error("Error sending password reset email:", error);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1 style={{ marginBottom: 50 }}>Reset Password</h1>
      <form onSubmit={handleReset}>
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={({ target }) => setEmail(target.value)}
        />
        <br />
        <br />
        <button type="submit">Reset Password</button>
      </form>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
};

export default ResetPassword;
