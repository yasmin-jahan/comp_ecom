document.addEventListener("DOMContentLoaded", () => {
const cart = JSON.parse(localStorage.getItem("cart") || "[]");
const cartContainer = document.getElementById("cartContainer");
const totalAmount = document.getElementById("totalAmount");
const checkoutTotalAmount = document.getElementById("checkoutTotalAmount");
if (!cartContainer) return;

let total = 0;
cart.forEach((item) =>{
   total +=Number(item.price) * Number(item.quantity);
});

if (totalAmount) {
  totalAmount.innerHTML = `Total : $${total.toFixed(2)}`;
}
if (checkoutTotalAmount) {
  checkoutTotalAmount.innerHTML = `$${total.toFixed(2)}`;
}
cartContainer.innerHTML = "";
if(cart.length === 0){
    cartContainer.innerHTML = `
    <div class = "empty_cart_msg">
    <p class="empty_msg">Your cart is empty</p>
    <a href="index.html" class="common_button">Go Back</a>
    </div>
    `;
}else{
    cart.forEach((item) =>{
        const createDiv = document.createElement("div");
        createDiv.classList.add("cart_item", "row");
        createDiv.innerHTML = `
        <div class="col-sm-4 col-md-3 col-xl-2">
        <div class="cart_img">
               <img src="${item.images[0]}" alt="${item.name}">
         </div>
         </div>
         <div class="col-sm-8 col-md-9 col-xl-10">
         <div class="cart_details">
            <p>T${item.name}</p>
            <p><strong>Price:</strong> <span>$${item.price}</span></p>
            <p>Quantity : ${item.quantity}</p>
            <p class="price">Total : <strong>$${(item.price * item.quantity).toFixed(2)}</strong></p>
            <button class="common_button cart_remove_btn" onclick="removeFromCart(${item.id})">Remove <span></span></button>
         </div>
         </div>
        `;
        cartContainer.appendChild(createDiv);
    });
}

//    //update count
// function updateCartCount(){
//   const cart = JSON.parse(localStorage.getItem("cart") || "[]");
//   const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
//   const cartCount = document.getElementById("cartCount");
//   if(totalItems){
//     cartCount.textContent = totalItems;
//   }
// }
//  updateCartCount();



 });

 function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");

  // Remove the item
  cart = cart.filter(item => item.id !== id);

  // Save updated cart
  localStorage.setItem("cart", JSON.stringify(cart));

  // Reload page to update UI
  location.reload();
}
