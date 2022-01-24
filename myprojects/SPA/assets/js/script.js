// document.getElementById("home").style.setProperty("Display","none","important");
document.getElementById("order").style.setProperty("Display","none","important");
document.getElementById("item").style.setProperty("Display","none","important");
document.getElementById("cutomer").style.setProperty("Display","none","important");

// NavBar clicks
document.getElementById("home-click").addEventListener("click",function (){
    document.getElementById("home").style.setProperty("Display","flex","important");

    document.getElementById("order").style.setProperty("Display","none","important");
    document.getElementById("item").style.setProperty("Display","none","important");
    document.getElementById("cutomer").style.setProperty("Display","none","important");
});

document.getElementById("order-click").addEventListener("click",function (){
    document.getElementById("order").style.setProperty("Display","block","important");

    document.getElementById("home").style.setProperty("Display","none","important");
    document.getElementById("item").style.setProperty("Display","none","important");
    document.getElementById("cutomer").style.setProperty("Display","none","important");
});

document.getElementById("customer-click").addEventListener("click",function (){
    document.getElementById("cutomer").style.setProperty("Display","block","important");

    document.getElementById("home").style.setProperty("Display","none","important");
    document.getElementById("item").style.setProperty("Display","none","important");
    document.getElementById("order").style.setProperty("Display","none","important");
});

document.getElementById("item-click").addEventListener("click",function (){
    document.getElementById("item").style.setProperty("Display","block","important");

    document.getElementById("cutomer").style.setProperty("Display","none","important");
    document.getElementById("home").style.setProperty("Display","none","important");
    document.getElementById("order").style.setProperty("Display","none","important");
});

// Home Page div clicks
document.getElementById("home-clicks").addEventListener("click",function (){
    document.getElementById("home").style.setProperty("Display","flex","important");

    document.getElementById("order").style.setProperty("Display","none","important");
    document.getElementById("item").style.setProperty("Display","none","important");
    document.getElementById("cutomer").style.setProperty("Display","none","important");
});

document.getElementById("order-clicks").addEventListener("click",function (){
    document.getElementById("order").style.setProperty("Display","block","important");

    document.getElementById("home").style.setProperty("Display","none","important");
    document.getElementById("item").style.setProperty("Display","none","important");
    document.getElementById("cutomer").style.setProperty("Display","none","important");
});

document.getElementById("customer-clicks").addEventListener("click",function (){
    document.getElementById("cutomer").style.setProperty("Display","block","important");

    document.getElementById("home").style.setProperty("Display","none","important");
    document.getElementById("item").style.setProperty("Display","none","important");
    document.getElementById("order").style.setProperty("Display","none","important");
});

document.getElementById("item-clicks").addEventListener("click",function (){
    document.getElementById("item").style.setProperty("Display","block","important");

    document.getElementById("cutomer").style.setProperty("Display","none","important");
    document.getElementById("home").style.setProperty("Display","none","important");
    document.getElementById("order").style.setProperty("Display","none","important");
});