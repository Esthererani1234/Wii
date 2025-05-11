// script.js

document.addEventListener("DOMContentLoaded", () => {
  const searchBox = document.querySelector(".search-box");

  if (searchBox) {
    searchBox.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase();
      // In the future, filter real products here
      console.log("Searching for:", query);
    });
  }

  console.log("Homepage script loaded");
});
