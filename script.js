// Sample product data (placeholder until AliExpress integration)
const products = [
  {
    name: "Wireless Earbuds",
    price: "$19.99",
    image: "https://placehold.co/300x300?text=Wireless+Earbuds",
    description: "These are sample Wireless Earbuds. Real listings will load here from AliExpress."
  },
  {
    name: "Smart Watch",
    price: "$24.99",
    image: "https://placehold.co/300x300?text=Smart+Watch",
    description: "This Smart Watch is a placeholder item. It will be replaced with live data from suppliers."
  },
  {
    name: "Bluetooth Speaker",
    price: "$29.99",
    image: "https://placehold.co/300x300?text=Bluetooth+Speaker",
    description: "Sample Bluetooth Speaker for layout. Real data will be fetched later."
  }
];

// Display all products on homepage
function displayProducts(filteredList = products) {
  const grid = document.querySelector(".product-grid");
  if (!grid) return;

  grid.innerHTML = "";
  filteredList.forEach(product => {
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

// Show selected product on product.html
function displaySingleProduct() {
  const product = JSON.parse(localStorage.getItem("selectedProduct"));
  if (!product) return;

  document.querySelector(".product-img").src = product.image;
  document.querySelector("h2").textContent = product.name;
  document.querySelector(".product-price").textContent = product.price;
  document.querySelector(".product-description").textContent = product.description;
}

// Add to cart
const addToCartBtn = document.getElementById("addToCartBtn");
if (addToCartBtn) {
  addToCartBtn.addEventListener("click", () => {
    const product = JSON.parse(localStorage.getItem("selectedProduct"));
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = cart.find(item => item.name === product.name);
    if (!exists) {
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Added to cart!");
    } else {
      alert("This item is already in your cart.");
    }
  });
}

// Display cart contents
function displayCart() {
  const cartContainer = document.getElementById("cartItems");
  if (!cartContainer) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cartContainer.innerHTML = "";
  cart.forEach(item => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <h3>${item.name}</h3>
      <p>${item.price}</p>
    `;
    cartContainer.appendChild(div);
  });
}

// Auto-run based on page
window.onload = () => {
  if (document.querySelector(".product-grid")) displayProducts();
  if (document.querySelector(".product-detail")) displaySingleProduct();
  if (document.querySelector("#cartItems")) displayCart();

  const searchInput = document.querySelector(".search-box");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const keyword = searchInput.value.toLowerCase();
      const filtered = products.filter(p => p.name.toLowerCase().includes(keyword));
      displayProducts(filtered);
    });
  }
};
