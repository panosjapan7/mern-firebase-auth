// import firebase from "firebase/app";
// import "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6zMIvLeHf9l3b932fjtjddQ0BJs_ogss",
  authDomain: "mern-with-firebase-auth.firebaseapp.com",
  projectId: "mern-with-firebase-auth",
  storageBucket: "mern-with-firebase-auth.appspot.com",
  messagingSenderId: "197871849498",
  appId: "1:197871849498:web:aead4062a73f18a1ee41a3",
};

try {
  firebase.initializeApp(firebaseConfig);
} catch (error: any) {
  if (!/already exists/.test(error.message)) {
    console.log("Firebase initialization error", error.stack);
  }
}

// const fire = firebase.auth();
export const fire = firebase;
// export const auth = firebase.auth();
// export default fire;
