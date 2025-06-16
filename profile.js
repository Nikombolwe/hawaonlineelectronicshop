document.addEventListener("DOMContentLoaded", () => {
    const currentUsername = localStorage.getItem("username");
  
    if (!currentUsername) {
      alert("Please login to edit your profile.");
      window.location.href = "login.html";
      return;
    }
  
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const currentUserIndex = users.findIndex(u => u.username === currentUsername);
  
    if (currentUserIndex === -1) {
      alert("User not found.");
      return;
    }
  
    const user = users[currentUserIndex];
  
    // Pre-fill the form
    document.getElementById("fullname").value = user.fullname;
    document.getElementById("email").value = user.email;
    document.getElementById("phone").value = user.phone;
    document.getElementById("address").value = user.address;
    document.getElementById("gender").value = user.gender;
    document.getElementById("username").value = user.username;
    document.getElementById("username").disabled = true; // prevent username change
  
    // Handle form submission
    const form = document.getElementById("edit-profile-form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      // Update user object
      users[currentUserIndex] = {
        ...users[currentUserIndex], // zachukua password na username unchanged
        fullname: document.getElementById("fullname").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        address: document.getElementById("address").value.trim(),
        gender: document.getElementById("gender").value.trim()
      };
  
      // Save changes
      localStorage.setItem("users", JSON.stringify(users));
      alert("Profile updated successfully!");
      window.location.href = "userinfo.html";
    });
  });
  
