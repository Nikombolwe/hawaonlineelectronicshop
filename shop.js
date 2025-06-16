document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
  
    // Get products from localStorage (added by admin)
    const products = JSON.parse(localStorage.getItem('products')) || [];
  
    // Get or initialize cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    function renderProducts() {
      // If no products
      if (products.length === 0) {
        productList.innerHTML = '<p>No products available.</p>';
        return;
      }
  
      // Clear current view
      productList.innerHTML = '';
  
      // Loop through each product and create UI
      products.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
  
        productDiv.innerHTML = `
  <img src="${product.image}" alt="${product.name}" />
  <h3>${product.name}</h3>
  <p>Brand: ${product.brand}</p>
  <p>Price: TZS ${product.price}</p>
  <button class="add-to-cart-btn">Add to Cart</button>
  <button class="add-to-wishlist-btn">Add to Wishlist</button>
`;

  
        // Add to Cart functionality
        productDiv.querySelector('.add-to-cart-btn').addEventListener('click', () => {
          cart.push(product);
          localStorage.setItem('cart', JSON.stringify(cart));
          alert(`${product.name} has been added to your cart.`);
        });
        // Add to Wishlist functionality
productDiv.querySelector('.add-to-wishlist-btn').addEventListener('click', () => {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    const exists = wishlist.find(item => item.name === product.name);
    
    if (!exists) {
      wishlist.push(product);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      alert(`${product.name} has been added to your wishlist.`);
    } else {
      alert(`${product.name} is already in your wishlist.`);
    }
  });
  
  
        // Append product to page
        productList.appendChild(productDiv);
      });
    }
  
    // Render products on page load
    renderProducts();
  });
  document.getElementById('searchInput').addEventListener('input', filterProducts);
document.getElementById('brandFilter').addEventListener('change', filterProducts);

function filterProducts() {
  const searchText = document.getElementById('searchInput').value.toLowerCase();
  const selectedBrand = document.getElementById('brandFilter').value.toLowerCase();

  const productCards = document.querySelectorAll('.product');

  productCards.forEach(card => {
    const name = card.querySelector('h3').textContent.toLowerCase();
    const brand = card.querySelector('p:nth-child(4)').textContent.toLowerCase(); // Brand ni paragraph ya nne

    const matchSearch = name.includes(searchText);
    const matchBrand = !selectedBrand || brand.includes(selectedBrand);

    if (matchSearch && matchBrand) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

  
