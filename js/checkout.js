const cart = JSON.parse(localStorage.getItem("cart") || "[]");
const totalAmount = document.getElementById("totalAmount");
const checkoutItemsList = document.getElementById("checkoutItemsList");
const checkoutForm = document.getElementById("checkoutForm");

let total = 0;

cart.forEach((item) =>{
  total +=Number(item.price) * Number(item.quantity);
});

if (totalAmount) {
  totalAmount.innerHTML = `$${total.toFixed(2)}`;
}

if(checkoutItemsList){
    cart?.forEach((item) =>{
        const itemElement = document.createElement("div");
        itemElement.classList.add("summary_item");
        itemElement.innerHTML = `
        <span>${item.name} X ${item.quantity}</span>
        <span>$${item.price * item.quantity}</span>
        `;
        checkoutItemsList.appendChild(itemElement);
    });
  }
if (checkoutForm) {
    checkoutForm.addEventListener("click", () =>{
      //  e.preventDefault(); 
       const formData = {
        orderItems : cart || [],
        user : user.email,
        totalPrice : total.toFixed(2),
        fullName : document.getElementById("fullName").value.trim(),
        email : document.getElementById("email").value.trim(),
        address : document.getElementById("address").value.trim(),
        city : document.getElementById("city").value.trim(),
        zip : document.getElementById("zip").value.trim(),
        country : document.getElementById("country").value.trim(),
        paymentMethod : "card",
        cardNumber :  document.getElementById("cardNumber").value.trim(),
        expiry :  document.getElementById("expiry").value.trim(),
        cvv :  document.getElementById("cvv").value.trim(),
        timestamp : new Date().toISOString(),
       };
       
       if(user){
        createOrder(formData);
       }

    });
}

//    //update count
// function updateCartCount(){
//   const cart = JSON.parse(localStorage.getItem("cart") || "[]");
//   const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
//   const cartCount = document.getElementById("cartCount");
//   if(cartCount){
//     cartCount.textContent = totalItems;
//   }
// }
// // Run on every page safely
// document.addEventListener("DOMContentLoaded", updateCartCount);