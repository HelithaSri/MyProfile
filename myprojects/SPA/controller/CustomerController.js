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
var RegExCusName =/^[A-z ]{5,20}$/;
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

//Add New Customer - Start
addCustomer();


/* Functions Call Section - End */



// Customer Validation Function - Start
function validation(regEx, id, error, nextId, btn) {
    $(id).keyup(function (event) {
      let input = $(id).val();
      if (regEx.test(input)) {
        $(id).css({ 'border': '2px solid green', 'background-color': '#fff' });
        $(error).css({"display":"none"});
        if (event.key == "Enter") {
            $(btn).prop('disabled', false);
            $(nextId).focus();
        }
      } else {
        $(id).css({ 'border': '2px solid red', 'background-color': '#ffe6e6' });
        $(error).css({"color":"red","display":"block"});
        $(btn).prop('disabled', true);
      }
    });
}
// Customer Validation Function - End

// Customer Add Function - Start
function addCustomer() {
    var customerObj = new CustomerObject();
    $("#btnAddCus").click(function () {

        let custId = $("#cusIdAdd").val();
        let custName = $("#cusNameAdd").val();
        let custAddress = $("#cusAddressAdd").val();
        let custSalary = $("#cusSalaryAdd").val();

        let btns =
            "<button class='btn btn-warning' data-bs-target='#updateCustomer' data-bs-toggle='modal'><i class='bi bi-arrow-clockwise'></i></button> <button class='btn btn-danger'><i class='bi bi-trash'></i></button>";

        customerObj.setCustomer(custId, custName, custAddress, custSalary, btns);
        customerDB.push(customerObj);
        console.log(customerDB);

        // Clear input Fields
        $("#cusIdAdd,#cusNameAdd,#cusAddressAdd,#cusSalaryAdd").val("");

        loadAllCustomers();
    });
    
}
// Customer Add Function - End

function loadAllCustomers() {
    for (let i = 0; i < customerDB.length; i++) {
        console.log("hi");
        console.log(customerDB[i]);
        console.log("h23");
        console.log(customerDB[i].__cID);
    }
}