// Sample products
const products = [
  {
    id: 1,
    name: "Glow Hydration Serum",
    price: 12.99,
    image: "https://via.placeholder.com/300x300?text=Glow+Serum"
  },
  {
    id: 2,
    name: "Rejuvenating Eye Cream",
    price: 9.99,
    image: "https://via.placeholder.com/300x300?text=Eye+Cream"
  },
  {
    id: 3,
    name: "Matte Velvet Lipstick",
    price: 6.49,
    image: "https://via.placeholder.com/300x300?text=Lipstick"
  },
  {
    id: 4,
    name: "Nourish Face Moisturizer",
    price: 11.99,
    image: "https://via.placeholder.com/300x300?text=Moisturizer"
  }
];

// Load products into a specific section
function loadProducts(sectionId, productList) {
  const grid = document.getElementById(sectionId);
  if (!grid) return;

  productList.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>$${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    grid.appendChild(card);
  });
}

// Add item to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingItem = cart.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCounter();
  showToast("Added to cart");
}

// Update cart counter in header
function updateCartCounter() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const counter = document.getElementById("cart-count");
  if (counter) {
    const uniqueItems = cart.length;
    counter.textContent = uniqueItems;
  }
}

// Show toast notification
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast-message";
  toast.textContent = message;
  Object.assign(toast.style, {
    position: "fixed",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#333",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "4px",
    zIndex: 9999
  });
  document.body.appendChild(toast);
  setTimeout(() => {
    document.body.removeChild(toast);
  }, 2000);
}

// Initial load
window.onload = () => {
  loadProducts("staff-picks", products.slice(0, 2));
  loadProducts("new-arrivals", products.slice(2));
  updateCartCounter();
};
