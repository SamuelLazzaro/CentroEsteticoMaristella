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

$("#left_circle").on("click", function(){
    str_id_active = $(".slide_active").attr("id");      // Get attribute "id" number of the actived slide

    id_active = str_id_active.slice(str_id_active.indexOf('_') + 1);  // Get number after '_' character

    console.log("id = " + id_active);
    $(".slide_active").removeClass("slide_active");
    $(".slide_indicator").removeAttr("style");

    if(id_active == 1){
        $("#slide_" + num_images).addClass("slide_active");
        $("#b" + num_images).css("background-color", "#A555EC");
    }else{
        $("#slide_" + (--id_active)).addClass("slide_active");
        $("#b" + (id_active)).css("background-color", "#A555EC");
    }

    clickBehaviour_for_touchScreen("#previous");
});

////////////////////////////////////////
//  NEXT ARROW
////////////////////////////////////////
$("#right_circle").on("click", function(){
    str_id_active = $(".slide_active").attr("id");      // Get attribute "id" number of the actived slide

    id_active = str_id_active.slice(str_id_active.indexOf('_') + 1);  // Get number after '_' character

    $(".slide_active").removeClass("slide_active");
    $(".slide_indicator").removeAttr("style");

    if(id_active == num_images){
        $("#slide_1").addClass("slide_active");
        $("#b1").css("background-color", "#A555EC");
    }else{
        $("#slide_" + (++id_active)).addClass("slide_active");
        $("#b" + (id_active)).css("background-color", "#A555EC");
    }

    clickBehaviour_for_touchScreen("#next");
});

////////////////////////////////////////
//  SLIDE BUTTON INDICATOR
////////////////////////////////////////
$(".slide_indicator").on("click", function(){
    var button_str_id = $(this).attr("id");
    var button_id = button_str_id.slice(1);     // .slice(1) in quanto id="bXXX" quindi prendo tutto cio' che c'e' dopo la 'b'
    
    $(".slide_active").removeClass("slide_active");
    $(".slide_indicator").removeAttr("style");

    $("#slide_" + button_id).addClass("slide_active");
    $("#b" + button_id).css("background-color", "#A555EC");

});
