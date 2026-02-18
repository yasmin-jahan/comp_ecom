  $(document).ready(function () {
    if (document.querySelector(".mySwiper")) {
    var swiper = new Swiper(".mySwiper", {
      spaceBetween: 30,
      effect: "fade",
      navigation: {
        nextEl: ".swiper_next_btn",
        prevEl: ".swiper_prev_btn",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
      }

      //common_btn
document.querySelectorAll(".common_button").forEach(btn => {
  const span = btn.querySelector("span");
  if (!span) return;
  btn.addEventListener("mouseenter", e => {
    

    const rect = btn.getBoundingClientRect();

    span.style.left = `${e.clientX - rect.left}px`;
    span.style.top = `${e.clientY - rect.top}px`;
  });
});

    });
    
//menu
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const closeBtn = document.querySelector(".close_btn");
    const overlay = document.querySelector(".black_overlay");
    const headerNav = document.querySelector(".header_nav");


    if(hamburger && headerNav && overlay){
    document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector(".header_nav").classList.add("header_mobile_nav_active");
    document.querySelector(".black_overlay").style.display = "block";
    });
  }
 
      if(closeBtn && headerNav && overlay){
    document.querySelector(".close_btn").addEventListener("click", () => {
    document.querySelector(".header_nav").classList.remove("header_mobile_nav_active");
    document.querySelector(".black_overlay").style.display = "none";
    });
  }

      if(overlay && headerNav){
    document.querySelector(".black_overlay").addEventListener("click", () => {
    document.querySelector(".header_nav").classList.remove("header_mobile_nav_active");
    document.querySelector(".black_overlay").style.display = "none";
    });
  }

 const currentPage = window.location.pathname.split("/").pop();
  const menuItems = document.querySelectorAll(".main_ul li");

  if(menuItems.length){
  menuItems.forEach(li => {
    const link = li.querySelector("a");
    if (link.getAttribute("href") === currentPage) {
      li.classList.add("active");
    } else {
      li.classList.remove("active");
    }

    li.addEventListener("click", () => {
      menuItems.forEach(item => item.classList.remove("active"));
      li.classList.add("active");
    });
  });
  }
    //header fixed
    const header = document.querySelector(".header_section");
      if(header){
  window.addEventListener("scroll", function() {
    
  if (window.scrollY > 30) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
});
      }

});

//logoin menu
const userMenu = document.getElementById("userMenu");
const greeting = document.getElementById("userGreeting");
const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");
const logoutBtn = document.getElementById("logout_btn");

window.addEventListener('DOMContentLoaded', ()=>{
  const user = JSON.parse(localStorage.getItem("user"));
  if(user && user.email){
    const username = user.email.split("@")[0];
        if(greeting){
    greeting.textContent= `Hello ${username}`;
    greeting.style.display= "inline";
    greeting.style.textTransform = "capitalize";
        }
   if(loginBtn) loginBtn.style.display = "none";
    if(registerBtn) registerBtn.style.display = "none";
    if(logoutBtn) logoutBtn.style.display = "inline";
  }else{
       if(userMenu) userMenu.style.display = "none";
    if(loginBtn) loginBtn.style.display = "inline-block";
    if(registerBtn) registerBtn.style.display = "inline-block";
  }
});

function logout(){
  localStorage.removeItem("user");
  window.location.reload();
}

//user menu toggle
const userMenuButton = document.getElementById("userMenuButton");
const userDropdown = document.getElementById("userDropdown");

if (userMenuButton && userDropdown) {
userMenuButton.addEventListener("click", ()=>{
  userDropdown.classList.toggle("hidden");
});
document.addEventListener("click", (e)=>{
  if(!userMenuButton.contains(e.target) && !userDropdown.contains(e.target)){
     userDropdown.classList.add("hidden");
  }
});
}

  //update count
function updateCartCount(){
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCount = document.getElementById("cartCount");
  if(cartCount){
    cartCount.textContent = totalItems;
  }
}
// Run on every page safely
document.addEventListener("DOMContentLoaded", updateCartCount);