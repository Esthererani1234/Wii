// Sample product data (placeholder until real AliExpress data is integrated)
const products = [
  {
    name: "Wireless Earbuds",
    price: "$19.99",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "Smart Watch",
    price: "$24.99",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "Bluetooth Speaker",
    price: "$29.99",
    image: "https://via.placeholder.com/150"
  }
];

// Function to render products to the product grid
function displayProducts() {
  const productGrid = document.querySelector(".product-grid");
  productGrid.innerHTML = ""; // Clear previous content

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>${product.price}</p>
    `;
    productGrid.appendChild(card);
  });
}

// Call the function when the page loads
window.onload = displayProducts;
