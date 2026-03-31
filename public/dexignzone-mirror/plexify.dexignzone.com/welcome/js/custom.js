/**
	Template Name 	 : ClinicMaster
	Author			 : DexignZone
	File Name	     : custom.js
	Author Portfolio : https://themeforest.net/user/dexignzone
	
	Core script to handle the entire theme and core functions
**/

var ClinicMaster = function(){
	'use strict';
	
	var screenWidth = $( window ).width();
	
	/* WOW ANIMATION ============ */
	var wow_animation = function(){
		if($('.wow').length > 0){
			var wow = new WOW(
			{
			  boxClass:     'wow',      // animated element css class (default is wow)
			  animateClass: 'animated', // animation css class (default is animated)
			  offset:       50,          // distance to the element when triggering the animation (default is 0)
			  mobile:       false       // trigger animations on mobile devices (true is default)
			});
			
			setTimeout(function(){
				wow.init();
			}, 2100);
		}	
	}
	
	/* Load File ============ */
	var dzTheme = function(){	
		if(screenWidth <= 991 ){
			jQuery('.navbar-nav > li > a, .sub-menu > li > a').unbind().on('click', function(e){
				if(jQuery(this).parent().hasClass('open')){
					jQuery(this).parent().removeClass('open');
				}else{
					jQuery(this).parent().parent().find('li').removeClass('open');
					jQuery(this).parent().addClass('open');
				}
			});
		}
	}
	
	/* Magnific Popup ============ */
	var MagnificPopup = function(){
		if(jQuery('.mfp-gallery').length > 0){
			jQuery('.mfp-gallery').magnificPopup({
				delegate: '.mfp-link',
				type: 'image',
				tLoading: 'Loading image #%curr%...',
				mainClass: 'mfp-img-mobile',
				gallery: {
					enabled: true,
					navigateByImgClick: true,
					preload: [0,1] // Will preload 0 - before current, and 1 after the current image
				},
				image: {
					tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
					titleSrc: function(item) {
						return item.el.attr('title') + '<small></small>';
					}
				}
			});
			/* magnificPopup function end */
		}
		
		if(jQuery('.mfp-video').length > 0){
			/* magnificPopup for Play video function */		
			jQuery('.mfp-video').magnificPopup({
				type: 'iframe',
				iframe: {
					markup: '<div class="mfp-iframe-scaler">'+
							 '<div class="mfp-close"></div>'+
							 '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
							 '<div class="mfp-title">Some caption</div>'+
							 '</div>'
				},
				callbacks: {
					markupParse: function(template, values, item) {
						values.title = item.el.attr('title');
					}
				}
			});
			
		}

		if(jQuery('.popup-youtube, .popup-vimeo, .popup-gmaps').length > 0){	
			/* magnificPopup for Play video function end */
			$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
				disableOn: 700,
				type: 'iframe',
				mainClass: 'mfp-fade',
				removalDelay: 160,
				preloader: false,

				fixedContentPos: true
			});
		}
	}
	
	/* Scroll To Top ============ */
	var scrollTop = function (){
		var scrollTop = jQuery("button.scroltop");
		
		/* page scroll top on click function */	
		scrollTop.on('click',function() {
			jQuery("html, body").animate({
				scrollTop: 0
			}, 1000);
			return false;
		})

		jQuery(window).bind("scroll", function() {
			var scroll = jQuery(window).scrollTop();
			if (scroll > 900) {
				jQuery("button.scroltop").fadeIn(1000);
			} else {
				jQuery("button.scroltop").fadeOut(1000);
			}
		});
		/* page scroll top on click function end*/
	}
	
	/* Header Fixed ============ */
	var headerFix = function(){
		/* Main navigation fixed on top  when scroll down function custom */		
		jQuery(window).on('scroll', function () {
			if(jQuery('.sticky-header').length > 0){
				var menu = jQuery('.sticky-header');
				if ($(window).scrollTop() > menu.offset().top) {
					menu.addClass('is-fixed');
				} else {
					menu.removeClass('is-fixed');
				}
			}
		});
		/* Main navigation fixed on top  when scroll down function custom end*/
	}
	
	/* Masonry Box ============ */
	var masonryBox = function(){
		/* masonry by  = bootstrap-select.min.js */
		if(jQuery('#masonry, .masonry').length > 0){
			var self = jQuery("#masonry, .masonry");
	 
			if(jQuery('.card-container').length > 0){
				var gutterEnable = self.data('gutter');
				
				var gutter = (self.data('gutter') === undefined)?0:self.data('gutter');
				gutter = parseInt(gutter);
				
				var columnWidthValue = (self.attr('data-column-width') === undefined)?'':self.attr('data-column-width');
				if(columnWidthValue != ''){columnWidthValue = parseInt(columnWidthValue);} 
			} 
		}
		
		if(jQuery('#Isotope, .isotope').length > 0){
			var self = jQuery("#Isotope, .isotope");
			
			self.isotope({
			  itemSelector: '.card-container',
			  layoutMode: 'fitRows',
			});
		}
		
		if(jQuery('.filters').length){
			jQuery(".filters li:first").addClass('active');
			
			jQuery(".filters").on("click", "li", function() {
				jQuery('.filters li').removeClass('active');
				jQuery(this).addClass('active');
				
				var filterValue = $(this).attr("data-filter");
				self.isotope({ filter: filterValue});
			});
		}
		/* masonry by  = bootstrap-select.min.js end */
	}
	
	/* Counter Number ============ */
	var counter = function(){
		if(jQuery('.counter').length){
			jQuery('.counter').counterUp({
				delay: 10,
				time: 5000
			});	
		}
	}
	
	var navScroller = function(){
		var previousScroll = 0;
		$(window).scroll(function(){
			if(screenWidth <= 768 ){
				if ($(this).scrollTop() + 
					$(this).innerHeight() >=  
					document.querySelector("body").scrollHeight) { 
					$('.extra-nav').addClass('bottom-end');
				}else{
					$('.extra-nav').removeClass('bottom-end');
				}
				var currentScroll = $(this).scrollTop();
				if (currentScroll > previousScroll){
					$('.extra-nav').addClass('active');
				} else {
					$('.extra-nav').removeClass('active');
				}
				previousScroll = currentScroll;
			}
		});
	}
	
	var setCurrentYear = function(){
		const currentDate = new Date();
		let currentYear = currentDate.getFullYear();
		
		let elements = document.getElementsByClassName('current-year');

		for (const element of elements) {
            element.innerHTML = currentYear;
        }
	}
	
	// var handleTagSlider = function(){
	// 	if(jQuery('#tagSlider').length > 0){
	// 		$('#tagSlider').grouploop({
	// 			velocity: 1,
	// 			forward: false,
	// 			pauseOnHover: true,
	// 			childNode: ".item",
	// 			childWrapper: ".item-wrap"
	// 		});
			
	// 	}
	// 	if(jQuery('#tagSlider2').length > 0){
	// 		$('#tagSlider2').grouploop({
	// 			velocity: 1,
	// 			forward: true,
	// 			pauseOnHover: true,
	// 			childNode: ".item",
	// 			childWrapper: ".item-wrap"
	// 		});
			
	// 	}
	// }

	var handleTagSlider = function(){
		if(jQuery('#tagSlider').length > 0){
			$('#tagSlider').grouploop({
				velocity: 1,
				forward: false,
				pauseOnHover: true,
				childNode: ".item",
				childWrapper: ".item-wrap"
			});
		}
	
		if(jQuery('#tagSlider2').length > 0){
			$('#tagSlider2').grouploop({
				velocity: 1,
				forward: true,
				pauseOnHover: true,
				childNode: ".item",
				childWrapper: ".item-wrap"
			});
		}
	
		if(jQuery('#tagSlider3').length > 0){
			$('#tagSlider3').grouploop({
				velocity: 1,
				forward: false,
				pauseOnHover: true,
				childNode: ".item",
				childWrapper: ".item-wrap"
			});
		}
	
		if(jQuery('#tagSlider4').length > 0){
			$('#tagSlider4').grouploop({
				velocity: 1,
				forward: true,
				pauseOnHover: true,
				childNode: ".item",
				childWrapper: ".item-wrap"
			});
		}
	}
	
	/* Function ============ */
	return {
		init:function(){
			wow_animation();
			setCurrentYear();
			dzTheme();
			MagnificPopup();
			scrollTop();
			headerFix();
			masonryBox();
			navScroller();
			handleTagSlider()
		},

		load:function(){
			counter();
			masonryBox();
		},
		
		resize:function(){
			screenWidth = $(window).width();
			dzTheme();	
			masonryBox();
		}
	}
	
}();

/* Document.ready Start */	
jQuery(document).ready(function() {
    ClinicMaster.init();
	
	jQuery('.navicon').on('click',function(){
		$(this).toggleClass('open');
	});
	
});
/* Document.ready END */

/* Window Load START */
jQuery(window).on('load',function () {
	ClinicMaster.load();
	
	setTimeout(function() {
		var dzPreloader = document.getElementById('dzPreloader');
		if (dzPreloader) {
			dzPreloader.style.transition = 'opacity 0.5s';
			dzPreloader.style.opacity = 0;
			
			setTimeout(function() {
				dzPreloader.style.display = 'none';
			}, 500);
		}
	}, 1500);
	
});
/*  Window Load END */

/* Window Resize START */
jQuery(window).on('resize',function () {
	ClinicMaster.resize();
});
/*  Window Resize END */