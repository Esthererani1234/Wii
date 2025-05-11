// Sample product data (can be replaced with real imports later)
const products = [
  {
    name: "Wireless Earbuds",
    price: "$19.99",
    image: "https://placehold.co/300x300?text=Wireless+Earbuds",
    description: "Compact Bluetooth earbuds with great sound."
  },
  {
    name: "Smart Watch",
    price: "$24.99",
    image: "https://placehold.co/300x300?text=Smart+Watch",
    description: "Track fitness, calls, and notifications on the go."
  },
  {
    name: "Bluetooth Speaker",
    price: "$29.99",
    image: "https://placehold.co/300x300?text=Bluetooth+Speaker",
    description: "Loud portable speaker with deep bass."
  }
];

// Display products on homepage
function displayProducts(filtered = products) {
  const grid = document.querySelector(".product-grid");
  if (!grid) return;

  grid.innerHTML = "";
  filtered.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>${product.price}</p>
    `;
    card.addEventListener("click", () => {
      localStorage.setItem("selectedProduct", JSON.stringify(product));
      window.location.href = "product.html";
    });
    grid.appendChild(card);
  });
}

// Show selected product in product.html
function displaySingleProduct() {
  const product = JSON.parse(localStorage.getItem("selectedProduct"));
  if (!product) return;

  document.getElementById("productImage").src = product.image;
  document.getElementById("productName").textContent = product.name;
  document.getElementById("productPrice").textContent = product.price;
  document.getElementById("productDescription").textContent = product.description;
}

// Add to Cart
const addToCartBtn = document.getElementById("addToCartBtn");
if (addToCartBtn) {
  addToCartBtn.addEventListener("click", () => {
    const product = JSON.parse(localStorage.getItem("selectedProduct"));
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = cart.find(item => item.name === product.name);

    if (!exists) {
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Added to cart!");
    } else {
      alert("Already in cart.");
    }
  });
}

// Display Cart Page
function displayCart() {
  const cartGrid = document.getElementById("cartItems");
  if (!cartGrid) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartGrid.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cartGrid.innerHTML = "";
  cart.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <h3>${item.name}</h3>
      <p>${item.price}</p>
      <button onclick="removeFromCart(${index})" style="margin-top: 10px; background: red; color: white; border: none; padding: 6px 12px; border-radius: 5px;">Remove</button>
    `;
    cartGrid.appendChild(card);
  });

  const checkout = document.createElement("div");
  checkout.innerHTML = `
    <div style="text-align:center; margin-top: 20px;">
      <a href="checkout.html" style="background: #2d2dff; color: white; padding: 12px 20px; border-radius: 5px; text-decoration: none;">Proceed to Checkout</a>
    </div>
  `;
  cartGrid.appendChild(checkout);
}

// Remove from cart
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

// Search filtering
const searchInput = document.querySelector(".search-box");
if (searchInput) {
  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase();
    const filtered = products.filter(p =>
      p.name.toLowerCase().includes(keyword)
    );
    displayProducts(filtered);
  });
}

// Auto-load correct functions
window.onload = () => {
  if (document.querySelector(".product-grid")) displayProducts();
  if (document.getElementById("productImage")) displaySingleProduct();
  if (document.getElementById("cartItems")) displayCart();
};
