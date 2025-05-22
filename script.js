document.addEventListener("DOMContentLoaded", function () {
  const products = [
    {
      id: 1,
      name: "Smart LED Light Strip",
      price: 12.99,
      image: "https://images.unsplash.com/photo-1611224923868-8b0a927cb641",
      description: "Colorful LED strip with remote and music sync.",
      rating: 4,
    },
    {
      id: 2,
      name: "Wireless Earbuds Pro",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1585386959984-a41552262fdd",
      description: "High-quality sound, noise cancellation, long battery.",
      rating: 5,
    },
    {
      id: 3,
      name: "Portable USB Blender",
      price: 17.49,
      image: "https://images.unsplash.com/photo-1606813902409-418d35c6f5b2",
      description: "Blend your smoothies on the go with ease.",
      rating: 3,
    },
    {
      id: 4,
      name: "Mini Desktop Fan",
      price: 9.99,
      image: "https://images.unsplash.com/photo-1583511655826-05700d52f4eb",
      description: "Stay cool while working or gaming.",
      rating: 4,
    },
  ];

  const container = document.getElementById("product-list");
  if (container) {
    container.innerHTML = products
      .map(
        (p) => `
      <div class="product-card" onclick="viewProduct(${p.id})">
        <img src="${p.image}" alt="${p.name}" />
        <h3>${p.name}</h3>
        <p>$${p.price.toFixed(2)}</p>
        <button>Add to Cart</button>
      </div>`
      )
      .join("");
  }

  window.viewProduct = function (id) {
    const selected = products.find((p) => p.id === id);
    localStorage.setItem("selectedProduct", JSON.stringify(selected));
    window.location.href = "product.html";
  };

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.length;
  const counter = document.getElementById("cart-count");
  if (counter) counter.textContent = count;
});
