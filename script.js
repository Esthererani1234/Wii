// Sample product data (placeholder until real AliExpress data is integrated)
const products = [
  {
    name: "Wireless Earbuds",
    price: "$19.99",
    image: "https://via.placeholder.com/150",
    description: "These are sample Wireless Earbuds with high-quality sound and sleek design."
  },
  {
    name: "Smart Watch",
    price: "$24.99",
    image: "https://via.placeholder.com/150",
    description: "A stylish Smart Watch with fitness tracking and message notifications."
  },
  {
    name: "Bluetooth Speaker",
    price: "$29.99",
    image: "https://via.placeholder.com/150",
    description: "Portable Bluetooth speaker with powerful bass and long battery life."
  }
];

// Function to render products to the product grid
function displayProducts() {
  const productGrid = document.querySelector(".product-grid");
  if (!productGrid) return;

  productGrid.innerHTML = "";

  products.forEach((product, index) => {
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

// Function to display a single product in product.html
function displayProducts(filteredList = products) {
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

// Detect which page we're on
window.onload = () => {
  if (document.querySelector(".product-grid")) {
    displayProducts();
  } else if (document.querySelector(".product-detail")) {
    displaySingleProduct();
  }
};
const searchInput = document.querySelector(".search-box");

if (searchInput) {
  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase();
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(keyword)
    );
    displayProducts(filtered);
  });
}
