import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const app = firebase.initializeApp({
  apiKey: "AIzaSyDfJWycWlrVXud3r0C3mQzXt8xlPWJoHXg",
  authDomain: "proyecto-react-95ffd.firebaseapp.com",
  databaseURL: "https://proyecto-react-95ffd-default-rtdb.firebaseio.com",
  projectId: "proyecto-react-95ffd",
  storageBucket: "proyecto-react-95ffd.appspot.com",
  messagingSenderId: "89824395465",
  appId: "1:89824395465:web:756f8607e9d7acf2110d18",
});

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const githubAuthProvider = new firebase.auth.GithubAuthProvider();

export { app, googleAuthProvider, githubAuthProvider };
