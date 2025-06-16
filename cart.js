document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    function renderCart() {
      cartItemsContainer.innerHTML = '';
      let total = 0;
  
      cart.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <div>
            <h4>${item.name}</h4>
            <p>${item.brand}</p>
            <p>TSh ${item.price}</p>
          </div>
          <button onclick="removeItem(${index})">Remove</button>
        `;
        cartItemsContainer.appendChild(div);
        total += parseFloat(item.price);
      });
  
      totalPriceElement.textContent = `TSh ${total.toFixed(2)}`;
    }
  
    window.removeItem = function(index) {
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    };
  
    renderCart();
  });
  
  
