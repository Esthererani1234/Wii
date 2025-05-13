document.addEventListener("DOMContentLoaded", () => {
  const productGrid = document.querySelector(".product-grid");

  const demoProducts = [
    {
      id: 1,
      name: "Wireless Earbuds",
      price: "$19.99",
      image: "https://via.placeholder.com/300x300.png?text=Earbuds"
    },
    {
      id: 2,
      name: "Smart Watch",
      price: "$29.99",
      image: "https://via.placeholder.com/300x300.png?text=Smart+Watch"
    },
    {
      id: 3,
      name: "Phone Stand",
      price: "$7.49",
      image: "https://via.placeholder.com/300x300.png?text=Phone+Stand"
    },
    {
      id: 4,
      name: "Mini Humidifier",
      price: "$14.99",
      image: "https://via.placeholder.com/300x300.png?text=Humidifier"
    },
    {
      id: 5,
      name: "LED Desk Lamp",
      price: "$23.99",
      image: "https://via.placeholder.com/300x300.png?text=Desk+Lamp"
    },
    {
      id: 6,
      name: "Fitness Tracker",
      price: "$34.99",
      image: "https://via.placeholder.com/300x300.png?text=Fitness+Tracker"
    }
  ];

  demoProducts.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productGrid.appendChild(card);
  });
});

function addToCart(productId) {
  alert("Product " + productId + " added to cart!");
}
