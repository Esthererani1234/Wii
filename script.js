// Sample product data
const products = [
  {
    name: "Wireless Earbuds",
    price: "$19.99",
    image: "https://placehold.co/300x300?text=Wireless+Earbuds",
    description: "These are sample Wireless Earbuds. When we integrate AliExpress later, real descriptions will appear here."
  },
  {
    name: "Smart Watch",
    price: "$24.99",
    image: "https://placehold.co/300x300?text=Smart+Watch",
    description: "This Smart Watch is a placeholder item. It will be replaced with live data from AliExpress."
  },
  {
    name: "Bluetooth Speaker",
    price: "$29.99",
    image: "https://placehold.co/300x300?text=Bluetooth+Speaker",
    description: "Sample Bluetooth Speaker to demonstrate layout. Actual product details will load here later."
  }
];

// Display all products on homepage
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
    `;
    card.addEventListener("click", () => {
      localStorage.setItem("selectedProduct", JSON.stringify(product));
      window.location.href = "product.html";
    });
    productGrid.appendChild(card);
  });
}

// Display selected product in product.html
function displaySingleProduct() {
  const product = JSON.parse(localStorage.getItem("selectedProduct"));
  if (!product) return;

  const image = document.querySelector(".product-img");
  const name = document.querySelector(".product-info h2");
  const price = document.querySelector(".product-price");
  const description = document.querySelector(".product-description");

  if (image) image.src = product.image;
  if (name) name.textContent = product.name;
  if (price) price.textContent = product.price;
  if (description) description.textContent = product.description;
}

// Add to Cart button
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

// Display items in cart.html
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

// Auto-load correct functions
window.onload = () => {
  if (document.querySelector(".product-grid")) displayProducts();
  if (document.querySelector(".product-detail")) displaySingleProduct();
  if (document.getElementById("cartItems")) displayCart();

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
};
