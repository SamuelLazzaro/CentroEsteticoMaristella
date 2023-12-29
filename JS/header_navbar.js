// Expand & Collaps phone navbar
// $(".menu_button_div").on("mouseenter", function(){
//   $(".menu_button_div").addClass("menu_button_div_hover");
//   $(".menu_button_line").prop("background-color", "#F9F5F6");
// });

// $(".menu_button_div").on("mouseleave", function(){
//   $(".menu_button_div").removeClass("menu_button_div_hover");
//   $(".menu_button_line").removeProp("background-color");
// });

var XisPressed = false;

function isTouchDevice() {
  return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
}

var scrollbarWidth = 0;
var bodyMarginRight = 0;

function getScrollbarWidth() {

  scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  bodyMarginRight = scrollbarWidth + 10;    //10 per il .body margin-right in style.css

}


$(".menu_button_div").on("click", function(){
  getScrollbarWidth();  // Non so se serve eseguirla ad ogni ciclo

  $("#show_hide_phone_navbar").slideToggle(500);  // Set 500ms for slideUp & slideDown

  // Nascondo la scrollbar
  document.body.style.overflow = 'hidden';
  $("body").css("margin-right", bodyMarginRight+"px");
  $(".menu_bar_div").css("right", bodyMarginRight+"px");

  XisPressed = false;

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

  //Non so se può servire quando premo la X
  if($(".menu_button_line#top").hasClass("menu_top_line_X")){
    $(".content_div").removeAttr("style");  // Necessario per far ricomparire il content_div quando dopo aver premuto il pulsante effettuo un resize laterale della schermata per poi premere la X
    document.body.style.overflow = 'visible';
    // $("body").removeAttr("style");
    $(".menu_bar_div").css("right", bodyMarginRight+"px");

    XisPressed = true;

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


$(".phone_ul li").on("click", function(){
  id_li = $(this).attr("id");
  console.log(id_li);

  if(isTouchDevice() == true){

    $(".phone_ul li#" + id_li).css("background-color", "#A555EC");
    $(".phone_ul li#" + id_li + " a").css("color", "#F8E8EE");

    setTimeout(function(){
      $(".phone_ul li#" + id_li).removeAttr("style");
      $(".phone_ul li#" + id_li + " a").removeAttr("style");
      document.body.style.overflow = 'visible';
      $("body").removeAttr("style");
      $(".menu_bar_div").css("right", bodyMarginRight+"px");
    }, 100);

  } else {

    document.body.style.overflow = 'visible';
    $("body").removeAttr("style");
    $(".menu_bar_div").css("right", bodyMarginRight+"px");

  }

});

$(".laptop_ul li").on("click", function(){
  id_li = $(this).attr("id");
  console.log(id_li);

  if(isTouchDevice() == true){
    $(".laptop_ul li#" + id_li).css("background-color", "#A555EC");
    $(".laptop_ul a li#" + id_li).css("color", "#F8E8EE");
    $(".laptop_ul li#" + id_li).css("border-radius", "5px");

    setTimeout(function(){
      $(".laptop_ul li#" + id_li).removeAttr("style");
      $(".laptop_ul a li#" + id_li).removeAttr("style");
    }, 1000);
  }
});


function resize_scroll() {
  
  getScrollbarWidth();    // Non so se serve eseguirla ad ogni ciclo

  var menu_bar_div_height = $(".menu_bar_div").outerHeight(true);   // height + margin + padding on top & bottom del menu_bar_div
  const topDistance = 10; //px

  var windowScrollY = window.scrollY;
  // Se scrollando in basso supero il limite dell'altezza del #title_div a cui sommo il margin-bottom del relativo <p>, allora blocco il menu_bar_div
  var topLimit = $("#title_div").outerHeight(true) - topDistance;
  // var content_div_top = document.querySelector(".content_div").getBoundingClientRect().top;
  // var menu_bar_div_top = document.querySelector(".menu_bar_div").getBoundingClientRect().top;

  $(".navbar_background").height(menu_bar_div_height + topDistance);

  if (window.scrollY >= topLimit) {
    // if($(window).width() <= 913){                             // NON usare .css("width") perche' va in errore (vedi console nel caso)

    if($(".menu_button_div").css("display") != "none"){
      $(".menu_bar_div").css("position", "fixed");
      $(".menu_bar_div").css("top", "10px");
      $(".menu_bar_div").css("right", "10px");
      $(".menu_bar_div").css("left", "10px");

      // In realta' questo if non servirebbe piu', ma quello che c'e' all'interno si
      if(XisPressed == false){
        $(".content_div").css("margin-top", menu_bar_div_height + topDistance);
        // console.log("X is NOT pressed");
      }

      $(".navbar_background").css("visibility", "visible");

    } else {

      XisPressed = false;
      $(".navbar_background").removeAttr("style");
      $(".menu_bar_div").removeAttr("style");   // Rimuovo l'inline-css aggiunto nell'if
      $(".content_div").removeAttr("style");
      
    }  
  } else {

    XisPressed = false;
    $(".navbar_background").removeAttr("style");
    $(".menu_bar_div").removeAttr("style");   // Rimuovo l'inline-css aggiunto nell'if
    $(".content_div").removeAttr("style");

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
