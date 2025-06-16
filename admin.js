// SEHEMU 1: KUONGEZA BIDHAA NA KUZIONYESHA
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('add-product-form');
  const productListDiv = document.querySelector('.product-list');

  let products = JSON.parse(localStorage.getItem('products')) || [];

  function renderProducts() {
    productListDiv.innerHTML = '';
    products.forEach((product, index) => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('product');
      productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h4>${product.name}</h4>
        <p>Brand: ${product.brand}</p>
        <p>Price: TZS ${product.price}</p>
        <button class="remove-btn" title="Remove Product">&times;</button>
      `;

      productDiv.querySelector('.remove-btn').addEventListener('click', () => {
        if (confirm(`Are you sure you want to remove "${product.name}"?`)) {
          products.splice(index, 1);
          localStorage.setItem('products', JSON.stringify(products));
          renderProducts();
        }
      });

      productListDiv.appendChild(productDiv);
    });
  }

  renderProducts();

  form.addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('product-name').value.trim();
    const brand = document.getElementById('product-brand').value.trim();
    const price = document.getElementById('product-price').value.trim();
    const image = document.getElementById('product-image').value.trim();

    if (!name || !brand || !price || !image) {
      alert('Please fill all fields.');
      return;
    }

    products.push({ name, brand, price, image });
    localStorage.setItem('products', JSON.stringify(products));

    renderProducts();
    form.reset();
    alert('Product added successfully!');
  });
});

// SEHEMU 2: KUONYESHA ODA NA TAARIFA ZA WATEJA
document.addEventListener('DOMContentLoaded', () => {
  const ordersList = document.getElementById('ordersList');
  const orders = JSON.parse(localStorage.getItem('orders')) || [];

  function renderOrders() {
    ordersList.innerHTML = '';
    if (orders.length === 0) {
      ordersList.innerHTML = '<p>No orders yet.</p>';
      return;
    }

    orders.forEach((order, index) => {
      const orderDiv = document.createElement('div');
      orderDiv.classList.add('order-item');

      const user = order.user || {};

      orderDiv.innerHTML = `
        <h3>Order #${index + 1}</h3>
        <div class="order-details">
          <strong>Customer:</strong> ${user.fullname || 'Guest'}<br />
          <strong>Email:</strong> ${user.email || 'N/A'}<br />
          <strong>Phone:</strong> ${user.phone || 'N/A'}<br />
          <strong>Products:</strong>
          <ul>
            ${order.items.map(item => `<li>${item.name} - TZS ${item.price}</li>`).join('')}
          </ul>
          <strong>Total:</strong> TZS ${order.total}<br />
          <strong>Status:</strong> <span class="order-status">${order.status}</span>
        </div>
        <div class="order-actions">
          <button class="update-status-btn" data-index="${index}">Mark as Processing</button>
          <button class="complete-btn" data-index="${index}">Mark as Completed</button>
        </div>
      `;

      ordersList.appendChild(orderDiv);
    });

    document.querySelectorAll('.update-status-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = btn.dataset.index;
        orders[i].status = 'Processing';
        saveAndRenderOrders();
      });
    });

    document.querySelectorAll('.complete-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = btn.dataset.index;
        orders[i].status = 'Completed';
        saveAndRenderOrders();
      });
    });
  }

  function saveAndRenderOrders() {
    localStorage.setItem('orders', JSON.stringify(orders));
    renderOrders();
  }

  renderOrders();
});

