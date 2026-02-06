  $(document).ready(function () {
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
document.querySelectorAll(".common_button").forEach(btn => {
  btn.addEventListener("mouseenter", e => {
    const span = btn.querySelector("span");
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

    document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector(".header_nav").classList.add("header_mobile_nav_active");
    document.querySelector(".black_overlay").style.display = "block";
    });

    document.querySelector(".close_btn").addEventListener("click", () => {
    document.querySelector(".header_nav").classList.remove("header_mobile_nav_active");
    document.querySelector(".black_overlay").style.display = "none";
    });

    document.querySelector(".black_overlay").addEventListener("click", () => {
    document.querySelector(".header_nav").classList.remove("header_mobile_nav_active");
    document.querySelector(".black_overlay").style.display = "none";
    });

 const currentPage = window.location.pathname.split("/").pop();
  const menuItems = document.querySelectorAll(".main_ul li");

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

    //header fixed
  window.addEventListener("scroll", function() {
  const header = document.querySelector(".header_section");
  if (window.scrollY > 30) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
});

});
