$("#btnAddCus").prop('disabled', true);

/* Validation - Start */
$('#error1').css({ "display": "none" });
$('#error2').css({ "display": "none" });
$('#error3').css({ "display": "none" });
$('#error4').css({ "display": "none" });

$('#error01').css({ "display": "none" });
$('#error02').css({ "display": "none" });
$('#error03').css({ "display": "none" });
$('#error04').css({ "display": "none" });

var regExCusID = /^(C00-)[0-9]{3,4}$/;
var RegExCusName = /^[A-z ]{5,20}$/;
var RegExCusAddress = /^[0-9/A-z. ,]{7,}$/;
var RegExCusSalary = /^[0-9]{1,}[.]?[0-9]{1,2}$/;

/* Functions Call Section - Start */

// Customer Validation Function Call - Start
validation(regExCusID, '#cusIdAdd', '#error1', '#cusNameAdd', '#btnAddCus');
validation(RegExCusName, '#cusNameAdd', '#error2', '#cusAddressAdd', '#btnAddCus');
validation(RegExCusAddress, '#cusAddressAdd', '#error3', '#cusSalaryAdd', '#btnAddCus');
validation(RegExCusSalary, '#cusSalaryAdd', '#error4', "#btnAddCus", '#btnAddCus');

validation(regExCusID, '#cusIdUpdate', '#error01', "#cusNameUpdate", '#btnUpdateCus');
validation(RegExCusName, '#cusNameUpdate', '#error02', '#cusAddressUpdate', '#btnUpdateCus');
validation(RegExCusAddress, '#cusAddressUpdate', '#error03', '#cusSalaryUpdate', '#btnUpdateCus');
validation(RegExCusSalary, '#cusSalaryUpdate', '#error04', '#btnUpdateCus', '#btnUpdateCus');


addCustomer(); //Add New Customer
loadAllCustomers(); //load all customers
clearSearch(); //Clear Search and Refresh table

/* Functions Call Section - End */



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
    // var customerObj = new CustomerObject();
    $("#btnAddCus").click(function () {

        let custId = $("#cusIdAdd").val();
        let custName = $("#cusNameAdd").val();
        let custAddress = $("#cusAddressAdd").val();
        let custSalary = $("#cusSalaryAdd").val();

        var customerObj = {
            __id: custId,
            __name: custName,
            __address: custAddress,
            __salary: custSalary
        }
        /* let btns =
            "<button class='btn btn-warning' data-bs-target='#updateCustomer' data-bs-toggle='modal'><i class='bi bi-arrow-clockwise'></i></button> <button class='btn btn-danger'><i class='bi bi-trash'></i></button>";

        customerObj.setCustomer(custId, custName, custAddress, custSalary, btns);
        */

        customerDB.push(customerObj);
        loadAllCustomers(); //load all customers
        // Clear input Fields
        $("#cusIdAdd,#cusNameAdd,#cusAddressAdd,#cusSalaryAdd").val("");
        bindCustomerRow(); //bind the events to the table rows after the row was added
    });
}
// Customer Add Function - End

// Load All Customers Function - Start
function loadAllCustomers() {
    $("#cusTblBody").empty(); //Duplicate Old rows remove
    let btns =
        "<button class='btn btn-warning' data-bs-target='#updateCustomer' data-bs-toggle='modal'><i class='bi bi-arrow-clockwise'></i></button> <button id='cus-delete' class='btn btn-danger'><i class='bi bi-trash'></i></button>";

    for (let i = 0; i < customerDB.length; i++) {
        let nRow =
            "<tr><td>" +
            customerDB[i].__id +
            "</td><td>" +
            customerDB[i].__name +
            "</td><td>" +
            customerDB[i].__address +
            "</td><td>" +
            customerDB[i].__salary +
            "</td><td class='text-center'>" +
            btns +
            "</td></tr>";
        console.log("s");
        $("#cusTblBody").append(nRow);
    }
}
// Load All Customers Function - End

// Bind Events Customer Row Function - Start
function bindCustomerRow() {
    $("#cusTblBody>tr").click(function () {

        let custId = $(this).children(":eq(0)").text();
        let custName = $(this).children(":eq(1)").text();
        let custAddress = $(this).children(":eq(2)").text();
        let custSalary = $(this).children(":eq(3)").text();

        $("#cusIdUpdate").val(custId);
        $("#cusNameUpdate").val(custName);
        $("#cusAddressUpdate").val(custAddress);
        $("#cusSalaryUpdate").val(custSalary);
    });
}
// Bind Events Customer Row - End

$("#button-cus-search").click(function () {
    let btns =
        "<button class='btn btn-warning' data-bs-target='#updateCustomer' data-bs-toggle='modal'><i class='bi bi-arrow-clockwise'></i></button> <button id='cus-delete' class='btn btn-danger'><i class='bi bi-trash'></i></button>";

    var searchId = $("#txt-cus-search").val();
    var response = searchCustomer(searchId);
    if (response) {
        $("#cusTblBody").empty();
        let nRow =
            "<tr><td>" +
            response.__id +
            "</td><td>" +
            response.__name +
            "</td><td>" +
            response.__address +
            "</td><td>" +
            response.__salary +
            "</td><td class='text-center'>" +
            btns +
            "</td></tr>";
        $("#cusTblBody").append(nRow);
        bindCustomerRow();
    } else {
        alert("No Such a customer");
        clearSearch(); //Clear Search and Refresh table

    }
});

function searchCustomer(id) {
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].__id == id) {
            return customerDB[i];
        }
    }
}

//clear search function - start
function clearSearch() {
    $("#clear-btn-cus").click(function () {
        loadAllCustomers(); //load all customers
        $("#txt-cus-search").val("");
    });
}
//clear search function - End