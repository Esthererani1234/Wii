const products = [
  {
    id: 1,
    name: "Bluetooth Earbuds",
    price: 14.99,
    image: "https://via.placeholder.com/300?text=Earbuds"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 29.99,
    image: "https://via.placeholder.com/300?text=Smart+Watch"
  },
  {
    id: 3,
    name: "Wireless Charger",
    price: 9.99,
    image: "https://via.placeholder.com/300?text=Wireless+Charger"
  },
  {
    id: 4,
    name: "Phone Stand",
    price: 4.99,
    image: "https://via.placeholder.com/300?text=Phone+Stand"
  }
];

// Render products on the homepage
const productGrid = document.getElementById("productGrid");
if (productGrid) {
  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>$${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productGrid.appendChild(card);
  });
}

// Add to Cart
function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || {};
  if (cart[productId]) {
    cart[productId].qty += 1;
  } else {
    const product = products.find(p => p.id === productId);
    cart[productId] = { ...product, qty: 1 };
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  showToast("Item added to cart");
  updateCartCounter();
}

// Show toast
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// Update cart count
function updateCartCounter() {
  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  const count = Object.keys(cart).length;
  const counter = document.querySelector(".cart-count");
  if (counter) {
    counter.textContent = count;
  }
}

// Initialize cart count on page load
document.addEventListener("DOMContentLoaded", () => {
  updateCartCounter();
});
