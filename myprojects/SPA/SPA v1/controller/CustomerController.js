$("#btnAddCus").prop('disabled', true);
var clickedRowCId;
/* Validation - Start */
$('#error1').css({ "display": "none" });
$('#error2').css({ "display": "none" });
$('#error3').css({ "display": "none" });
$('#error4').css({ "display": "none" });

$('#error01').css({ "display": "none" });
$('#error02').css({ "display": "none" });
$('#error03').css({ "display": "none" });
$('#error04').css({ "display": "none" });

// var regExCusID = /^(C00-)[0-9]{3,4}$/;
var RegExCusName = /^[A-z ]{5,20}$/;
var RegExCusAddress = /^[0-9/A-z. ,]{7,}$/;
var RegExCusSalary = /^[0-9]{1,}[.]?[0-9]{1,2}$/;

/* Functions Call Section - Start */

// Customer Validation Function Call - Start
// validation(regExCusID, '#cusIdAdd', '#error1', '#cusNameAdd', '#btnAddCus');
validation(RegExCusName, '#cusNameAdd', '#error2', '#cusAddressAdd', '#btnAddCus');
validation(RegExCusAddress, '#cusAddressAdd', '#error3', '#cusSalaryAdd', '#btnAddCus');
validation(RegExCusSalary, '#cusSalaryAdd', '#error4', "#btnAddCus", '#btnAddCus');

// validation(regExCusID, '#cusIdUpdate', '#error01', "#cusNameUpdate", '#btnUpdateCus');
validation(RegExCusName, '#cusNameUpdate', '#error02', '#cusAddressUpdate', '#btnUpdateCus');
validation(RegExCusAddress, '#cusAddressUpdate', '#error03', '#cusSalaryUpdate', '#btnUpdateCus');
validation(RegExCusSalary, '#cusSalaryUpdate', '#error04', '#btnUpdateCus', '#btnUpdateCus');

generateId();   //Generate New Customer ID
addCustomer(); //Add New Customer
loadAllCustomers(); //load all customers
clearSearch(); //Clear Search and Refresh table
disableEdit();  //Prevent Editing Customer ID
// deleteCustomer();

/* Functions Call Section - End */

$("#addCusModelPop").click(function(){
    generateId();
});

// Customer Validation Function - Start
function validation(regEx, id, error, nextId, btn) {
    $(id).keyup(function (event) {
        let input = $(id).val();
        if (regEx.test(input)) {
            $(id).css({ 'border': '2px solid green', 'background-color': '#fff' });
            $(error).css({ "display": "none" });
            if (event.key == "Enter") {
                $(btn).prop('disabled', false);
                $(nextId).focus();
            }
        } else {
            $(id).css({ 'border': '2px solid red', 'background-color': '#ffe6e6' });
            $(error).css({ "color": "red", "display": "block" });
            $(btn).prop('disabled', true);
        }
    });
}

// Customer Validation Function - End

// Customer Add Function - Start
function addCustomer() {

    $("#btnAddCus").click(function () {

        let custId = $("#cusIdAdd").val();
        let custName = $("#cusNameAdd").val();
        let custAddress = $("#cusAddressAdd").val();
        let custSalary = $("#cusSalaryAdd").val();
        let btns =
            "<button class='btn btn-warning' data-bs-target='#updateCustomer' data-bs-toggle='modal'><i class='bi bi-arrow-clockwise'></i></button> <button class='btn btn-danger cus-delete'><i class='bi bi-trash'></i></button>";

        var customerObj = new CustomerDTO(custId, custName, custAddress, custSalary, btns);
        customerDB.push(customerObj);

        loadAllCustomers(); //load all customers
        clearFields()   //Clear Input Fields
        generateId();
        loadAllCustomerIds();   //Load Customer ID's to Combo Box
    });
}
// Customer Add Function - End


