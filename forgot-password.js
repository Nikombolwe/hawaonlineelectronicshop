// forgot-password.js

const emailForm = document.getElementById('emailForm');
const resetForm = document.getElementById('resetForm');
const emailInput = document.getElementById('email');
let currentUserIndex = null;

emailForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const email = emailInput.value.trim();
  const users = JSON.parse(localStorage.getItem('users')) || [];

  const userIndex = users.findIndex(u => u.email === email);

  if (userIndex === -1) {
    alert("Email not found!");
    return;
  }

  currentUserIndex = userIndex;
  emailForm.classList.add('hidden');
  resetForm.classList.remove('hidden');
});

resetForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const newPassword = document.getElementById('newPassword').value;
  const confirmNewPassword = document.getElementById('confirmNewPassword').value;

  if (newPassword !== confirmNewPassword) {
    alert("Passwords do not match!");
    return;
  }

  const users = JSON.parse(localStorage.getItem('users'));
  users[currentUserIndex].password = newPassword;
  localStorage.setItem('users', JSON.stringify(users));

  alert("Password reset successfully!");
  window.location.href = "login.html";
});

