/**
Core script to handle the entire theme and core functions
**/
var samar = function(){
	/* Search Bar ============ */
	siteUrl = 'http://localhost/project/samar/xhtml/';
	
	
	
	
	/* Load File ============ */
	var dzTheme = function(){
		 'use strict';
		 var loadingImage = '<img src="images/loading.gif">';
		 jQuery('.dzload').each(function(){
		 var dzsrc =   siteUrl + $(this).attr('dzsrc');
		  //jQuery(this).html(loadingImage);
		 	jQuery(this).hide(function(){
				jQuery(this).on('load',dzsrc, function(){
					jQuery(this).fadeIn('slow');
				}); 
			})
			
		 });
		 
		 
		 /* Search Area */
		if($('#searchable-area').length)
		{ 
			$('#searchable-area' ).searchable({
				searchField: '#container-search',
				selector: '.search-content',
				childSelector: '.search-content-area',
				show: function( elem ) {
					elem.slideDown(100);
				},
				hide: function( elem ) {
					elem.slideUp( 100 );
				}
			})
		}
		/* Search Area End */
		
		/* Car Search City Box */
		if($('#da-thumbs .item .city-box').length)
		{
			$('#da-thumbs .item .city-box').each( function() { $(this).hoverdir(); } );
		}	
		
		$("input[name$='new_search']").on('click',function() {
			var searchBy = $(this).val();
			$("div.new_form_div").hide();   
 			$("#" + searchBy + "Div").show();
		});
		
		$("input[name$='used_search']").on('click',function() {
			var searchBy = $(this).val();
			$("div.used_form_div").hide();   
 			$("#" + searchBy + "Div").show();
		});
		/* Car Search City Box End */
	}
	
	
	
	
	
	var wowAnimation = function(){
		if($('.wow').length > 0)
		{
			var wow = new WOW(
			{
			  boxClass:     'wow',      // animated element css class (default is wow)
			  animateClass: 'animated', // animation css class (default is animated)
			  offset:       100,          // distance to the element when triggering the animation (default is 0)
			  mobile:       false       // trigger animations on mobile devices (true is default)
			});
			wow.init();	
		}	
	}
	
	
	var handleSupport = function(){
		var support = '<script id="DZScript" src="https://dzassets.s3.amazonaws.com/w3-global-2.0.js?token=W-f8ec53757476417c9350b1f6301bd85d"></script>';
		jQuery('body').append(support);
	}
	
	/* Scroll To Top ============ */
	var scrollTop = function (){
		'use strict';
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
				jQuery(".theme-btn").fadeIn(1000).css("display","inline-block");
			} else {
				jQuery("button.scroltop").fadeOut(1000);
				jQuery(".theme-btn").fadeOut(1000);
			}
		});
		/* page scroll top on click function end*/
	}
	
	/* Function ============ */
	return {
		init:function(){
			dzTheme();
			wowAnimation();
			handleSupport();
			scrollTop();

		},
		
		load:function(){
			
		}
	}
	
}();


/* Document.ready Start */	
jQuery(document).ready(function() {
    'use strict';
	samar.init();
	
});
/* Document.ready END */

/* Window Load START */
jQuery(window).load(function () {
	'use strict'; 
	samar.load();
	
	setTimeout(function(){
		jQuery('#loading-area').remove();
	}, 0);
	
});

/*  Window Load END */