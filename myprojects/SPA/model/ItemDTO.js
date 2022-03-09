function ItemDTO(code,name,price,qty,btn) {
    var __iCode = code;
    var __iName = name;
    var __iPrice = price;
    var __iQty = qty;
    var __btn = btn;

    this.setItemCode = function(code){
        __iCode = code;
    }
    
    this.getItemCode = function(){
        return __iCode;
    }

    this.setItemName = function(name){
        __iName = name;
    }
    
    this.getItemName = function(){
        return __iName;
    }

    this.setItemPrice = function(price){
        __iPrice = price;
    }
    
    this.getItemPrice = function(){
        return __iPrice;
    }

    this.setItemQty = function(qty){
        __iQty = qty;
    }
    
    this.getItemQty = function(){
        return __iQty;
    }

    this.setItemBtn = function (btn) {
        __btn=btn;
    }

    this.getItemBtn = function () {
        return __btn;
    }
}
