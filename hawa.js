// hawa.js - Login script
function validateLogin(event) {
    event.preventDefault();
  
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
  
    // Check for admin login
    const adminUsername = "admin";
    const adminPassword = "admin@2025";
  
    if (username === adminUsername && password === adminPassword) {
      localStorage.setItem("userRole", "admin");
      localStorage.setItem("username", username);
      alert("Welcome Admin!");
      window.location.href = "admin.html"; // redirect admin
      return;
    }
  
    // Get regular users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
  
    const foundUser = users.find(user =>
      user.username === username && user.password === password
    );
  
    if (foundUser) {
      localStorage.setItem("userRole", "user");
      localStorage.setItem("username", foundUser.username); // Hii ni muhimu kwa checkout kupata data za user
      alert("Welcome back " + foundUser.username + "!");
      window.location.href = "home.html"; // redirect regular user
    } else {
      alert("Incorrect username or password. Please try again.");
    }
  }
  
