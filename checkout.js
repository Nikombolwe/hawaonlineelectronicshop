document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const currentUsername = localStorage.getItem('username');
    const checkoutList = document.getElementById('checkout-list');
    const totalPriceEl = document.getElementById('total-price');
    const placeOrderBtn = document.getElementById('place-order-btn');
  
    // Check kama user haja-login
    if (!currentUsername) {
      alert("Please login first.");
      window.location.href = "login.html";
      return;
    }
  
    // Pata taarifa kamili za mtumiaji aliyelogin
    const allUsers = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = allUsers.find(u => u.username === currentUsername);
  
    // Onyesha bidhaa kwenye checkout
    let total = 0;
    checkoutList.innerHTML = ''; // Hakikisha in clear kwanza
  
    cart.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name} - TZS ${item.price}`;
      checkoutList.appendChild(li);
      total += parseFloat(item.price);
    });
    totalPriceEl.textContent = `TZS ${total.toFixed(2)}`;
  
    // Wakati wa ku-place order
    placeOrderBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        alert("Cart is empty.");
        return;
      }
  
      const orders = JSON.parse(localStorage.getItem('orders')) || [];
  
      // Unda order mpya kwa user
      const newOrder = {
        user: {
          fullname: currentUser?.fullname || currentUsername || 'Guest',
          email: currentUser?.email || 'N/A',
          phone: currentUser?.phone || 'N/A',
          username: currentUser?.username || currentUsername // 🔑 Muhimu kwa confirmation.js
        },
        items: cart,
        total: total.toFixed(2),
        date: new Date().toLocaleString(),
        status: 'Pending'
      };
  
      orders.push(newOrder);
      localStorage.setItem('orders', JSON.stringify(orders)); // Hifadhi order
      localStorage.removeItem('cart'); // Futa cart baada ya order kuwekwa
  
      alert("Order placed successfully!");
      window.location.href = "confirmation.html";
    });
  });
  
