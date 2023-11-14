// ATTENZIONE:
// L'attributo "id" che ha ogni slide_img deve corrispondere all' "id" che ha ogni "button" di classe "slide_indicator":
// quest'ultimo deve però avere tale numero preceduto dalla lettera 'b'.
//

var num_images = $(".slide_img").length;
var str_id_active = "";

// Restituisce TRUE se il dispositivo e' un touch screen, altrimenti FALSE
function isTouchDevice() {
    return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
}

function clickBehaviour_for_touchScreen(arrow_selector){
    // Per dispositivi touch gestisco il cambio del border-color delle frecce tramite jQuery, dato che
    // la proprieta' "hover" non funziona correttamente per tali dispositivi
    if(isTouchDevice() == true){
        $(arrow_selector).css("border-color", "rgba(0, 0, 0, 0.5");
        setTimeout(function(){
          $(arrow_selector).removeAttr("style");
        }, 100);
    }
}

////////////////////////////////////////
//  PREVIOUS ARROW
////////////////////////////////////////
var id_active;

$(".arrow.left").on("click", function(){
    str_id_active = $(".slide_active").attr("id");      // Get attribute "id" number of the actived slide

    id_active = str_id_active[str_id_active.length-1];  // Get last element of the string

    $(".slide_active").removeClass("slide_active");
    $(".slide_indicator").removeAttr("style");

    if(id_active == 1){
        $("#slide" + num_images).addClass("slide_active");
        $("#b" + num_images).css("background-color", "#A555EC");
    }else{
        $("#slide" + (--id_active)).addClass("slide_active");
        $("#b" + (id_active)).css("background-color", "#A555EC");
    }

    clickBehaviour_for_touchScreen("#previous");
});

////////////////////////////////////////
//  NEXT ARROW
////////////////////////////////////////
$(".arrow.right").on("click", function(){
    str_id_active = $(".slide_active").attr("id");      // Get attribute "id" number of the actived slide

    id_active = str_id_active[str_id_active.length-1];  // Get last element of the string

    $(".slide_active").removeClass("slide_active");
    $(".slide_indicator").removeAttr("style");

    if(id_active == num_images){
        $("#slide1").addClass("slide_active");
        $("#b1").css("background-color", "#A555EC");
    }else{
        $("#slide" + (++id_active)).addClass("slide_active");
        $("#b" + (id_active)).css("background-color", "#A555EC");
    }

    clickBehaviour_for_touchScreen("#next");
});

////////////////////////////////////////
//  SLIDE BUTTON INDICATOR
////////////////////////////////////////
$(".slide_indicator").on("click", function(){
    var button_str_id = $(this).attr("id");
    var button_id = button_str_id[1];
    
    $(".slide_active").removeClass("slide_active");
    $(".slide_indicator").removeAttr("style");

    $("#slide" + button_id).addClass("slide_active");
    $("#b" + button_id).css("background-color", "#A555EC");

});
