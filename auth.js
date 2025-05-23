// auth.js

// Your Firebase config from the screenshot
const firebaseConfig = {
  apiKey: "AIzaSyCT2LnLUDoVhvYA5R0kB5BhJTHzIUx1xSA",
  authDomain: "workedin-38aa3.firebaseapp.com",
  projectId: "workedin-38aa3",
  storageBucket: "workedin-38aa3.appspot.com",
  messagingSenderId: "305634639635",
  appId: "1:305634639635:web:9350cc6235e83064f424e6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Login with email
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.signInWithEmailAndPassword(email, password)
    .then(() => window.location.href = "profile.html")
    .catch(error => alert(error.message));
}

// Signup with email
function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => window.location.href = "profile.html")
    .catch(error => alert(error.message));
}

// Login with Google
function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(() => window.location.href = "profile.html")
    .catch(error => alert(error.message));
}
