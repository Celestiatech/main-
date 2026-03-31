(function($) { 
	"use strict";

/* JavaScript Document */
jQuery(document).ready(function() {
    'use strict';
	
	/* image-carousel no margin function by = owl.carousel.js */
	jQuery('.owl-slider').owlCarousel({
		loop:true,
		autoplay:true,
		responsive:true,
		animateOut: 'fadeOut',
		margin:0,
		nav:true,
		dots: true,
		autoplaySpeed: 500,
		navSpeed: 500,
		paginationSpeed: 500,
		slideSpeed: 500,
		navText: ['<i class="la la-arrow-left"></i>', '<i class="la la-arrow-right"></i>'],
		responsive:{
			0:{
				items:1
			},
			480:{
				items:1
			},			
			1024:{
				items:1
			},
			1200:{
				items:1
			}
		}
	})
	
		
	/*  Blog post Carousel function by = owl.carousel.js */
	jQuery('.blog-carousel').owlCarousel({
		loop:true,
		autoplay:true,
		margin:30,
		nav:true,
		dots: false,
		autoplaySpeed: 1000,
		navSpeed: 1000,
		paginationSpeed: 1000,
		slideSpeed: 1000,
		navText: ['<i class="flaticon-left-arrow"></i>', '<i class="flaticon-right-arrow"></i>'],
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
				items:3
			}
		}
	})
	
	/*  Blog post Carousel-2 function by = owl.carousel.js */
	jQuery('.blog-carousel2').owlCarousel({
		loop:true,
		autoplay:true,
		margin:50,
		nav:true,
		dots: false,
		autoplaySpeed: 1000,
		navSpeed: 1000,
		paginationSpeed: 1000,
		slideSpeed: 1000,
		navText: ['<i class="la la-arrow-left"></i>', '<i class="la la-arrow-right"></i>'],
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
				items:3
			}
		}
	})
	
	/*  Blog post Carousel function by = owl.carousel.js */
	jQuery('.gallery-carousel').owlCarousel({
		loop:false,
		autoplay:true,
		margin:30,
		nav:true,
		autoplaySpeed: 1000,
		navSpeed: 1000,
		paginationSpeed: 1000,
		slideSpeed: 1000,
		dots: false,
		navText: ['', ''],
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
				items:3
			}
		}
	})
	
	/*  Blog post Carousel function by = owl.carousel.js */
	jQuery('.team-carousel').owlCarousel({
		loop:true,
		autoplay:true,
		margin:30,
		nav:true,
		autoplaySpeed: 1000,
		navSpeed: 1000,
		paginationSpeed: 1000,
		slideSpeed: 1000,
		dots: false,
		navText: ['', ''],
		responsive:{
			0:{
				items:1
			},
			480:{
				items:2
			},			
			991:{
				items:3
			},
			1000:{
				items:4
			}
		}
	})
	
	/*  Blog post Carousel function by = owl.carousel.js */
	jQuery('.client-carousel').owlCarousel({
		loop:true,
		autoplay:false,
		margin:0,
		nav:true,
		autoplaySpeed: 1500,
		navSpeed: 1500,
		paginationSpeed: 1500,
		slideSpeed: 1500,
		dots: false,
		navText: ['', ''],
		responsive:{
			0:{
				items:1
			},
			480:{
				items:1
			},			
			991:{
				items:1
			},
			1000:{
				items:1
			}
		}
	})
	
	/*  Testimonial post Carousel function by = owl.carousel.js */
	jQuery('.testimonial-carousel').owlCarousel({
		loop:true,
		autoplay:false,
		margin:20,
		nav:true,
		autoplaySpeed: 1500,
		navSpeed: 1500,
		paginationSpeed: 1500,
		slideSpeed: 1500,
		dots: false,
		navText: ['<i class="la la-arrow-left"></i>', '<i class="la la-arrow-right"></i>'],
		responsive:{
			0:{
				items:1
			},
			480:{
				items:1
			},			
			991:{
				items:1
			},
			1000:{
				items:1
			}
		}
	})








	
});
/* Document .ready END */

	
})(jQuery);	


jQuery(document).ready(function () {
	if (jQuery('.blog-slideshow').length > 0) {
	  var swiperTestimonial = new Swiper('.blog-slideshow', {
		loop: true,
		spaceBetween: 0,
		slidesPerView: "auto",
		speed: 1500,
		autoplay: {
		  delay: 2000,
		},
		pagination: {
		  el: ".swiper-pagination-two",
		  clickable: true,
		},
	  });
	}
  });
  

  jQuery(document).ready(function () {
	if ($('.galley-thumb-swiper').length > 0 && $('.galley-swiper').length > 0) {
		var swiper = new Swiper(".galley-thumb-swiper", {
		loop: false,
		spaceBetween: 10,
		slidesPerView: 4,
		freeMode: true,
		watchSlidesProgress: true,
		});
	
		var swiper2 = new Swiper(".galley-swiper", {
		loop: true,
		spaceBetween: 10,
		thumbs: {
			swiper: swiper,
		},
		});
	}
});




jQuery(document).ready(function () {
var myModalEl = document.getElementById('staticBackdrop');
	if(myModalEl){
			myModalEl.addEventListener('shown.bs.modal', function (event) {
			if(jQuery('.status-swiper').length > 0){
				var statusswiper = new Swiper('.status-swiper', {
					loop: true,
					spaceBetween: 0,
					slidesPerView: "auto",
					speed: 1500,
					effect: "fade",
					autoplay: {
						delay: 2000,
					},
					pagination: {
						el: ".status-pagination",
						clickable: true,
					},	
				});
			}
		})
	}



});






