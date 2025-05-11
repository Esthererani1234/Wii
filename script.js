// Sample product data (placeholder until real AliExpress data is integrated)
const products = [
  {
    name: "Wireless Earbuds",
    price: "$19.99",
    image: "https://via.placeholder.com/150",
    description: "These are sample Wireless Earbuds. When we integrate AliExpress later, real descriptions will appear here."
  },
  {
    name: "Smart Watch",
    price: "$24.99",
    image: "https://via.placeholder.com/150",
    description: "This Smart Watch is a placeholder item. It will be replaced with live data from AliExpress."
  },
  {
    name: "Bluetooth Speaker",
    price: "$29.99",
    image: "https://via.placeholder.com/150",
    description: "Sample Bluetooth Speaker to demonstrate layout. Actual product details will load soon."
  }
];

// Function to display all products on index.html
function displayProducts(filteredList = products) {
  const productGrid = document.querySelector(".product-grid");
  if (!productGrid) return;

  productGrid.innerHTML = ""; // Clear previous items

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

// Function to show single product details in product.html
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

// Auto-detect which page we’re on
window.onload = () => {
  if (document.querySelector(".product-grid")) {
    displayProducts();
  } else if (document.querySelector(".product-detail")) {
    displaySingleProduct();
  }

  // Live product search on homepage
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
};
