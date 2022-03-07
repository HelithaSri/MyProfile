addCustomer();

// Item Add Function - Start
function addCustomer() {
    $("#btnAddItem").click(function () {

        let itemId = $("#itemCode").val();
        let itemName = $("#itemName").val();
        let itemQty = $("#itemQty").val();
        let itemPrice = $("#itemPrice").val();

        var itemObj = {
            __id: itemId,
            __name: itemName,
            __qty: itemQty,
            __price: itemPrice
        }
        /* let btns =
            "<button class='btn btn-warning' data-bs-target='#updateCustomer' data-bs-toggle='modal'><i class='bi bi-arrow-clockwise'></i></button> <button class='btn btn-danger'><i class='bi bi-trash'></i></button>";

        customerObj.setCustomer(custId, custName, custAddress, custSalary, btns);
        */

        itemDB.push(itemObj);
        console.log(itemDB);
        loadAllItems(); //load all Items
        // Clear input Fields
        $("#itemCode,#itemName,#itemQty,#itemPrice").val("");
        //bindCustomerRow(); //bind the events to the table rows after the row was added
    });
}
// Item Add Function - End

// Load All Items Function - Start
function loadAllItems() {
    $("#itemTblBody").empty(); //Duplicate Old rows remove
    let btns =
        "<button class='btn btn-warning' data-bs-target='#updateItem' data-bs-toggle='modal'><i class='bi bi-arrow-clockwise'></i></button> <button id='item-delete' class='btn btn-danger'><i class='bi bi-trash'></i></button>";

    for (let i = 0; i < itemDB.length; i++) {
        let nRow =
            "<tr><td>" +
            itemDB[i].__id +
            "</td><td>" +
            itemDB[i].__name +
            "</td><td>" +
            itemDB[i].__qty +
            "</td><td>" +
            itemDB[i].__price +
            "</td><td class='text-center'>" +
            btns +
            "</td></tr>";
        console.log("s");
        $("#itemTblBody").append(nRow);
    }
}
// Load All Items Function - End