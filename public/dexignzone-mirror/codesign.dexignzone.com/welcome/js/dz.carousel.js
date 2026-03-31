/* JavaScript Document */
jQuery(document).ready(function() {
    'use strict';
	
	/* image-carousel function by = owl.carousel.js */
	jQuery('.img-carousel').owlCarousel({
		loop:true,
		margin:30,
		nav:true,
		dots: false,
		navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
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
				items:4
			}
		}
	})
	
	/* image-carousel function by = owl.carousel.js */
	jQuery('.testimonial-two-dots').owlCarousel({
		loop:true,
		autoplaySpeed: 3000,
		navSpeed: 3000,
		paginationSpeed: 3000,
		slideSpeed: 3000,
		smartSpeed: 3000,
		autoplay: 3000,
		margin:30,
		nav:true,
		dots: true,
		navText: ['<i class="ti-arrow-left"></i>', '<i class="ti-arrow-right"></i>'],
		responsive:{
			0:{
				items:1
			},
			
			700:{
				items:2
			},			
			
			991:{
				items:2
			},
			1200:{
				items:3
			}
		}
	})

	/* image-carousel no margin function by = owl.carousel.js */
	jQuery('.responsive-carousel').owlCarousel({
		loop:true,
		autoplaySpeed: 3000,
		navSpeed: 3000,
		paginationSpeed: 3000,
		slideSpeed: 3000,
		smartSpeed: 3000,
		autoplay: 3000,
		margin:30,
		autoWidth:true,
		nav:false,
		dots: false,
		navText: ['<i class="ti-arrow-left"></i>', '<i class="ti-arrow-right"></i>'],
		responsive:{
			0:{
				items:1
			},
			480:{
				items:2
			},			
			
			991:{
				items:2
			},
			1000:{
				items:2
			}
		}
	})

	/* service carousel no margin function by = owl.carousel.js */
	jQuery('.awards-carousel').owlCarousel({
		loop:true,
		autoplaySpeed: 3000,
		navSpeed: 3000,
		paginationSpeed: 3000,
		slideSpeed: 3000,
		smartSpeed: 3000,
		autoplay: 3000,
		margin:30,
		nav:true,
		dots: true,
		navText: ['<i class="ti-arrow-left"></i>', '<i class="ti-arrow-right"></i>'],
		responsive:{
			0:{
				items:2
			},
			480:{
				items:4
			},			
			
			991:{
				items:5
			},
			1000:{
				items:6
			}
		}
	})

});
/* Document .ready END */