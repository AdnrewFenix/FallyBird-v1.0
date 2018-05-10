$(document).ready(function() {



$("#portfolio_grid").mixItUp();

$(".a_photo li").click(function (){
	$(".a_photo li").removeClass("active");
	$(this).addClass("active");
});

$(".popup").magnificPopup({type:"image"});
$(".popup_content").magnificPopup({type:"inline", midClick: true});

$(".top_text h1").animated("fadeInLeft", "slideOutRight");
$(".top_text p").animated("fadeInUp", "fadeOutDown");
$(".anime_left").animated("fadeInLeft", "fadeOutRight");
$(".anime_center").animated("zoomIn", "zoomOut");
$(".anime_right").animated("fadeInRight", "fadeOutLeft");

$(".left .resume_item").animated("fadeInLeft", "fadeOutDown");
$(".right .resume_item").animated("fadeInRight", "fadeOutDown");

$(".section_head").animated("fadeInUp", "fadeOutDown");
 function headerDerect(){
  $(".main_head").css("height", $(window).height());	
	};
  headerDerect();

 $(window).resize(function (){
  headerDerect();
 });
});

$(".togle_mnu, .menu_item").click(function() {
  $(".sandwich").toggleClass("active");
});

$(".top_mnu ul a").click(function (){
	$(".top_mnu").fadeOut(600);
	$(".sandwich").toggleClass("active");

});

$(".togle_mnu").click(function (){
	if($(".top_mnu").is(":visible")){
      $(".top_mnu").fadeOut(600);
      $(".top_mnu li a").removeClass("fadeInUp animated");
	}else{
		$(".top_mnu").fadeIn(600);
		 $(".top_mnu li a").addClass("fadeInUp animated");
	}
	
});

$(".top_mnu ul a").mPageScroll2id();


$(window).load(function() { 
	$(".loader_inner").fadeOut(); 
	$(".loader").delay(500).fadeOut("slow"); 
});