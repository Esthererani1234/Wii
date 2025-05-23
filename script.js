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

// Load products to homepage
function loadProducts() {
  const grid = document.querySelector(".product-grid");
  if (!grid) return;

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h4>${product.name}</h4>
      <p>$${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    grid.appendChild(card);
  });
}

// Cart logic
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

function updateCartCounter() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const counter = document.querySelector("#cart-count");
  if (counter) {
    counter.innerText = cart.length;
  }
}

function showToast(message) {
  let toast = document.createElement("div");
  toast.innerText = message;
  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.background = "#333";
  toast.style.color = "#fff";
  toast.style.padding = "10px 20px";
  toast.style.borderRadius = "4px";
  toast.style.zIndex = 9999;
  document.body.appendChild(toast);
  setTimeout(() => {
    document.body.removeChild(toast);
  }, 2000);
}

window.onload = () => {
  loadProducts();
  updateCartCounter();
};