// Load All Customers Function - Start
function loadAllCustomers() {

    $("#cusTblBody").empty(); //Duplicate Old rows remove
    for (let i = 0; i < customerDB.length; i++) {
        let nRow =
            "<tr><td>" +
            customerDB[i].getCustomerID() +
            "</td><td>" +
            customerDB[i].getCustomerName() +
            "</td><td>" +
            customerDB[i].getCustomerAddress() +
            "</td><td>" +
            customerDB[i].getCustomerSalary() +
            "</td><td class='text-center'>" +
            customerDB[i].getCustomerbtn() +
            "</td></tr>";

        $("#cusTblBody").append(nRow);
        bindCustomerRow();
        deleteCustomer();
    }
}
// Load All Customers Function - End


// Bind Events Customer Row Function - Start
function bindCustomerRow() {
    $("#cusTblBody>tr").click(function () {

        clickedRowCId = $(this).children(":eq(0)").text();
        let custName = $(this).children(":eq(1)").text();
        let custAddress = $(this).children(":eq(2)").text();
        let custSalary = $(this).children(":eq(3)").text();

        $("#cusIdUpdate").val(clickedRowCId);
        $("#cusNameUpdate").val(custName);
        $("#cusAddressUpdate").val(custAddress);
        $("#cusSalaryUpdate").val(custSalary);
    });
}
// Bind Events Customer Row - End

$("#button-cus-search").click(function () {

    var searchId = $("#txt-cus-search").val();
    var response = searchCustomer(searchId);
    if (response) {
        $("#cusTblBody").empty();
        let nRow =
            "<tr><td>" +
            response.getCustomerID() +
            "</td><td>" +
            response.getCustomerName() +
            "</td><td>" +
            response.getCustomerAddress() +
            "</td><td>" +
            response.getCustomerSalary() +
            "</td><td class='text-center'>" +
            response.getCustomerbtn() +
            "</td></tr>";
        $("#cusTblBody").append(nRow);
        bindCustomerRow();
        deleteCustomer();
    } else {
        alert("No Such a customer");
        clearSearch(); //Clear Search and Refresh table
    }
});

function searchCustomer(id) {
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].getCustomerID() == id) {
            return customerDB[i];
        }
    }
}

//clear search function - start
function clearSearch() {
    $("#clear-btn-cus").click(function () {
        loadAllCustomers(); //load all customers
        clearFields()   //Clear Input Fields
    });
}
//clear search function - End

//Delete Customer Function - Start
function deleteCustomer() {
    $(".cus-delete").click(function () {
        for (let i = 0; i < customerDB.length; i++) {
            // console.log(customerDB[i].getCustomerID());
            if (customerDB[i].getCustomerID() == clickedRowCId) {
                customerDB.splice(i, 1);
            }
        }
        loadAllCustomers();
        clearFields()   //Clear Input Fields

    });
}
//Delete Customer Function - End

$("#btnUpdateCus").click(function () {
    let custId = $("#cusIdUpdate").val();
    let custName = $("#cusNameUpdate").val();
    let custAddress = $("#cusAddressUpdate").val();
    let custSalary = $("#cusSalaryUpdate").val();

    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].getCustomerID() == custId) {
            customerDB[i].setCustomerName(custName);
            customerDB[i].setCustomerAddress(custAddress);
            customerDB[i].setCustomerSalary(custSalary);
        }
    }
    loadAllCustomers();
    clearFields()   //Clear Input Fields
});

function generateId() {
    let index = customerDB.length - 1;
    let id;
    let temp;
    if (index != -1) {
        id = customerDB[customerDB.length - 1].getCustomerID();
        temp = id.split("-")[1];
        temp++;
    }

    if (index == -1) {
        $("#cusIdAdd").val("C00-001");
    } else if (temp <= 9) {
        $("#cusIdAdd").val("C00-00" + temp);
    } else if (temp <= 99) {
        $("#cusIdAdd").val("C00-0" + temp);
    } else {
        $("#cusIdAdd").val("C00-" + temp);
    }
}

function disableEdit() {
    $("#cusIdAdd,#cusIdUpdate").css("pointer-events", "none");
}

function clearFields() {
    $("#cusNameAdd,#cusAddressAdd,#cusSalaryAdd").val("");    // Clear input Fields (Add)
    $("#cusNameUpdate,#cusAddressUpdate,#cusSalaryUpdate").val(""); // Clear input Fields (Update)
    $("#txt-cus-search").val(""); //Clear input Field (Search)
}