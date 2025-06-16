// auth.js - Signup script
function handleSignUp(event) {
    event.preventDefault();
  
    const fullname = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const gender = document.getElementById('gender').value.trim();
    const username = document.getElementById('signupUsername').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
  
    // Hakikisha password zinalingana
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    // Chukua users waliopo
    const users = JSON.parse(localStorage.getItem('users')) || [];
  
    // Angalia kama username au email tayari vipo
    const exists = users.some(u => u.username === username || u.email === email);
  
    if (exists) {
      alert("Username or Email already exists!");
      return;
    }
  
    // Tengeneza user mpya
    const newUser = {
      fullname,
      email,
      phone,
      address,
      gender,
      username,
      password
    };
  
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
  
    alert("Account created successfully!");
    window.location.href = "login.html";
  }
  
