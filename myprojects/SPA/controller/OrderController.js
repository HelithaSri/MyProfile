generateOrderId();
disableEdit();

$("#idCmb").change(function(e){
    let selectedCus = $('#idCmb').find(":selected").text();
    selectedCustomer(selectedCus);

});

$("#itemIdCmb").change(function(){
    let selected_Item = $('#itemIdCmb').find(":selected").text();
    selectedItem(selected_Item);
});

//------------------------------------------------------

/* Load Customer ID's to Combo Box - Function */
function loadAllCustomerIds() {
    $("#idCmb").empty();

    let cusHint = `<option disabled selected>Select Customer ID</option>`;
    $("#idCmb").append(cusHint);

    for (let i in customerDB) {
        let option = `<option value="${customerDB[i].getCustomerID()}">${customerDB[i].getCustomerID()}</option>`;
        $("#idCmb").append(option);
    }

}

/* Load Item ID's to Combo Box - Function */
function loadAllItemCodes() {
    $("#itemIdCmb").empty();
    
    let itemHint = `<option disabled selected>Select Item ID</option>`;
    $("#itemIdCmb").append(itemHint);

    for (let i in itemDB) {
        let option = `<option value="${itemDB[i].getItemCode()}">${itemDB[i].getItemCode()}</option>`;
        $("#itemIdCmb").append(option);
    }
}

/* Load Customer Data To input Fields */
function selectedCustomer(CustomerId) {
    for (const i in customerDB) {
        if (customerDB[i].getCustomerID()==CustomerId) {
            let element = customerDB[i];
            $("#inCusName").val(element.getCustomerName());
            $("#inCusSalary").val(element.getCustomerSalary());
            $("#inCusaddress").val(element.getCustomerAddress());
        }
    }
}

/* Load Item Data To input Fields */
function selectedItem(ItemId) {
    for (const i in itemDB) {
        if (itemDB[i].getItemCode()==ItemId) {
            let element = itemDB[i];
            $("#itemNameO").val(element.getItemName());
            $("#qtyOnHandO").val(element.getItemQty());
            $("#priceO").val(element.getItemPrice());
        }
    }
}

function disableEdit() {
    $("#oId,#inCusName,#inCusSalary,#inCusaddress").css("pointer-events", "none");  //Invoice Details Section
    $("#itemNameO,#qtyOnHandO,#priceO").css("pointer-events", "none");  //Item Select Section
    $("#balanceO").css("pointer-events", "none");  //Total Section
}

function generateOrderId() {
    let index = orderDB.length - 1;
    let id;
    let temp;
    if (index != -1) {
        id = orderDB[orderDB.length - 1].getOrderId();
        temp = id.split("-")[1];
        temp++;
    }

    if (index == -1) {
        $("#oId").val("O00-001");
    } else if (temp <= 9) {
        $("#oId").val("O00-00" + temp);
    } else if (temp <= 99) {
        $("#oId").val("O00-0" + temp);
    } else {
        $("#oId").val("O00-" + temp);
    }
}