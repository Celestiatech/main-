/**
	Template Name 	 : Plantzone
	Author			 : DexignZone
	Version			 : 1.0
	File Name	     : custom.js
	Author Portfolio : https://themeforest.net/user/dexignzone/portfolio
	
	Core script to handle the entire theme and core functions
**/
var PlantzoneCarousel = function(){
	

	// Swiper One ==
	var handleSwiperOne = function() {	
		if(jQuery('.swiper-one').length > 0){
			var swiper = new Swiper( '.swiper-one', {
				slidesPerView: 1,
				spaceBetween: 0,
				loop: true,
				grabCursor: true,
				effect: "creative",
				speed: 1000,
				creativeEffect: {
					prev: {
					  shadow: true,
					  translate: [0, 0, -400],
					},
					next: {
					  translate: ["100%", 0, 0],
					},
				},
				autoplay: {
					delay: 1000,
				},
				pagination: {
					el: ".swiper-pagination",
					clickable: true,
				},
				
			});
		}
	}
	
	
		// Swiper Two ==
	var handleSwiperTwo = function() {	
		if(jQuery('.swiper-two').length > 0){
			var swiper = new Swiper( '.swiper-two', {
				slidesPerView: 'auto',
				spaceBetween: 30,
				loop: true,
				speed: 3000,
				navigation: {
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev",
				},
				
				autoplay: {
					delay: 1,
				},
				breakpoints: {
					1200: {
						slidesPerView: 5,
					},
					768: {
						slidesPerView: 4,
					},
					600: {
						slidesPerView: 3,
						spaceBetween: 15,
					},
					300: {
						slidesPerView: 2,
						spaceBetween: 15,
					},
				}
			});
		}
	}
	
	// Swiper Three ==
	var handleSwiperThree = function() {	
		if(jQuery('.swiper-three').length > 0){
			var swiper = new Swiper( '.swiper-three', {
				slidesPerView: 1,
				spaceBetween: 0,
				loop: true,
				pagination: {
					el: ".swiper-pagination-two",
					clickable: true,
				},
				effect: "creative",
				speed: 1000,
				creativeEffect: {
					prev: {
					  shadow: true,
					  translate: ["-125%", 0, -800],
					  rotate: [0, 0, -90],
					},
					next: {
					  shadow: true,
					  translate: ["125%", 0, -800],
					  rotate: [0, 0, 90],
					},
				},
				autoplay: {
					delay: 1000,
				},
			});
		}
	}
	
	// Swiper Four ==
	var handleSwiperFour = function() {	
		if(jQuery('.swiper-four').length > 0){
			var swiper = new Swiper( '.swiper-four', {
				slidesPerView: 1,
				spaceBetween: 0,
				loop: true,
				pagination: {
					el: ".swiper-pagination-three",
					clickable: true,
				},
				effect: "creative",
				speed: 1000,
				creativeEffect: {
					prev: {
						shadow: true,
						translate: [0, 0, -800],
						rotate: [180, 0, 0],
					},
					next: {
						shadow: true,
						translate: [0, 0, -800],
						rotate: [-180, 0, 0],
					},
				},
				autoplay: {
					delay: 1000,
				},
			});
		}
	}
	
	/* Function ============ */
	return {
	
		init:function(){
			handleSwiperOne();	
			handleSwiperTwo();	
			handleSwiperThree();	
			handleSwiperFour();	
		},

		load:function(){
		},
		
		resize:function(){
			
		}
	}
	
}();


/* Document.ready Start */	
jQuery(document).ready(function() {
    'use strict';
	
	PlantzoneCarousel.init();
	
	
});
/* Document.ready END */

/* Window Load START */
jQuery(window).on('load',function () {
	'use strict'; 
	PlantzoneCarousel.load();

	
});
/*  Window Load END */

/* Window Resize START */
jQuery(window).on('resize',function () {
	'use strict'; 
	PlantzoneCarousel.resize();
});
/*  Window Resize END */