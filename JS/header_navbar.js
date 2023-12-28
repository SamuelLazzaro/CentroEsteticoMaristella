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

$(".menu_button_div").on("click", function(){
  $("#show_hide_phone_navbar").slideToggle(500);  // Set 500ms for slideUp & slideDown

  // Nascondo la scrollbar
  document.body.style.overflow = 'hidden';

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
    $(".content_div").removeAttr("style");
    document.body.style.overflow = 'visible';

    XisPressed = true;

    // console.log("\n");
    // console.log("Close X: " + document.querySelector(".content_div").getBoundingClientRect().top);
    // console.log("\n");

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
    }, 100);
  }

  document.body.style.overflow = 'visible';
});

var NavBarBack_isAdded = false;
// var MenuBar_height = $(".menu_bar_div").height() + 35;

function resize_scroll() {
  
  var menu_bar_div_height = 56//$(".menu_bar_div").outerHeight(true);   // height + margin + padding on top & bottom

  const topDistance = 10; //px

  var content_div_top = document.querySelector(".content_div").getBoundingClientRect().top;
  // var menu_bar_div_top = document.querySelector(".menu_bar_div").getBoundingClientRect().top;

  // console.log("\n\n");
  // console.log("BEFORE: " + content_div_top);
  // console.log("Menu height: " + menu_bar_div_height);

  if (content_div_top <= (menu_bar_div_height + topDistance) /* && menu_bar_div_top <= topDistance */) {
    // if($(window).width() <= 913){                             // NON usare .css("width") perche' va in errore (vedi console nel caso)

    // console.log("IF: " + document.querySelector(".content_div").getBoundingClientRect().top);

    if($(".menu_button_div").css("display") != "none"){
      $(".menu_bar_div").css("position", "fixed");
      $(".menu_bar_div").css("top", "10px");
      $(".menu_bar_div").css("right", "10px");
      $(".menu_bar_div").css("left", "10px");

      // if(XisPressed == false){
      //   // $(".content_div").css("margin-top", menu_bar_div_height + topDistance);
      //   // console.log("X is NOT pressed");
      // }

      $(".content_div").css("margin-top", menu_bar_div_height + topDistance);


      console.log("AFTER: " + document.querySelector(".content_div").getBoundingClientRect().top);

      $(".navbar_background").css("visibility", "visible");

    } else {

      XisPressed = false;

      $(".menu_bar_div").removeAttr("style");   // Rimuovo l'inline-css aggiunto nell'if
      $(".content_div").removeAttr("style");
      $(".navbar_background").removeAttr("style");
    }  
  } else {

    XisPressed = false;

    $(".menu_bar_div").removeAttr("style");   // Rimuovo l'inline-css aggiunto nell'if
    $(".content_div").removeAttr("style");
    $(".navbar_background").removeAttr("style");

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
