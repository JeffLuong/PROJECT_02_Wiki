$(document).ready(function() {
  fadeInDisplay();
});

var $hamburger = $("#hamburger-button");

function animateHamburger() {
  $hamburger.toggleClass('open');
};

function slideMenu() {
  $("#menu-wrapper").toggleClass('open');
  $("#menu-wrapper").one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd',
  function(event) {
    $("ul#menu li").toggleClass('trans-end');
  });
};

function fadeInDisplay() {
  // $("#main, #main-content, #main-new-art, #main-new-user").hide();
  $('#main, #main-content, #main-new-art, #main-new-user').fadeIn(850);
  $(".message").fadeIn(1400);
}

$hamburger.on('click', function(){
  slideMenu();
  animateHamburger();
});
