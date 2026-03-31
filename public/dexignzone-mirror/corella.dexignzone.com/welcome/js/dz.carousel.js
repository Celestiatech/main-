/* JavaScript Document */
jQuery(document).ready(function() {
    'use strict';

	/* image-carousel function by = owl.carousel.js */
	jQuery('.vmap-carousel').owlCarousel({
		loop:true,
		margin:0,
		nav:true,
		autoplay:true,
		autoplaySpeed: 2000,
		navSpeed: 2000,
		items:1,
		paginationSpeed: 2000,
		slideSpeed: 2000,
		dots: false,
		navText: ['<i class="ti-angle-left"></i>', '<i class="ti-angle-right"></i>'],
		responsive:{
			0:{
				items:1
			},
			480:{
				items:2
			},			
			1024:{
				items:3
			},
			1200:{
				items:2
			}
		}
	})
	
});
/* Document .ready END */