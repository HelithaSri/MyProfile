function CustomerObject(id,name,address,salary,btn) {
    var __cID =id;
    var __cName = name;
    var __cAddress = address;
    var __cSalary =salary;
    var __btn = btn;

    this.setCustomer = function (id,name,address,salary,btn) {
        this.__cID=id;
        this.__cName=name;
        this.__cAddress=address;
        this.__cSalary=salary;
        this.__btn=btn;
    }

    this.getCustomerID = function () {
        return this.__cID;
    }

    this.setCustomerID = function (id) {
        this.__cID=id;
    }

    this.getCustomerName = function () {
        return this.__cName;
    }

    this.setCustomerName = function (name) {
        this.__cName=name;
    }

    this.getCustomerAddress = function () {
        return this.__cAddress;
    }

    this.setCustomerAddress = function (address) {
        this.__cAddress=address;
    }

    this.getCustomerSalary = function () {
        return this.__cSalary;
    }

    this.setCustomerSalary = function (salary) {
        this.__cSalary=salary;
    }

    this.getCustomerbtn = function () {
        return this.__btn;
    }

    this.setCustomerbtn = function (btn) {
        this.__btn=btn;
    }
}
