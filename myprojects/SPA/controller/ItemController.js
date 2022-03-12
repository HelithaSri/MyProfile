/**
 * @author : HelithaSri
 * @email : helitha.pravin@gmail.com
 * @create date : 2022-03-07  13:00
 * @modify date : 2022-03-07  23:24
 * @desc [ItemController]
 */
var clickedRowIId;
/* Functions Call Section - Start */

generateItemId();   //Generate New Item Code
addItem();  //Add New Item
loadAllItems(); //Load All items
clearSearch();  //Clear Search and Refresh table
disableEditFields();    //Prevent Editing Item Code

/* Functions Call Section - End */

// Item Add Function - Start
function addItem() {
    $("#btnAddItem").click(function () {

        let itemId = $("#itemCode").val();
        let itemName = $("#itemName").val();
        let itemQty = $("#itemQty").val();
        let itemPrice = $("#itemPrice").val();
        let btns =
        "<button class='btn btn-warning' data-bs-target='#updateItem' data-bs-toggle='modal'><i class='bi bi-arrow-clockwise'></i></button> <button  class='btn btn-danger item-delete'><i class='bi bi-trash'></i></button>";

        /* var itemObj = {
            __id: itemId,
            __name: itemName,
            __qty: itemQty,
            __price: itemPrice
        } */

        var itemObj = new ItemDTO(itemId,itemName,itemPrice,itemQty,btns)

        itemDB.push(itemObj);
        console.log(itemDB);
        loadAllItems(); //load all Items
        // $("#itemCode,#itemName,#itemQty,#itemPrice").val(""); // Clear input Fields
        generateItemId();
        //bindItemRow(); //bind the events to the table rows after the row was added
        loadAllItemCodes(); //Load Item ID's to Combo Box
    });
}
// Item Add Function - End

// Load All Items Function - Start
function loadAllItems() {
    $("#itemTblBody").empty(); //Duplicate Old rows remove
    /* let btns =
        "<button class='btn btn-warning' data-bs-target='#updateItem' data-bs-toggle='modal'><i class='bi bi-arrow-clockwise'></i></button> <button id='item-delete' class='btn btn-danger'><i class='bi bi-trash'></i></button>";
 */
    for (let i = 0; i < itemDB.length; i++) {
        let nRow =
            "<tr><td>" +
            itemDB[i].getItemCode() +
            "</td><td>" +
            itemDB[i].getItemName() +
            "</td><td>" +
            itemDB[i].getItemQty() +
            "</td><td>" +
            itemDB[i].getItemPrice() +
            "</td><td class='text-center'>" +
            itemDB[i].getItemBtn() +
            "</td></tr>";
        console.log("s");
        $("#itemTblBody").append(nRow);
        bindItemRow();
        deleteItem();
    }
    clearFieldsItem();
}
// Load All Items Function - End

// Bind Events Item Row Function - Start
function bindItemRow() {
    $("#itemTblBody > tr").click(function () {
        clickedRowIId = $(this).children(":eq(0)").text();
        let itemName = $(this).children(":eq(1)").text();
        let itemPrice = $(this).children(":eq(2)").text();
        let itemQty = $(this).children(":eq(3)").text();

        $("#updateItemCode").val(clickedRowIId);
        $("#updateItemName").val(itemName);
        $("#updateItemQty").val(itemQty);
        $("#updateItemPrice").val(itemPrice);
    });
}
// Bind Events Item Row - End

$("#btn-item-search").click(function () {
    /* let btns =
        "<button class='btn btn-warning' data-bs-target='#updateItem' data-bs-toggle='modal'><i class='bi bi-arrow-clockwise'></i></button> <button id='item-delete' class='btn btn-danger'><i class='bi bi-trash'></i></button>";
 */
    var searchId = $("#txt-item-search").val();
    var response = searchItem(searchId);
    if (response) {
        $("#itemTblBody").empty();
        let nRow =
            "<tr><td>" +
            response.getItemCode() +
            "</td><td>" +
            response.getItemName() +
            "</td><td>" +
            response.getItemQty() +
            "</td><td>" +
            response.getItemPrice() +
            "</td><td class='text-center'>" +
            response.getItemBtn() +
            "</td></tr>";
        $("#itemTblBody").append(nRow);
        bindItemRow();
        deleteItem();
    } else {
        alert("No Such a Item");
        clearSearch(); //Clear Search and Refresh table
        loadAllItems();

    }
});

function searchItem(id) {
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].getItemCode() == id) {
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

function deleteItem() {
    $(".item-delete").click(function () {
        
        for (let i = 0; i < itemDB.length; i++) {
            console.log("awa");
            // console.log(customerDB[i].getCustomerID());
            if (itemDB[i].getItemCode() == clickedRowIId) {
                itemDB.splice(i, 1);
                console.log("if");
            }else{
                console.log("no");
            }
        }
        loadAllItems();
        // console.log("daf57");
    });
}

$("#btnUpdateItem").click(function () {
    let itemId = $("#updateItemCode").val();
    let itemName = $("#updateItemName").val();
    let itemQty = $("#updateItemQty").val();
    let itemPrice = $("#updateItemPrice").val();
    
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].getItemCode()==itemId) {
            itemDB[i].setItemName(itemName);
            itemDB[i].setItemQty(itemQty);
            itemDB[i].setItemPrice(itemPrice);
        }
    }
    loadAllItems();
});

function generateItemId() {
    let index = itemDB.length - 1;
    let id;
    let temp;
    if (index != -1) {
        id = itemDB[itemDB.length - 1].getItemCode();
        temp = id.split("-")[1];
        temp++;
    }

    if (index == -1) {
        $("#itemCode").val("I00-001");
    } else if (temp <= 9) {
        $("#itemCode").val("I00-00" + temp);
    } else if (temp <= 99) {
        $("#itemCode").val("I00-0" + temp);
    } else {
        $("#itemCode").val("I00-" + temp);
    }
}

function disableEditFields() {
    $("#itemCode,#updateItemCode").css("pointer-events", "none");
}

function clearFieldsItem() {
    $("#itemName,#itemQty,#itemPrice").val("");    // Clear input Fields (Add)
    $("#updateItemName,#updateItemQty,#updateItemPrice").val(""); // Clear input Fields (Update)
    $("#txt-item-search").val(""); //Clear input Field (Search)
}