// script.js

// Sample products
const products = [
  {
    id: 1,
    name: "Mini Portable Fan",
    price: 9.99,
    image: "https://via.placeholder.com/150?text=Fan"
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    price: 24.95,
    image: "https://via.placeholder.com/150?text=Earbuds"
  },
  {
    id: 3,
    name: "LED Ring Light",
    price: 15.49,
    image: "https://via.placeholder.com/150?text=Ring+Light"
  },
  {
    id: 4,
    name: "Smart Watch Band",
    price: 6.25,
    image: "https://via.placeholder.com/150?text=Watch+Band"
  }
];

// Render product cards
function displayProducts() {
  const container = document.querySelector(".product-grid");
  if (!container) return;

  container.innerHTML = "";
  products.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>$${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    container.appendChild(card);
  });
}

// Add item to cart
function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || {};
  cart[productId] = (cart[productId] || 0) + 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showToast("Item added to cart");
}

// Update cart number
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  const count = Object.keys(cart).length;
  const countSpan = document.querySelector(".cart-count");
  if (countSpan) countSpan.textContent = count;
}

// Show toast
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// Initial load
document.addEventListener("DOMContentLoaded", () => {
  displayProducts();
  updateCartCount();
});
