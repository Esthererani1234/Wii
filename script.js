// Sample product data (placeholder until real AliExpress data is integrated)
const products = [
  {
    name: "Wireless Earbuds",
    price: "$19.99",
    image: "https://via.placeholder.com/150",
    description: "These are sample Wireless Earbuds. We'll load real descriptions later."
  },
  {
    name: "Smart Watch",
    price: "$24.99",
    image: "https://via.placeholder.com/150",
    description: "Sample Smart Watch. Stylish and functional."
  },
  {
    name: "Bluetooth Speaker",
    price: "$29.99",
    image: "https://via.placeholder.com/150",
    description: "Sample Bluetooth Speaker. Crisp sound and deep bass."
  }
];

// Function to render products to the homepage
function displayProducts() {
  const productGrid = document.querySelector(".product-grid");
  if (!productGrid) return;

  productGrid.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>${product.price}</p>
    `;
    card.onclick = () => {
      localStorage.setItem("selectedProduct", JSON.stringify(product));
      window.location.href = "product.html";
    };
    productGrid.appendChild(card);
  });
}

// Function to show selected product on product.html
function showProductDetail() {
  const product = JSON.parse(localStorage.getItem("selectedProduct"));
  if (!product) return;

  const detailBox = document.querySelector(".product-box");
  if (detailBox) {
    detailBox.querySelector(".product-img").src = product.image;
    detailBox.querySelector(".product-img").alt = product.name;
    detailBox.querySelector(".product-info h2").textContent = product.name;
    detailBox.querySelector(".product-price").textContent = product.price;
    detailBox.querySelector(".product-description").textContent = product.description;
  }
}

// Auto-run based on page
window.onload = () => {
  if (document.querySelector(".product-grid")) {
    displayProducts();
  } else if (document.querySelector(".product-detail")) {
    showProductDetail();
  }
};
