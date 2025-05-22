// Update cart counter (shows how many unique items in cart)
function updateCartCounter() {
  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  const count = Object.keys(cart).length;
  const counter = document.querySelector(".cart-count");
  if (counter) {
    counter.textContent = count;
  }
}

// Add product to cart
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || {};
  const existing = cart[product.id];

  if (existing) {
    existing.qty += 1;
  } else {
    cart[product.id] = {
      ...product,
      qty: 1
    };
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  showToast("Item added to cart");
  updateCartCounter();
}

// Show toast message
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// Load sample products (can be replaced with dynamic import later)
function loadProducts() {
  const products = [
    {
      id: 101,
      name: "Wireless Earbuds",
      price: 24.99,
      image: "https://via.placeholder.com/300?text=Earbuds"
    },
    {
      id: 102,
      name: "Smartwatch",
      price: 49.99,
      image: "https://via.placeholder.com/300?text=Smartwatch"
    },
    {
      id: 103,
      name: "Phone Stand",
      price: 9.99,
      image: "https://via.placeholder.com/300?text=Stand"
    }
  ];

  const productGrid = document.getElementById("productGrid");
  if (!productGrid) return;

  productGrid.innerHTML = "";
  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>$${product.price.toFixed(2)}</p>
      <button onclick='addToCart(${JSON.stringify(product)})'>Add to Cart</button>
    `;
    productGrid.appendChild(card);
  });
}

// Run on page load
document.addEventListener("DOMContentLoaded", () => {
  updateCartCounter();
  if (document.getElementById("productGrid")) {
    loadProducts();
  }
});
