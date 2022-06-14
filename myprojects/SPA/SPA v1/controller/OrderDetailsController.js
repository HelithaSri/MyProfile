$("#btn-order-search").click(function () {
    $("#orderDetailsTblBody").children().remove();
    let result = $("#txt-order-search").val();
    searchOrderDetails(result);

});

$("#clear-btn-order").click(function () {
    $("#orderDetailsTblBody").children().remove();
    $("#lblCusId").text("");
    $("#lblDate").text("");
    $("#lblSTotal").text("");
    $("#lblOrderId").text("");
    $("#txt-order-search").val("");
});

function searchOrderDetails(result) {

    for (const od of orderDetailsDB) {
        if (od.getOrderid() == result) {

            $("#lblOrderId").text(od.getOrderid());

            for (const o of orderDB) {
                if (o.getOrderId() == result) {
                    $("#lblCusId").text(o.getCustomerId());
                    $("#lblDate").text(o.getDate());
                    $("#lblSTotal").text(o.getSubTotal());
                }
            }

            let row =
                `<tr><td>${od.getItemCode()}</td><td>${od.getItemName()}</td><td>${od.getItemUnitPrice()}</td><td>${od.getItemQty()}<td>${od.getTotAmount()}</td></tr>`;
            $("#orderDetailsTblBody").append(row);

        }
    }
}
