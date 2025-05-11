document.addEventListener("DOMContentLoaded", () => {
  const searchBox = document.querySelector(".search-box");
  const productCards = document.querySelectorAll(".product-card");

  searchBox.addEventListener("input", () => {
    const query = searchBox.value.toLowerCase();

    productCards.forEach((card) => {
      const productName = card.querySelector("h3").innerText.toLowerCase();
      const productVisible = productName.includes(query);
      card.style.display = productVisible ? "block" : "none";
    });
  });
});
