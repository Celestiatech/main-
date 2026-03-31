/**
Core script to handle the entire theme and core functions
**/
var Agency = function(){
	'use strict';
	
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
	
	/* Masonry Box ============ */
	var masonryBox = function(){
		/* masonry by  = bootstrap-select.min.js */
		if(jQuery('#masonry, .masonry').length){
			var self = $("#masonry, .masonry");
			if(jQuery('.card-container').length){
				self.imagesLoaded(function () {
					self.masonry({
						gutterWidth: 15,
						isAnimated: true,
						itemSelector: ".card-container"
					});
				});
			}
		}
		
		if(jQuery('.filters').length){
			jQuery(".filters").on('click','li',function(e) {
				e.preventDefault();
				var filter = $(this).attr("data-filter");
				self.masonryFilter({
					filter: function () {
						if (!filter) return true;
						//return $(this).attr("data-filter") == filter;
						return $(this).hasClass(filter);
					}
				});
			});
		}
	}
	
	/* WOW ANIMATION ============ */
	var wow_animation = function(){
		if($('.wow').length > 0)
		{
			var wow = new WOW(
			{
			  boxClass:     'wow',      // animated element css class (default is wow)
			  animateClass: 'animated', // animation css class (default is animated)
			  offset:       20,          // distance to the element when triggering the animation (default is 0)
			  mobile:       false       // trigger animations on mobile devices (true is default)
			});
			wow.init();	
		}	
	}
	
	/* Handle Support ============ */
	var handleSupport = function(){
		var support = '<script id="DZScript" src="https://dzassets.s3.amazonaws.com/w3-global-2.0.js?token=W-74d8ce91d143cad52fad9d3661dded18"></script>';
		jQuery('body').append(support);
	}
	
	
	/* Function ============ */
	return {
		init:function(){
			wow_animation();
			scrollTop();
			handleSupport();
		},
		
		//handleMasonryFilter:function(){
		//	handleMasonryFilter();
		//},
		
		load:function(){
			masonryBox();
		}
	}
	
}();

/* Document.ready Start */	
jQuery(document).ready(function() {
    
	Agency.init();
	
});
/* Document.ready END */

/* Window Load START */
jQuery(window).load(function () {
	
	Agency.load();
	
});