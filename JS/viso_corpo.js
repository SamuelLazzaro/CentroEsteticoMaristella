function isTouchDevice() {
    return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
  }

// Click su pulsante "Scopri di più"
$(".find_more_button").on("click", function () {
    var button_clicked = $(this).attr("id");
    var card_name = button_clicked.substring(0, button_clicked.indexOf('_'));

    card_name = card_name + "_header";

    var posY = 0;

    if($(".menu_button_div").css("display") != "none")
    {
        // Se sono in modalità cellulare devo considerare anche la height della menu_bar_div e lo spazio lasciato in alto
        posY = $("#" + card_name).position().top - $(".menu_bar_div").height() - 20;
    }
    else
    {
        // Sono in modalità laptop
        posY = $("#" + card_name).position().top + 5;
    }

    if(isTouchDevice() == true){
        $("#" + button_clicked).css("background-color", "#A555EC");
        $("#" + button_clicked).css("color", "#F8E8EE");

        setTimeout(function(){
            $("#" + button_clicked).removeAttr("style");
            // Eseguo uno scroll fino alla posizione Y che mi permette di vedere la sezione desiderata
            window.scrollTo(0, posY);
        }, 100);

    }
    
});