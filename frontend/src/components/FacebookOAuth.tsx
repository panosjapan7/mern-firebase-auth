import { useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, FacebookAuthProvider } from "firebase/auth";

const FacebookOAuth = () => {
  const navigate = useNavigate();

  const handleFacebookLogin = async () => {
    const auth = getAuth();
    const provider = new FacebookAuthProvider();

    try {
      const result = signInWithPopup(auth, provider);
      const user = (await result).user;
      navigate("/");
    } catch (error) {
      console.error("Facebook login error:", error);
    }
  };
  return (
    <div>
      <h4>FacebookOAuth</h4>
      <button onClick={handleFacebookLogin}>Login with Facebook</button>
    </div>
  );
};

export default FacebookOAuth;
