var selectedItemId;
var selectedCustomerId;

generateOrderId();  //Generate Order Id
disableEdit();  //Prevent Editing Input Fields
setDate();  //Set Time

$("#btnAddToCart").click(function(){
    addItemToCart();
});

$("#idCmb").change(function(){
    selectedCustomerId = $('#idCmb').find(":selected").text();
    selectedCustomer(selectedCustomerId);
});

$("#itemIdCmb").change(function(){
    selectedItemId = $('#itemIdCmb').find(":selected").text();
    selectedItem(selectedItemId);
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

/* Prevent Clicking input Fields */
function disableEdit() {
    $("#oId,#inCusName,#inCusSalary,#inCusaddress,#iDate").css("pointer-events", "none");  //Invoice Details Section
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

/* Set Current Date to datepicker */
function setDate() {
    let d = new Date();
    let dd = d.toISOString().split("T")[0].split("-");
    // console.log(dd);
    $("#iDate").val(dd[0]+"-"+dd[1]+"-"+dd[2]);
    $("#hDate").text(dd[0]+"-"+dd[1]+"-"+dd[2]);
}

var fullTotal = 0;
function addItemToCart() {
    let id = selectedItemId;
    let iName = $("#itemNameO").val();
    let iQtyOnHand = $("#qtyOnHandO").val();
    let iPrice = $("#priceO").val();
    let iOrderQTY = $("#oQty").val();

    let total = 0;

    // Check Qty Availability
    if (iQtyOnHand >= iOrderQTY) {
        iQtyOnHand = iQtyOnHand - iOrderQTY;
    }else{
        alert("Enter Valid QTY");
        $("#oQty").val("");
        return;
    }
    


    //updateing qty
    for (let i = 0; i < itemDB.length; i++) {
        if (id == itemDB[i].getItemCode()) {
            itemDB[i].setItemQty(iQtyOnHand);
        }        
    }

    let newQty = 0;
    let newTotal= 0;

    if (checkDuplicates(id)==-1) {
        total = iOrderQTY * iPrice;
        fullTotal = fullTotal + total;
        let row = 
        `<tr><td>${id}</td><td>${iName}</td><td>${iPrice}</td><td>${iOrderQTY}<td>${total}</td></tr>`;
        $("#tbodyOrder").append(row);
        $("#lblFullTotal").text(fullTotal+" LKR");
        alert("23445");
        clearInputItems();

    }else{
        
        let rowNo = checkDuplicates(id);
        newQty = iOrderQTY;
        let oldQty = parseInt($($('#tbodyOrder>tr').eq(rowNo).children(":eq(3)")).text());
        let oldTotal = parseInt($($('#tbodyOrder>tr').eq(rowNo).children(":eq(4)")).text());

        fullTotal = fullTotal-oldTotal;
        newQty = parseInt(oldQty) + parseInt(newQty) ;
        newTotal = newQty * iPrice;
        fullTotal = fullTotal + newTotal;

        //Update row
        $('#tbodyOrder tr').eq(rowNo).children(":eq(3)").text(newQty);
        $('#tbodyOrder tr').eq(rowNo).children(":eq(4)").text(newTotal);

        $("#lblFullTotal").text(fullTotal+" LKR");
        alert("test");
        clearInputItems();
    }

}

/* Check Duplicate Item */
function checkDuplicates(itemId) {
    for (let i = 0; i < $("#tbodyOrder > tr").length; i++) {
        if (itemId == $('#tbodyOrder').children().eq(i).children().eq(0).text()) {
            alert(i);
            return i;
        }
        
    }
    return -1;
}

/* Clear Input Field on Selected Item Area */
function clearInputItems() {
    $("#itemIdCmb").val("");
    $("#itemNameO").val("");
    $("#qtyOnHandO").val("");
    $("#priceO").val("");
    $("#oQty").val("");
}