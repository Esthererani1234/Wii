// Dummy product data
const sampleProducts = [
  {
    id: 1,
    name: "Mini Portable Fan",
    price: "$9.99",
    image: "https://via.placeholder.com/200x200.png?text=Fan"
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    price: "$24.95",
    image: "https://via.placeholder.com/200x200.png?text=Earbuds"
  },
  {
    id: 3,
    name: "LED Ring Light",
    price: "$15.49",
    image: "https://via.placeholder.com/200x200.png?text=Ring+Light"
  },
  {
    id: 4,
    name: "Smart Watch Band",
    price: "$6.25",
    image: "https://via.placeholder.com/200x200.png?text=Watch+Band"
  }
];

// Load product cards on homepage
function renderProducts() {
  const productList = document.getElementById("productList");
  if (!productList) return;

  productList.innerHTML = "";

  sampleProducts.forEach(product => {
    const div = document.createElement("div");
    div.classList.add("product-card");
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h4>${product.name}</h4>
      <p>${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(div);
  });
}

// Cart logic
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function setCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCounter() {
  const cartCount = document.getElementById("cartCount");
  const cart = getCart();
  const uniqueItems = cart.length;
  if (cartCount) cartCount.textContent = uniqueItems;
}

function addToCart(productId) {
  const cart = getCart();
  if (!cart.find(item => item.id === productId)) {
    const product = sampleProducts.find(p => p.id === productId);
    cart.push({ id: product.id, name: product.name, qty: 1, price: product.price, image: product.image });
    setCart(cart);
    showToast("Added to cart!");
    updateCartCounter();
  } else {
    showToast("Item already in cart!");
  }
}

// Toast logic
function showToast(msg) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = msg;
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 3000);
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateCartCounter();
});
