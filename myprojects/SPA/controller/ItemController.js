/**
 * @author : HelithaSri
 * @email : helitha.pravin@gmail.com
 * @create date : 2022-03-07  13:00
 * @modify date : 2022-03-07  23:24
 * @desc [ItemController]
 */

/* Functions Call Section - Start */

addItem();  //Add New Item
loadAllItems(); //Load All items
clearSearch();  //Clear Search and Refresh table

/* Functions Call Section - End */

// Item Add Function - Start
function addItem() {
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

        itemDB.push(itemObj);
        console.log(itemDB);
        loadAllItems(); //load all Items
        
        $("#itemCode,#itemName,#itemQty,#itemPrice").val(""); // Clear input Fields
        bindItemRow(); //bind the events to the table rows after the row was added
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

// Bind Events Item Row Function - Start
function bindItemRow() {
    $("#itemTblBody>tr").click(function () {
        let itemId = $(this).children(":eq(0)").text();
        let itemName = $(this).children(":eq(1)").text();
        let itemQty = $(this).children(":eq(2)").text();
        let itemPrice = $(this).children(":eq(3)").text();

        $("#updateItemCode").val(itemId);
        $("#updateItemName").val(itemName);
        $("#updateItemQty").val(itemQty);
        $("#updateItemPrice").val(itemPrice);
    });
}
// Bind Events Item Row - End

$("#btn-item-search").click(function () {
    let btns =
        "<button class='btn btn-warning' data-bs-target='#updateItem' data-bs-toggle='modal'><i class='bi bi-arrow-clockwise'></i></button> <button id='item-delete' class='btn btn-danger'><i class='bi bi-trash'></i></button>";

    var searchId = $("#txt-item-search").val();
    var response = searchItem(searchId);
    if (response) {
        $("#itemTblBody").empty();
        let nRow =
            "<tr><td>" +
            response.__id +
            "</td><td>" +
            response.__name +
            "</td><td>" +
            response.__qty +
            "</td><td>" +
            response.__price +
            "</td><td class='text-center'>" +
            btns +
            "</td></tr>";
        $("#itemTblBody").append(nRow);
        bindItemRow();
    } else {
        alert("No Such a Item");
        clearSearch(); //Clear Search and Refresh table

    }
});

function searchItem(id) {
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].__id == id) {
            return itemDB[i];
        }
    }
}

//clear search function - start
function clearSearch() {
    $("#clear-btn-item").click(function () {
        console.log("sda");
        loadAllItems(); //load all Items
        $("#txt-item-search").val("");
    });
}
//clear search function - End