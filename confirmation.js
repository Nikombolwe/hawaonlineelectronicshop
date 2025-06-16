document.addEventListener('DOMContentLoaded', () => {
    const confirmationBox = document.getElementById('order-confirmation');
    const currentUsername = localStorage.getItem('username');
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
  
    if (!currentUsername) {
      confirmationBox.innerHTML = "<p>Please login to view your order.</p>";
      return;
    }
  
    // Tafuta order ya mwisho ya huyu user kwa kulinganisha jina
    const lastOrder = [...orders].reverse().find(order => {
      return order.user && order.user.username === currentUsername;
    });
  
    if (lastOrder) {
      const itemsHTML = lastOrder.items.map(item => `<li>${item.name} - TZS ${item.price}</li>`).join('');
      confirmationBox.innerHTML = `
        <p>Thank you <strong>${lastOrder.user.fullname}</strong>, your order has been received!</p>
        <p><strong>Order Date:</strong> ${lastOrder.date}</p>
        <ul>${itemsHTML}</ul>
        <p><strong>Total:</strong> TZS ${lastOrder.total}</p>
      `;
    } else {
      confirmationBox.innerHTML = `<p>No order found for user <strong>${currentUsername}</strong>.</p>`;
    }
  });
  
