const user = JSON.parse(localStorage.getItem("user"));
if(!user){
  window.location.href = `login.html?redirect=${encodeURIComponent(window.location.pathname)}`
}

function createOrder(data){
    const order = {
        id : Date.now(),
        user : data.user,
        status : "pending",
        createdAt : new Date(),
        orderItems : data.orderItems,
        shippingAddress : {
            fullName : data.fullName,
            address : data.address,
            city : data.city,
            country : data.country,
            zip : data.zip,
            email : data.email,
        },
        totalPrice : data.totalPrice,
        paymentInfo : {
            paymentMethod : data.paymentMethod,
            cardNumber : data.cardNumber,
            expiry : data.expiry,
        },
    };
    const allOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    allOrders.push(order);

     localStorage.setItem("orders" , JSON.stringify(allOrders));
    alert("order created successfully");
    window.location.href =  `order.html?orderId=${order.id}`;
    // localStorage.removeItem("cart");

    // return saceOrder;
}