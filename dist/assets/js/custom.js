'use strict';

let pathname = window.location.pathname; // Gets URL path and stores in pathname

$(document).ready(function () {
  console.log('document ready!'); //removeIf(production)
  // Be careful putting code here!
  //endRemoveIf(production)
  // For appending the 'active' class

  $('.navbar-nav > li > a[href="' + pathname + '"]').parent().addClass('active'); // For appending the 'active' class to dropdowns (the children)

  $('.navbar-nav > li > a .dropdown-menu a').click(function () {
    $(this).parent().removeClass("active");
    $('.dropdown-item').addClass("XXXTESTINGXXX");
  });
  $('.home-slick-carousel').slick({
    dots: true,
    mobileFirst: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1
  });
});