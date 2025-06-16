document.addEventListener("DOMContentLoaded", function () {
    const wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];
    const container = document.getElementById("wishlistItems");
  
    if (wishlistItems.length === 0) {
      container.innerHTML = "<p>Your wishlist is empty.</p>";
      return;
    }
  
    wishlistItems.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";
  
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>${product.brand}</p>
        <p>Price: ${product.price} TZS</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;
  
      container.appendChild(card);
    });
  });
  
  function addToCart(productId) {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const product = wishlist.find(p => p.id === productId);
  
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
  
    alert("Product added to cart!");
  }
  
