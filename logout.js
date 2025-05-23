// Logout function
function logout() {
  firebase.auth().signOut().then(() => {
    window.location.href = "login.html";
  }).catch((error) => {
    alert("Error logging out: " + error.message);
  });
}
