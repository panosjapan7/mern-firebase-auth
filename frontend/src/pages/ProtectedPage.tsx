import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getUserRolesFromMongo } from "../services/userServices";
import { fire } from "../fire";
import { User } from "@firebase/auth-types";

const ProtectedPage: React.FC = () => {
  const navigate = useNavigate();
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState<User | null>(null);

  fire.auth().onAuthStateChanged((user) => {
    user ? setIsLoggedIn(true) : setIsLoggedIn(false);
    setLoggedUser(user);
    setIsLoading(false);
  });

  const fetchUserRoles = useCallback(async () => {
    if (loggedUser) {
      try {
        const roles = await getUserRolesFromMongo(loggedUser.uid);
        setUserRoles(roles);
      } catch (error) {
        setError("Error fetching user role");
      }
    }
  }, [loggedUser]);

  useEffect(() => {
    if (loggedUser) fetchUserRoles();
  }, [loggedUser, fetchUserRoles]);

  useEffect(() => {
    if (isLoggedIn && userRoles.length > 0 && !userRoles.includes("admin")) {
      navigate("/");
    }
  }, [isLoggedIn, userRoles, navigate]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  console.log("Run once");

  return (
    <div style={{ textAlign: "center" }}>
      <h1>ProtectedPage</h1>
      {isLoggedIn && <p>Only logged-in users see this</p>}

      {userRoles.includes("admin") && <p>Only logged-in admins see this</p>}
    </div>
  );
};

export default ProtectedPage;
