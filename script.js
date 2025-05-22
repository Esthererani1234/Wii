const products = [
  {
    name: "Wireless Earbuds",
    price: "$19.99",
    image: "https://placehold.co/150x150?text=Wireless+Earbuds"
  },
  {
    name: "Smart Watch",
    price: "$29.99",
    image: "https://placehold.co/150x150?text=Smart+Watch"
  },
  {
    name: "Phone Stand",
    price: "$7.49",
    image: "https://placehold.co/150x150?text=Phone+Stand"
  },
  {
    name: "Mini Humidifier",
    price: "$14.99",
    image: "https://placehold.co/150x150?text=Mini+Humidifier"
  },
  {
    name: "LED Desk Lamp",
    price: "$23.99",
    image: "https://placehold.co/150x150?text=LED+Desk+Lamp"
  },
  {
    name: "Fitness Tracker",
    price: "$34.99",
    image: "https://placehold.co/150x150?text=Fitness+Tracker"
  }
];

// Display products on homepage
function displayProducts(list = products) {
  const grid = document.querySelector(".product-grid");
  if (!grid) return;
  grid.innerHTML = "";
  list.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.price}</p>
      <button onclick='addToCart(${JSON.stringify(product)})'>Add to Cart</button>
    `;
    grid.appendChild(card);
  });
}

// Add to cart logic
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(item => item.name === product.name);
  if (existing) {
    existing.quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  showToast("Item added to cart");
  updateCartCount();
}

// Render cart on cart.html
function renderCart() {
  const cartContainer = document.getElementById("cartItems");
  if (!cartContainer) return;
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartContainer.innerHTML = cart.length === 0
    ? "<p>Your cart is empty.</p>"
    : "";
  let total = 0;
  cart.forEach(item => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>${item.price}</p>
      <p>Qty: ${item.quantity}</p>
    `;
    cartContainer.appendChild(card);
    total += parseFloat(item.price.replace("$", "")) * item.quantity;
  });
  const totalEl = document.getElementById("totalPrice");
  if (totalEl) {
    totalEl.textContent = `Total: $${total.toFixed(2)}`;
  }
}

// Update cart count globally
function updateCartCount() {
  const countSpan = document.querySelector(".cart-count");
  if (!countSpan) return;
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  countSpan.textContent = cart.length;
}

// Toast message
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

// Load functions on page load
document.addEventListener("DOMContentLoaded", () => {
  displayProducts();
  renderCart();
  updateCartCount();
});
