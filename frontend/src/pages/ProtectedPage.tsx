import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useUserRoles } from "../hooks/useUserRoles";
import { UserContext } from "../context/UserContext";

interface Props {
  isLoggedIn: boolean | null;
}

const ProtectedPage: React.FC<Props> = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const userRoles = useUserRoles();

  useEffect(() => {
    if (isLoggedIn && userRoles.length > 0 && !userRoles.includes("admin")) {
      navigate("/");
    }
  }, [isLoggedIn, userRoles, navigate]);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Admin Page</h1>
      {user && <p>Only logged-in users see this</p>}

      {userRoles?.includes("admin") && <p>Only logged-in admins see this</p>}
    </div>
  );
};

export default ProtectedPage;
