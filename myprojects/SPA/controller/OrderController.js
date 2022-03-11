generateOrderId();

$("#idCmb").click(function(){
    loadAllCustomerIds();
});

$("#itemIdCmb").click(function(){
    loadAllItemCodes();
});

//------------------------------------------------------

/* Load Customer ID's to Combo Box - Function */
function loadAllCustomerIds() {
    $("#idCmb").empty();
    for (let i in customerDB) {
        let option = `<option value="${customerDB[i].getCustomerID()}">${customerDB[i].getCustomerID()}</option>`
        $("#idCmb").append(option);
    }
}

/* Load Item ID's to Combo Box - Function */
function loadAllItemCodes() {
    $("#itemIdCmb").empty();
    for (let i in itemDB) {
        let option = `<option value="${itemDB[i].getItemCode()}">${itemDB[i].getItemCode()}</option>`
        $("#itemIdCmb").append(option);
    }
}
