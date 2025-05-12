// Sample product data (to be replaced with AliExpress API data later)
const products = [
  {
    name: "Wireless Earbuds",
    price: "$19.99",
    image: "https://placehold.co/300x300?text=Wireless+Earbuds",
    description: "These are sample Wireless Earbuds. When we integrate AliExpress later, real details will appear."
  },
  {
    name: "Smart Watch",
    price: "$24.99",
    image: "https://placehold.co/300x300?text=Smart+Watch",
    description: "This Smart Watch is a placeholder item. Real data will come from AliExpress."
  },
  {
    name: "Bluetooth Speaker",
    price: "$29.99",
    image: "https://placehold.co/300x300?text=Bluetooth+Speaker",
    description: "Sample Bluetooth Speaker used for layout purposes."
  }
];

// Render products on homepage
function displayProducts(filtered = products) {
  const grid = document.querySelector(".product-grid");
  if (!grid) return;
  grid.innerHTML = "";

  filtered.forEach(product => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.price}</p>
      <button onclick="viewProduct('${product.name}')">View</button>
    `;
    grid.appendChild(div);
  });
}

// Store product to view in localStorage
function viewProduct(name) {
  const product = products.find(p => p.name === name);
  if (product) {
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    window.location.href = "product.html";
  }
}

// Display product on product.html
function displayProductDetails() {
  const product = JSON.parse(localStorage.getItem("selectedProduct"));
  if (!product) return;

  const container = document.querySelector(".product-detail");
  if (!container) return;

  container.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h2>${product.name}</h2>
    <p class="price">${product.price}</p>
    <p class="description">${product.description}</p>
    <button onclick="addToCart()">Add to Cart</button>
    <br><br>
    <a href="index.html">← Back to Home</a>
  `;
}

// Add product to cart
function addToCart() {
  const product = JSON.parse(localStorage.getItem("selectedProduct"));
  if (!product) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const exists = cart.find(item => item.name === product.name);
  if (!exists) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
  } else {
    alert("Item already in cart.");
  }
}

// Load and show cart items
function displayCart() {
  const container = document.getElementById("cartItems");
  if (!container) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  container.innerHTML = "";
  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>${item.price}</p>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    container.appendChild(div);
  });
}

// Remove item by index
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// Init
if (document.querySelector(".product-grid")) displayProducts();
if (document.querySelector(".product-detail")) displayProductDetails();
if (document.querySelector("#cartItems")) displayCart();
