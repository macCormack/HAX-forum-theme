var menu = $('.nav-links');

$('.toggleMenu').on('click', function() {
  menu.addClass('is-opened');
})

$('.close-menu').on('click', function() {
  menu.removeClass('is-opened');
})
