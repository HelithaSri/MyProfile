$("#mobile_menu_close_btn").hide();


const menu = $("#sec-menu");

$("#mobile_menu_btn").click(function(){
    $("html").css({'overflow':'hidden','height':'100vh'});
    menu.css('display','flex');
    $("#mobile_menu_close_btn").show();
    $("#mobile_menu_btn").hide();
});

$("#mobile_menu_close_btn").click(function(){
    menu.hide();
    $("html").css({'overflow':'auto','height':'100vh'});
    $("#mobile_menu_close_btn").hide();
    $("#mobile_menu_btn").show();
});

$("#menu_ul>li").click(function(){
    menu.hide();
    $("html").css({'overflow':'auto','height':'100vh'});
    $("#mobile_menu_close_btn").hide();
    $("#mobile_menu_btn").show();
});