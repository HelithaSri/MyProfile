function OrderDTO(orderId,customerId,date,discount,total,subTotal) {
    var __oId = orderId;
    var __cId = customerId;
    var __date = date;
    var __discount = discount;
    var __total = total;
    var __subTotal = subTotal;

    this.setOrderId = function(orderId){
        __oId = orderId;
    }
    
    this.getOrderId = function(){
        return __oId;
    }

    this.setCustomerId = function(customerId){
        __cId = customerId;
    }
    
    this.getCustomerId = function(){
        return __cId;
    }

    this.setDate = function(date){
        __date = date;
    }
    
    this.getDate = function(){
        return __date;
    }

    this.setDiscount = function(discount){
        __discount = discount;
    }
    
    this.getDiscount = function(){
        return __discount;
    }

    this.setTotal = function(total){
        __total = total;
    }
    
    this.getTotal = function(){
        return __total;
    }

    this.setSubTotal = function(subTotal){
        __subTotal = subTotal;
    }
    
    this.getSubTotal = function(){
        return __subTotal;
    }

}