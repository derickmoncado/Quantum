'use strict';

$(document).ready(function() {
    //removeIf(production)
        // Be careful putting code here!
    //endRemoveIf(production)

    console.log('document ready!');

    $('.navbar-nav .nav-link').on('click', function() {
        $('.navbar-nav').find('.active').removeClass('active');
        $(this).addClass('active');
    });

    $('.home-slick-carousel').slick({
        dots: true,
		mobileFirst: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1
    });
});
