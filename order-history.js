document.addEventListener('DOMContentLoaded', () => {
    const currentUser = localStorage.getItem('username');
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
  
    const historyContainer = document.getElementById('order-history');
    const userOrders = orders.filter(order => order.user.username === currentUser);
  
    if (userOrders.length === 0) {
      historyContainer.innerHTML = "<p>You have not placed any orders yet.</p>";
      return;
    }
  
    userOrders.forEach(order => {
      const orderBox = document.createElement('div');
      orderBox.classList.add('order-box');
  
      const itemsHTML = order.items.map(item => `<li>${item.name} - TZS ${item.price}</li>`).join('');
  
      orderBox.innerHTML = `
        <h4>Order Date: ${order.date}</h4>
        <ul>${itemsHTML}</ul>
        <p><strong>Total:</strong> TZS ${order.total}</p>
        <p><strong>Status:</strong> ${order.status}</p>
      `;
  
      historyContainer.appendChild(orderBox);
    });
  });
  
  
