// Expand & Collaps phone navbar
// $(".menu_button_div").on("mouseenter", function(){
//   $(".menu_button_div").addClass("menu_button_div_hover");
//   $(".menu_button_line").prop("background-color", "#F9F5F6");
// });

// $(".menu_button_div").on("mouseleave", function(){
//   $(".menu_button_div").removeClass("menu_button_div_hover");
//   $(".menu_button_line").removeProp("background-color");
// });

function isTouchDevice() {
  return (('ontouchstart' in window) ||
     (navigator.maxTouchPoints > 0) ||
     (navigator.msMaxTouchPoints > 0));
}

$(".menu_button_div").on("click", function(){
  $("#show_hide_phone_navbar").slideToggle();

  if($(".menu_button_div").hasClass("three_lines")){
    $(".menu_button_line#top").toggleClass("menu_top_line");
    $(".menu_button_line#center").toggleClass("menu_center_line");
    $(".menu_button_line#bottom").toggleClass("menu_bottom_line");
    $(".menu_button_div").removeClass("three_lines");
  }else{
    $(".menu_button_line#top").toggleClass("menu_top_line_X");
    $(".menu_button_line#center").toggleClass("menu_center_line_X");
    $(".menu_button_line#bottom").toggleClass("menu_bottom_line_X");
  }


  // $(".menu_button_div").toggleClass("menu_button_clicked");
  // $(".menu_button_line").toggleClass("menu_button_clicked_line");

  if(isTouchDevice() == true){
    $(".menu_button_div").css("background-color", "#A555EC");
    $(".menu_button_line").css("background-color", "#F8E8EE");
    setTimeout(function(){
      $(".menu_button_div").removeAttr("style");
      $(".menu_button_line").removeAttr("style");
    }, 100);
  }
});

var NavBarBack_isAdded = false;
// var MenuBar_height = $(".menu_bar_div").height() + 35;

function resize_scroll() {

  // console.log(document.querySelector(".content_div").getBoundingClientRect().top);

  if (document.querySelector(".content_div").getBoundingClientRect().top <= 66) {
    // if($(window).width() <= 913){                             // NON usare .css("width") perche' va in errore (vedi console nel caso)

    if($(".menu_button_div").css("display") != "none"){
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
