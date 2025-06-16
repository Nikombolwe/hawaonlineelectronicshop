document.addEventListener("DOMContentLoaded", () => {
    const profileContainer = document.getElementById("profile-info");
    const currentUsername = localStorage.getItem("username");
  
    if (!currentUsername) {
      profileContainer.innerHTML = "<p>Please login to view your profile.</p>";
      return;
    }
  
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.username === currentUsername);
  
    if (!user) {
      profileContainer.innerHTML = "<p>User not found.</p>";
      return;
    }
  
    profileContainer.innerHTML = `
      <h2>Welcome, ${user.fullname}</h2>
      <ul>
        <li><strong>Username:</strong> ${user.username}</li>
        <li><strong>Email:</strong> ${user.email}</li>
        <li><strong>Phone:</strong> ${user.phone}</li>
        <li><strong>Address:</strong> ${user.address}</li>
        <li><strong>Gender:</strong> ${user.gender}</li>
      </ul>
    `;
  });
  
