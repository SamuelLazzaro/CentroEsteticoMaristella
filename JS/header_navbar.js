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

// anchor tag & list element devono occupare lo stesso spazio in termini di height & width
$(".phone_ul a").on("click", function(){
  id_li = $(this).attr("id");

  if(isTouchDevice() == true){

    $(".phone_ul a#" + id_li + " li").css("background-color", "#A555EC");
    $(".phone_ul a#" + id_li + " li").css("color", "#F8E8EE");

    // Non funziona in quanto viene subito caricata la pagina successiva, eliminando quindi tutte le modifiche di stile inserite
    // setTimeout(function(){
    //   $(".phone_ul a#" + id_li + " li").removeAttr("style");
    // }, 100);

  }

  //Da non inserire nel caso del laptop ???
  document.body.style.overflow = 'visible';
  $("body").removeAttr("style");
  $(".menu_bar_div").css("right", bodyMarginRight+"px");

});

// anchor tag & list element devono occupare lo stesso spazio in termini di height & width
$(".laptop_ul a").on("click", function(){
  id_li = $(this).attr("id");

  if(isTouchDevice() == true){
    $(".laptop_ul a#" + id_li + " li").css("background-color", "#A555EC");
    $(".laptop_ul a#" + id_li + " li").css("color", "#F8E8EE");
    $(".laptop_ul a#" + id_li + " li").css("border-radius", "5px");

    // Non funziona in quanto viene subito caricata la pagina successiva, eliminando quindi tutte le modifiche di stile inserite
    // setTimeout(function(){
    //   $(".laptop_ul a#" + id_li + " li").removeAttr("style");
    // }, 100);
  }

});

// Funzione per gestire "Torna su" del pulsante che si trova in .go_up_button_div
$(".go_up_button_div").on("click", function () {

  if(isTouchDevice() == true){
    $(".go_up_button_div svg").css("background-color", "#A555EC");
    $(".go_up_button_div svg").css("fill", "#F8E8EE");
  
    setTimeout(function(){
      $(".go_up_button_div svg").removeAttr("style");

      $("html").animate({scrollTop:0}, 'slow');
    }, 100);
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

  // Per evitare seguente bug: modalità phone, clicco su pulsante menu, scelgo nuovo menu, eseguo uno scroll fino in fondo, clicco
  // nuovamente su pulsante menu, clicco sulla X per chiudere il menu, mi ritrovo una navbar_background che mi occupa tutto lo spazio in quanto
  // menu_bar_div_height in quel caso ha un valore di oltre 800px. Con questo controllo evito in quel caso di assegnare una height enorme
  // alla navbar_background.
  if(menu_bar_div_height < 100){
    $(".navbar_background").height(menu_bar_div_height + topDistance);
  }

  if (windowScrollY >= topLimit) {
    // Ho superato il limite di scrollY

    // Se supero il limite della navigation bar, allora rendo visibile il pulsante che si trova all'interno di go_up_button_div
    $(".go_up_button_div").css("visibility", "visible");

    if($(".menu_button_div").css("display") != "none"){
      // Ho superato il limite di scrollY e sono in modalita' cellulare

      // In realta' questo if non servirebbe piu', ma quello che c'e' all'interno si
      if(XisPressed == false){
        $(".content_div").css("padding-top", menu_bar_div_height);
        // console.log("X is NOT pressed");
      }

      $(".navbar_background").css("visibility", "visible");

      $(".menu_bar_div").css("position", "fixed");
      $(".menu_bar_div").css("top", "10px");
      $(".menu_bar_div").css("right", "10px");
      $(".menu_bar_div").css("left", "10px");

      $(".go_up_button_div").css("position", "absolute");

    } else {
      // Ho superato il limite di scrollY ma sono in modalita' laptop
      
      XisPressed = false;
      $(".navbar_background").removeAttr("style");
      $(".menu_bar_div").removeAttr("style");   // Rimuovo l'inline-css aggiunto nell'if
      $(".content_div").removeAttr("style");

      // Considero 90px in piu' in quanto se e' visibile la laptop_navbar non voglio vedere il pulsante interno a go_up_button_div
      if(windowScrollY >= topLimit + 90)
      {
        // laptop_navbar non visibile, quindi fisso la posizione di go_up_button_div
        $(".go_up_button_div").css("position", "fixed");        
      }
      else
      {
        // laptop_navbar visibile, quindi rimuovo la visibilita' del go_up_button_div
        $(".go_up_button_div").removeAttr("style");
      }
      
    }  
  } else {
    // Non ho superato il limite di scrollY

    XisPressed = false;
    $(".navbar_background").removeAttr("style");
    $(".menu_bar_div").removeAttr("style");   // Rimuovo l'inline-css aggiunto nell'if
    $(".content_div").removeAttr("style");
    $(".go_up_button_div").removeAttr("style");

  }

}




// (function runForever(){
//   // Do something here
//   console.log("Value = " + $(".menu_bar_div").outerHeight(true));

//   setTimeout(runForever, 100)
// })()



/////////////////////////////////////////////
// RESIZE
/////////////////////////////////////////////
$(window).resize(resize_scroll);

/////////////////////////////////////////////
// SCROLL
/////////////////////////////////////////////
$(window).scroll(resize_scroll);
