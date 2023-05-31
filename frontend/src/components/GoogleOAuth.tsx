import { useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { addUserToMongo, getUserFromMongo } from "../services/userServices";

const GoogleOAuth = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = signInWithPopup(auth, provider);
      const user = (await result).user;
      const existingUser = await getUserFromMongo(user.uid);
      if (!existingUser) {
        addUserToMongo(
          user.uid,
          user.email!,
          user.displayName!,
          ["user"],
          user.metadata.creationTime!
        );
      }
      navigate("/");
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  return (
    <div>
      <h4>Google OAuth</h4>
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  );
};

export default GoogleOAuth;
