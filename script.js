document.addEventListener("DOMContentLoaded", () => {
  const productGrid = document.querySelector(".product-grid");
  const cartCount = document.getElementById("cart-count");
  const cartItemsContainer = document.getElementById("cartItems");
  const productDetailContainer = document.getElementById("productDetail");

  const demoProducts = [
    {
      id: 1,
      name: "Wireless Earbuds",
      price: 19.99,
      image: "https://via.placeholder.com/300x300.png?text=Earbuds",
      description: "Bluetooth earbuds with high-quality sound.",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 29.99,
      image: "https://via.placeholder.com/300x300.png?text=Smart+Watch",
      description: "Fitness tracking and smart notifications.",
    },
    {
      id: 3,
      name: "Phone Stand",
      price: 7.49,
      image: "https://via.placeholder.com/300x300.png?text=Phone+Stand",
      description: "Adjustable stand for smartphones and tablets.",
    }
  ];

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cartCount) cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  function addToCart(id) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = demoProducts.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(`${product.name} added to cart.`);
  }

  window.addToCart = addToCart;

  function loadCartPage() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;
    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = cart.map(item => {
      const itemTotal = item.quantity * item.price;
      total += itemTotal;
      return `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" />
          <div>
            <h4>${item.name}</h4>
            <p>Price: $${item.price.toFixed(2)}</p>
            <p>Quantity: ${item.quantity}</p>
          </div>
        </div>
      `;
    }).join("");

    document.getElementById("cartTotal").textContent = `$${total.toFixed(2)}`;
  }

  function loadProductPage() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));
    const product = demoProducts.find(p => p.id === id);
    if (!product || !productDetailContainer) return;

    productDetailContainer.innerHTML = `
      <div class="product-detail-flex">
        <img src="${product.image}" alt="${product.name}" />
        <div class="product-info">
          <h2>${product.name}</h2>
          <p class="product-price">$${product.price.toFixed(2)}</p>
          <p>${product.description}</p>
          <input type="number" id="quantity" min="1" value="1" />
          <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
      </div>
    `;
  }

  // Init based on page
  if (productGrid) {
    demoProducts.forEach(product => {
      const card = document.createElement("div");
      card.classList.add("product-card");
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>$${product.price.toFixed(2)}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;
      productGrid.appendChild(card);
    });
  }

  updateCartCount();
  loadCartPage();
  loadProductPage();
});
