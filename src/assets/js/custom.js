"use strict";

$(document).ready(function() {
    //removeIf(production)
    console.log("document ready!");
    $('.home-slick-carousel').slick({
        dots: true,
		mobileFirst: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1
    });
    //endRemoveIf(production)
});
