// Sample products (replace with real ones later)
const products = [
  {
    id: 1,
    name: "Summer Floral Dress",
    price: 24.99,
    image: "https://via.placeholder.com/300x300.png?text=Product+1"
  },
  {
    id: 2,
    name: "Men's Graphic Tee",
    price: 19.99,
    image: "https://via.placeholder.com/300x300.png?text=Product+2"
  },
  {
    id: 3,
    name: "Bluetooth Earbuds",
    price: 15.99,
    image: "https://via.placeholder.com/300x300.png?text=Product+3"
  },
  {
    id: 4,
    name: "Wireless LED Lamp",
    price: 12.50,
    image: "https://via.placeholder.com/300x300.png?text=Product+4"
  }
];

// Load homepage products
function renderProducts() {
  const list = document.getElementById("productList");
  if (!list) return;
  list.innerHTML = "";
  products.forEach((p) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}" />
      <h4>${p.name}</h4>
      <p>$${p.price.toFixed(2)}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    list.appendChild(card);
  });
}

// Cart Logic
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartIcon() {
  const count = getCart().length;
  const badge = document.getElementById("cartCount");
  if (badge) badge.innerText = count;
}

function showToast(message) {
  const msg = document.createElement("div");
  msg.innerText = message;
  msg.style.position = "fixed";
  msg.style.bottom = "20px";
  msg.style.left = "50%";
  msg.style.transform = "translateX(-50%)";
  msg.style.background = "#00bcd4";
  msg.style.color = "white";
  msg.style.padding = "10px 20px";
  msg.style.borderRadius = "5px";
  msg.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 2000);
}

function addToCart(productId) {
  const cart = getCart();
  cart.push(productId);
  saveCart(cart);
  updateCartIcon();
  showToast("Item added to cart");
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateCartIcon();
});
