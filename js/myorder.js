const user = JSON.parse(localStorage.getItem("user"));
if(!user){
  window.location.href = `login.html?redirect=${encodeURIComponent(window.location.pathname)}`;
}

const allOrders = JSON.parse(localStorage.getItem("orders") || "[]");
const userOrders = allOrders.filter((order) => order.user === user.email);
function renderOrders() {
//Build HTML Table
let tableHTML = `
<table ">
                     <thead>
                    <tr>
                        <th>#</th>
                        <th>Order Id</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Total Items</th>
                        <th>Total Price</th>
                        <th>Actions</th>
                    </tr>
               </thead>
              
                <tbody>
`;
      if(userOrders.length === 0){
        tableHTML += `
        <tr>
          <td colspan="6" style="text-align: center;"> No Orders Found </td>
        </tr>
        `;
      }else{
        userOrders.forEach((order, index) => {
            const totalItems = order.orderItems.reduce(
                (acc, item) => acc + item.quantity,
                0
            );
            const totalPrice = order.orderItems.reduce(
                (acc, item) => acc + item.quantity * item.price,
                0
            );
            tableHTML += `
                <tr>
                    <td data-title="index">${index + 1}</td>
                    <td data-title="id">${order.id}</td>
                    <td data-title="Date">${order.createdAt.split("T")[0]}</td>
                    <td data-title="Status">${order.status}</td>
                    <td data-title="Total Items">${totalItems}</td>
                    <td data-title="Price">${totalPrice.toFixed(2)}</td>
                    <td data-title="Actions" class="table_btns"><a href="order.html?orderId=${order.id}" class="common_button viewBtn mt-0">View <span></span></a>
                    <button class="common_button deleteBtn" onclick="cancelOrder(${order.id})">Cancel <span></span></button>
                    </td>
                </tr>
                  
            `;
        });
      }

      tableHTML += `
        </tbody>
        </table>
      `;
      document.getElementById("ordersContainer").innerHTML = tableHTML;
    }

    //cancel order

    // function cancelOrder(orderId){
    //     if(confirm("Are you sure you want to cancel this order?")){
    //         const updatedOrders = allOrders.filter(
    //             (order) => order.id !== orderId
    //         );
    //         localStorage.setItem("orders", JSON.stringify(updatedOrders));
    //         userOrders = updatedOrders.filter(
    //             (order) => order.user === user.email
    //         );
    //         renderOrders();
    //     }
    // }

    function cancelOrder(orderId) {
    if (confirm("Are you sure you want to cancel this order?")) {

        const updatedOrders = allOrders.map((order) => {
            if (order.id === orderId) {
                return { ...order, status: "cancelled" };
            }
            return order;
        });

        localStorage.setItem("orders", JSON.stringify(updatedOrders));

        userOrders = updatedOrders.filter(
            (order) => order.user === user.email
        );

        renderOrders();
    }
}

    renderOrders();