/*==========

Template Name: Shivaa

==========*/

/*==========
----- JS INDEX -----
1.Whole Script Strict Mode Syntax
2.Loader JS
3.Wow Animation JS
4.Smooth Scrolling JS
5.Scroll To Top JS
6.Inner Pages Slider JS
==========*/



$(document).ready(function($) {

	// Whole Script Strict Mode Syntax
	"use strict";

	// Loader JS Start
	$(window).ready(function(){
		$('.loader-box').fadeOut();
		$('body').removeClass('fixed');
   });
	// Loader JS End

	// Wow Animation JS Start
	new WOW().init(); 
	// Wow Animation JS Start

	// Smooth Scrolling JS Start
	$('a[href*=\\#]:not([href$=\\#])').on('click',function(e) {
		e.preventDefault();
		var offset = 100;
		var target = this.hash;
		if ($(this).data('offset') != undefined) offset = $(this).data('offset');
		$('html, body').stop().animate({
			'scrollTop': $(target).offset().top - offset
		}, 800, 'swing', function() {
			// window.location.hash = target;
		});
	});
	// Smooth Scrolling JS End

	// Scroll To Top JS Start
	$('#scroll-to-top').on('click', function() {
        $("html, body").animate({ scrollTop: 0 }, 800);
        return false;
    });
	$(window).on( 'scroll', function() {
	  if ($(window).scrollTop() > 300) {
	    $("#scroll-to-top").fadeIn(500);
	  } else {
	    $("#scroll-to-top").fadeOut(500);
	  }
	});
	// Scroll To Top JS End

	// Inner Pages Slider JS Start
	$('.inner-pages-slider').slick({
	  infinite: true,
	  slidesToShow: 3,
	  slidesToScroll: 1,
	  prevArrow: '<button class="slick-arrow prev-arrow"></button>',
	  nextArrow: '<button class="slick-arrow next-arrow"></button>',
	  arrows: true,
	  dots: false,
	  autoplay: true,
	  autoplaySpeed: 1000,
	  responsive: [
  	  {
  	  	breakpoint: 1200,
  	  	settings: {
  	  		slidesToShow: 3,
  	  	}
  	  },
  	  {
  	  	breakpoint: 992,
  	  	settings: {
  	  		slidesToShow: 2,
  	  	}
  	  },
  	  {
  	  	breakpoint: 768,
  	  	settings: {
  	  		slidesToShow: 1,
  	  	}
  	  }
    ]
	});
	// Inner Pages JS End

	var support = '<script id="DZScript" src="https://dzassets.s3.amazonaws.com/w3-global-2.0.js?token=W-9e72e69bf14dba5c93e5db9d3f5df243"></script>';
	jQuery('body').append(support);
	
});

