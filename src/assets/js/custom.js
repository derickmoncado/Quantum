'use strict';

let pathname = window.location.pathname; // Gets URL path and stores in pathname

$(document).ready(function() {
	console.log('document ready!');

	// For appending the 'active' class to nav
	$('.navbar-nav > li > a[href="'+pathname+'"]').parent().addClass('active');
	$('.dropdown-menu > li > a[href="'+pathname+'"]').addClass('active');

	// Initiate Slick
	$('.home-slick-carousel').slick({
		dots: true,
		mobileFirst: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1
	});
});
