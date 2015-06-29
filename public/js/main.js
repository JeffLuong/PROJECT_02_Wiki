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
  $("#main, #main-content, #main-new-art, #main-new-user").hide();
  $('#main, #main-content, #main-new-art, #main-new-user').fadeIn(1250);
  $(".message").fadeIn(1500);
}

$hamburger.on('click', function(){
  slideMenu();
  animateHamburger();
});
