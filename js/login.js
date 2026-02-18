const passwordInput = document.getElementById("password");
const toggleWrapper = document.getElementById("togglePassword");
const LoginForm = document.getElementById("LoginForm");
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

LoginForm.addEventListener("submit", async(e) =>{
    e.preventDefault();
    //get all values
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    let isValid = true;
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
 
        localStorage.setItem("user", JSON.stringify(user));
        // alert("Login Successfully!")
    // const params = new URLSearchParams(window.location.search);

    window.location.href = "index.html";
});