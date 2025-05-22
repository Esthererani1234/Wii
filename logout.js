// Firebase configuration — replace with your actual values
const firebaseConfig = {
  apiKey: "AIzaSyBtbaGNzL0Pi4T39_tTa_jSUcKinKL0NBc",
  authDomain: "workedin-site.firebaseapp.com",
  projectId: "workedin-site",
  appId: "1:1234567890:web:your-app-id"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Protect profile.html
auth.onAuthStateChanged((user) => {
  if (!user) {
    window.location.href = "login.html";
  }
});

// Logout button function
function logout() {
  auth.signOut().then(() => {
    window.location.href = "login.html";
  });
}
