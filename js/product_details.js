function getSlugFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("slug");
}
//product render
function renderProductDetails(product) {
    const container = document.getElementById("productContainer");
    container.innerHTML = `
     <div class="product_details_card">
     <div class="row">
     <div class="col-md-6">
        <div class="product_details_img">
            <img src="" alt="Main Product Image" id="main_image">
          
        </div>
          <div class="thumbnails" id="thumbnailContainer"></div>
        </div>
         <div class="col-md-6">
        <div class="info_column">
            <h2>${product.name}</h2>
            <span class="price">$${product.price.toFixed(2)}</span>
            <p class="description">${product.description}</p>
            <p class="common_info"><strong>Category:</strong>${product.category}</p>
            <p class="common_info"><strong>Brand:</strong>${product.brand}</p>
            <p class="common_info"><strong>Rating:</strong>${product.avgRating} ⭐ (${product.numReviews} reviews)</p>
            <p class="common_info"><strong>Stock:</strong>${product.countInStock}</p>
            <button class="common_button add-to-cart" data-id="${product.slug}">Add To Cart <span></span></button>
        </div>
        </div>
        </div>
     </div>
    `;

    document.querySelectorAll(".add-to-cart").forEach((btn) => {
        btn.addEventListener("click", () => {
            const productId = btn.getAttribute("data-id");
            const productToAdd = products.find((p) => p.slug == productId);
            addToCart(productToAdd);
        });
    });
}

const slug = getSlugFromURL();
const product = products.find((p) => p.slug === slug);
if (product) {
    renderProductDetails(product);
const relatedProducts = products.filter((p) => p.category === product.category && p.slug !== product.slug
);


const relatedContainer = document.getElementById("related_products");
relatedProducts.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add('col-sm-6', 'col-xl-4');
    card.innerHTML = `
   <div class="product_card">
    <div class="product_img">
    <img src="${product.images[0]}" alt="${product.name}">
       </div>
      <div class="product_content ">
        <h3><a href="product.html?slug=${product.slug}">${product.name.slice(0, 30)}...</a></h3>
           <span>$${product.price}</span>
                               
           </div>
               <div class="order">
              <button class="add-to-cart" data-id="${product.slug}"> <i class="fa-solid fa-cart-shopping"></i></button>
                   </div>
                   </div>
         
    `;
    relatedContainer.appendChild(card);
    $('.product_content  h3').matchHeight();
});




const mainImage = document.getElementById("main_image");
const thumbnailContainer = document.getElementById("thumbnailContainer");
  if (mainImage && thumbnailContainer) {
mainImage.src = product.images[0];
//create thumbnails

product.images.forEach((imgSrc, index) => {

    const thumb = document.createElement("img");
    thumb.src = imgSrc;
    thumb.classList.add("thumbnail");

     // set first thumbnail active by default
    if(index === 0){
        thumb.classList.add("active");
        mainImage.src = imgSrc;
    }

    //click event to change the main image
    thumb.addEventListener("click", () => {
        mainImage.src = imgSrc;

          // remove active class from all thumbnails
        document.querySelectorAll(".thumbnail").forEach(img => {
            img.classList.remove("active");
        });
           // add active class to clicked thumbnail
        thumb.classList.add("active");

    });
    thumbnailContainer.appendChild(thumb);

});
  }
} else {
    document.getElementById("productContainer").innerHTML = `<p>Product not found.</p>`;
}

// //update count
// function updateCartCount() {
//     const cart = JSON.parse(localStorage.getItem("cart") || "[]");
//     const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
//     const cartCount = document.getElementById("cartCount");
//     if (totalItems) {
//         cartCount.textContent = totalItems;
//     }
// }

// updateCartCount();

