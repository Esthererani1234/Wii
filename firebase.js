import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDElIYW5-gZGJTH--ORVD1xKyjeRyJh96c",
  authDomain: "workedin-38aa3.firebaseapp.com",
  projectId: "workedin-38aa3",
  storageBucket: "workedin-38aa3.appspot.com",
  messagingSenderId: "305634639635",
  appId: "1:305634639635:web:9350cc6235e83064f424e6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
