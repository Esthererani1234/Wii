// Dummy products (replace later with real imports from AliExpress)
const products = [
  {
    id: 1,
    name: "Wireless Earbuds",
    price: 19.99,
    image: "https://via.placeholder.com/300x200?text=Earbuds"
  },
  {
    id: 2,
    name: "Smartwatch",
    price: 29.99,
    image: "https://via.placeholder.com/300x200?text=Smartwatch"
  },
  {
    id: 3,
    name: "LED Desk Lamp",
    price: 14.99,
    image: "https://via.placeholder.com/300x200?text=Desk+Lamp"
  },
  {
    id: 4,
    name: "USB Wall Charger",
    price: 9.99,
    image: "https://via.placeholder.com/300x200?text=Charger"
  }
];

function loadProducts() {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  grid.innerHTML = products.map(product => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}">
      <div class="product-details">
        <h4>${product.name}</h4>
        <p>$${product.price.toFixed(2)}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    </div>
  `).join('');
}

function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function setCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

function addToCart(id) {
  const cart = getCart();
  const item = cart.find(p => p.id === id);

  if (item) {
    item.qty += 1;
  } else {
    const product = products.find(p => p.id === id);
    cart.push({ ...product, qty: 1 });
  }

  setCart(cart);
  showToast("Item added to cart");
}

function updateCartCount() {
  const cart = getCart();
  const count = cart.length;
  const countEl = document.querySelector(".cart-count");
  if (countEl) countEl.textContent = count;
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

// Run on load
document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  updateCartCount();
});
