$(document).ready(function() {
  fadeInDisplay();
});

var $hamburger = $("#hamburger-button");

function animateHamburger() {
  $hamburger.toggleClass('open');
};

function slideMenu() {
  $("#menu-wrapper").toggleClass('open');
};

function fadeInDisplay() {
  $("#main, #main-content").hide();
  $('#main, #main-content').fadeIn(1250);
  $(".message").fadeIn(1500);
}

$hamburger.on('click', function(){
  slideMenu();
  animateHamburger();
});
