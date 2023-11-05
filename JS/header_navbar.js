// Expand & Collaps phone navbar
$("#menu_button_div").on("click", function(){
  $("#show_hide_phone_navbar").slideToggle();
});

var NavBarBack_isAdded = false;
// var MenuBar_height = $(".menu_bar_div").height() + 35;

function resize_scroll() {

  // console.log(document.querySelector(".content_div").getBoundingClientRect().top);

  if (document.querySelector(".content_div").getBoundingClientRect().top <= 66) {
    // if($(window).width() <= 913){                             // NON usare .css("width") perche' va in errore (vedi console nel caso)

    if($("#menu_button_div").css("display") != "none"){
      $(".menu_bar_div").css("position", "fixed");
      $(".menu_bar_div").css("top", "10px");
      $(".menu_bar_div").css("right", "10px");
      $(".menu_bar_div").css("left", "10px");

      $(".content_div").css("margin-top", 66);

      $(".navbar_background").css("visibility", "visible");

    } else {
      $(".menu_bar_div").removeAttr("style");   // Rimuovo l'inline-css aggiunto nell'if
      $(".content_div").removeAttr("style");
      // $(".navbar_background").remove();
      $(".navbar_background").removeAttr("style");
      // NavBarBack_isAdded = false;
    }  
  } else {
    $(".menu_bar_div").removeAttr("style");   // Rimuovo l'inline-css aggiunto nell'if
    $(".content_div").removeAttr("style");
    // $(".navbar_background").remove();
    $(".navbar_background").removeAttr("style");
    // NavBarBack_isAdded = false;
  }
}

/////////////////////////////////////////////
// RESIZE
/////////////////////////////////////////////
$(window).resize(resize_scroll);

/////////////////////////////////////////////
// SCROLL
/////////////////////////////////////////////
$(window).scroll(resize_scroll);
