const user = JSON.parse(localStorage.getItem("user"));
if(!user){
  window.location.href = `login.html?redirect=${encodeURIComponent(window.location.pathname)}`;
}

 const allOrders = JSON.parse(localStorage.getItem("orders") || "[]");

 function getOrderIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("orderId");
}

const orderId = getOrderIdFromURL();
const order = allOrders.find((data) => data?.id == orderId);
const shortOrderId = orderId ? orderId.slice(5) : "";
const orderPage = document.getElementById("orderPage");

orderPage.innerHTML = `
<div class="order_info">
        <div>
            <h3>Order Id :</h3>
            <p id="order_Id">...${shortOrderId}</p>
        </div>

        <div>
            <h3>Date : </h3>
            <p>${new Date(order?.createdAt).toISOString().split("T")[0]}</p>
        </div>

        <div>
            <h3>Status :</h3>
            <p class="status shipped">${order?.status}</p>
        </div>
     </div>

     <div class="section">
        <h3>Shipping address</h3>
        <p>${order?.shippingAddress?.fullName}</p>
        <p>${order?.shippingAddress?.address}</p>
        <p>${order?.shippingAddress?.country === "in"? "India" : `${order?.shippingAddress?.country}`},
            ${order?.shippingAddress?.zip}
        </p>
        <p>${order?.shippingAddress?.city === "DL" ? "Delhi" : `${order?.shippingAddress?.city}`}</p>
     </div>

     <div class="section">
          <h3>Payment Info</h3>
          <p>Payment Method  ${order?.paymentInfo?.paymentMethod})</p>
          <p>Card Expiry  ${order?.paymentInfo?.expiry}</p>
          <p>Credit Card (**** ${order?.paymentInfo?.cardNumber?.slice(5)})</p>
        </div>

     <div class="section">
        <h3>Items</h3>
        ${order?.orderItems?.map(
            (item, i) => `
            <div class="item">
                <img src="${item.images[0]}" alt="product">
            
            <div>
                <p><strong>${item?.name}</strong></p>
                <p> Qty : ${item?.quantity}</p>
                <p> $${item?.price}</p>
                <p> Total Item Price :  $${item?.price * item?.quantity}</p>
            </div>
            </div>
            `
        ).join("")}
     </div>
`;
