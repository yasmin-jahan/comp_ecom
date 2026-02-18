
const passwordInput = document.getElementById("password");
const toggleWrapper = document.getElementById("togglePassword");
const registerForm = document.getElementById("registerForm");
const toggleIcon = toggleWrapper.querySelector("i");

toggleWrapper.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleIcon.classList.remove("fa-eye-slash");
    toggleIcon.classList.add("fa-eye");
  } else {
    passwordInput.type = "password";
    toggleIcon.classList.remove("fa-eye");
    toggleIcon.classList.add("fa-eye-slash");
  }
});
document.addEventListener("DOMContentLoaded", function () {
 if (!registerForm) return; 

 registerForm.addEventListener("submit", async function (e) {
          e.preventDefault();
  
    //get all values
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    let isValid = true;
    if(!username){
        document.getElementById("usernameError").textContent = "Username is required";
        isValid = false;
    }else{
        document.getElementById("usernameError").textContent = "";
    }
    if(!email){
        document.getElementById("emailError").textContent = "Email is required";
         isValid = false;
    }else{
        document.getElementById("emailError").textContent = "";
    }
     if(!password){
        document.getElementById("passwordError").textContent = "Password is required";
         isValid = false;
    }else{
        document.getElementById("passwordError").textContent = "";
    }
    if(!isValid) return;

        const user = { email};
    if(user){
        // localStorage.setItem("user", JSON.stringify(user));
        // alert("Register Successfully!")
    window.location.href = "login.html";

    }
});


});