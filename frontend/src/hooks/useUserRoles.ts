import { useState, useEffect, useCallback, useContext } from "react";
import { getUserRolesFromMongo } from "../services/userServices";
import { UserContext } from "../context/UserContext";

export const useUserRoles = () => {
  const { user } = useContext(UserContext);
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const [, setError] = useState("");

  const fetchUserRoles = useCallback(async () => {
    if (user) {
      try {
        const roles = await getUserRolesFromMongo(user.uid);
        setUserRoles(roles);
      } catch (error) {
        setError("Error fetching user role");
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) fetchUserRoles();
  }, [user, fetchUserRoles]);

  return userRoles;
};
