const products = [
  { name: "Wireless Earbuds", price: "$19.99", image: "https://placehold.co/300x300?text=Wireless+Earbuds" },
  { name: "Smart Watch", price: "$29.99", image: "https://placehold.co/300x300?text=Smart+Watch" },
  { name: "Phone Stand", price: "$7.49", image: "https://placehold.co/300x300?text=Phone+Stand" },
  { name: "Mini Humidifier", price: "$14.99", image: "https://placehold.co/300x300?text=Mini+Humidifier" },
  { name: "LED Desk Lamp", price: "$23.99", image: "https://placehold.co/300x300?text=LED+Desk+Lamp" },
  { name: "Fitness Tracker", price: "$34.99", image: "https://placehold.co/300x300?text=Fitness+Tracker" }
];

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const uniqueItems = new Set(cart.map(item => item.name));
  const countElement = document.querySelector(".cart-count");
  if (countElement) countElement.textContent = uniqueItems.size;
}

function displayProducts(filteredList = products) {
  const productGrid = document.querySelector(".product-grid");
  if (!productGrid) return;
  productGrid.innerHTML = "";

  filteredList.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>${product.price}</p>
      <button onclick='addToCart(${JSON.stringify(product)})'>Add to Cart</button>
    `;
    productGrid.appendChild(card);
  });
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const exists = cart.find(item => item.name === product.name);
  if (!exists) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    showToast("Item added to cart");
  } else {
    showToast("Item already in cart");
  }
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}

document.addEventListener("DOMContentLoaded", () => {
  displayProducts();
  updateCartCount();
});
