/**
Core script to handle the entire theme and core functions
**/
var JobBoard = function(){
	/* Search Bar ============ */
	siteUrl = '';
	
	var screenWidth = $( window ).width();
	
	/* One Page Layout ============ */
	var onePageLayout = function() {
		'use strict';
		var headerHeight =   parseInt($('.onepage').css('height'), 10);
		$(".scroll").unbind().on('click',function(event) 
		{
			event.preventDefault();
			
			if (this.hash !== "") {
				var hash = this.hash;	
				var seactionPosition = $(hash).offset().top;
				var headerHeight =   parseInt($('.onepage').css('height'), 10);
				
				
				$('body').scrollspy({target: ".navbar, .scroll-bx", offset: headerHeight+2}); 
				
				var scrollTopPosition = seactionPosition - (headerHeight);
				
				$('html, body').animate({
					scrollTop: scrollTopPosition
				}, 800, function(){
					
				});
			}   
		});
		$('body').scrollspy({target: ".navbar, .scroll-bx", offset: headerHeight + 2});  
	}
	
	/* Header Height ============ */
	var handleResizeElement = function(){
		var HeaderHeight = $('.header').height();
		$('.header').css('height', HeaderHeight);
	}
	
	/* Load File ============ */
	var dzTheme = function(){
		 'use strict';
		 var loadingImage = '<img src="images/loading.gif">';
		 jQuery('.dzload').each(function(){
		 var dzsrc =   siteUrl + $(this).attr('dzsrc');
		  //jQuery(this).html(loadingImage);
		 	jQuery(this).hide(function(){
				jQuery(this).load(dzsrc, function(){
					jQuery(this).fadeIn('slow');
				}); 
			})
			
		 });
		 //alert(screenWidth);
		 if(screenWidth < 991)
		{
			var logoData = jQuery('<div>').append($('.mo-left .logo-header').clone()).html();
			jQuery('.mo-left .header-nav').prepend(logoData);
			jQuery('.mo-left .header-nav .logo-header > a > img').attr('src','images/logo-black.png');
			jQuery('.mo-left.lw .header-nav .logo-header > a > img').attr('src','images/logo-white.png');
		}
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
			} else {
				jQuery("button.scroltop").fadeOut(1000);
			}
		});
		/* page scroll top on click function end*/
	}
	
	/* handle Placeholder ============ */
	var handlePlaceholder = function(){
		/* input placeholder for ie9 & ie8 & ie7 */
		jQuery.support.placeholder = ('placeholder' in document.createElement('input'));
		/* input placeholder for ie9 & ie8 & ie7 end*/
		
		/*fix for IE7 and IE8  */
		if (!jQuery.support.placeholder) {
			jQuery("[placeholder]").focus(function () {
				if (jQuery(this).val() == jQuery(this).attr("placeholder")) jQuery(this).val("");
			}).blur(function () {
				if (jQuery(this).val() == "") jQuery(this).val(jQuery(this).attr("placeholder"));
			}).blur();

			jQuery("[placeholder]").parents("form").submit(function () {
				jQuery(this).find('[placeholder]').each(function() {
					if (jQuery(this).val() == jQuery(this).attr("placeholder")) {
						 jQuery(this).val("");
					}
				});
			});
		}
		/*fix for IE7 and IE8 end */
		
	}
	
	var handlePlaceholderAnimation = function()
	{
		if(jQuery('.dezPlaceAni').length)
		{
		
			$('input, textarea').focus(function(){
			  $(this).parents('.input-group').addClass('focused');
			});
			
			$('input, textarea').blur(function(){
			  var inputValue = $(this).val();
			  if ( inputValue == "" ) {
				$(this).removeClass('filled');
				$(this).parents('.input-group').removeClass('focused');  
			  } else {
				$(this).addClass('filled');
			  }
			})
		}
	}
	
	/* Footer Align ============ */
	var footerAlign = function() {
		'use strict';
		jQuery('.site-footer').css('display', 'block');
		jQuery('.site-footer').css('height', 'auto');
		var footerHeight = jQuery('.site-footer').outerHeight();
		jQuery('.footer-fixed > .page-wraper').css('padding-bottom', footerHeight);
		jQuery('.site-footer').css('height', footerHeight);
	}
	
	/* Masonry Box ============ */
	var masonryBox = function(){
		'use strict';
		/* masonry by  = bootstrap-select.min.js */
		if(jQuery('#masonry, .masonry').length)
		{
			var self = $("#masonry, .masonry");
			if(jQuery('.card-container').length)
		    {
				self.imagesLoaded(function () {
					self.masonry({
						gutterWidth: 15,
						isAnimated: true,
						itemSelector: ".card-container"
					});
				});
			}
		}
		if(jQuery('.filters').length)
		{
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
		/* masonry by  = bootstrap-select.min.js end */
	}
	
	/* Use on Shortcode Filter Page ============ */
	var handleMasonryFilter = function(){
		'use strict';
		
		if(jQuery('#masonry1').length)
		{
			var masonry1 = $("#masonry1");
			
				masonry1.imagesLoaded(function () {
					masonry1.masonry({
						gutterWidth: 15,
						isAnimated: true,
						itemSelector: ".card-container"
					});
				});
			
			
			
			jQuery(".filters1").on('click','li',function(e) {
				e.preventDefault();
				var filter = $(this).attr("data-filter");
				masonry1.masonryFilter({
					filter: function () {
						if (!filter) return true;
						return $(this).hasClass(filter);
					}
				});
			});
			
			
			$("#masonry1 .rtl").hide();
			$(".filters1 .rtl").on('click',function(){$("#masonry1 .rtl").show();});
		}
		
		if(jQuery('#masonry2').length)
		{
			var masonry2 = $("#masonry2");
			
				masonry2.imagesLoaded(function () {
					masonry2.masonry({
						gutterWidth: 15,
						isAnimated: true,
						itemSelector: ".card-container"
					});
				});
			
			
			
			jQuery(".filters2").on('click','li',function(e) {
				e.preventDefault();
				var filter = $(this).attr("data-filter");
				masonry2.masonryFilter({
					filter: function () {
						if (!filter) return true;
						return $(this).hasClass(filter);
					}
				});
			});
			
			$("#masonry2 .rtl").hide();
			$(".filters2 .rtl").on('click',function(){$("#masonry2 .rtl").show();});
			
		}
		
		if(jQuery('#masonry3').length)
		{
			var masonry3 = $("#masonry3");
			
				masonry3.imagesLoaded(function () {
					masonry3.masonry({
						gutterWidth: 15,
						isAnimated: true,
						itemSelector: ".card-container"
					});
				});
			
			
			
			jQuery(".filters3").on('click','li',function(e) {
				e.preventDefault();
				var filter = $(this).attr("data-filter");
				masonry3.masonryFilter({
					filter: function () {
						if (!filter) return true;
						return $(this).hasClass(filter);
					}
				});
			});
			
			$("#masonry3 .rtl").hide();
			$(".filters3 .rtl").on('click',function(){$("#masonry3 .rtl").show();});
		}
		
		if(jQuery('#masonry4').length)
		{
			var masonry4 = $("#masonry4");
			
				masonry4.imagesLoaded(function () {
					masonry4.masonry({
						gutterWidth: 15,
						isAnimated: true,
						itemSelector: ".card-container"
					});
				});
			
			
			
			jQuery(".filters4").on('click','li',function(e) {
				e.preventDefault();
				var filter = $(this).attr("data-filter");
				masonry4.masonryFilter({
					filter: function () {
						if (!filter) return true;
						return $(this).hasClass(filter);
					}
				});
			});
			
			$("#masonry4 .rtl").hide();
			$(".filters4 .rtl").on('click',function(){$("#masonry4 .rtl").show();});
		}
		
		
		if(jQuery('#masonry5').length)
		{
			var masonry5 = $("#masonry5");
			
				masonry5.imagesLoaded(function () {
					masonry5.masonry({
						gutterWidth: 15,
						isAnimated: true,
						itemSelector: ".card-container"
					});
				});
			
			
			
			jQuery(".filters5").on('click','li',function(e) {
				e.preventDefault();
				var filter = $(this).attr("data-filter");
				masonry5.masonryFilter({
					filter: function () {
						if (!filter) return true;
						return $(this).hasClass(filter);
					}
				});
			});
			
			$("#masonry5 .rtl").hide();
			$(".filters5 .rtl").on('click',function(){$("#masonry5 .rtl").show();});
			
		}
		
		if(jQuery('#masonry6').length)
		{
			var masonry6 = $("#masonry6");
			
				masonry6.imagesLoaded(function () {
					masonry6.masonry({
						gutterWidth: 15,
						isAnimated: true,
						itemSelector: ".card-container"
					});
				});
			
			
			
			jQuery(".filters6").on('click','li',function(e) {
				e.preventDefault();
				var filter = $(this).attr("data-filter");
				masonry6.masonryFilter({
					filter: function () {
						if (!filter) return true;
						return $(this).hasClass(filter);
					}
				});
			});
			
			$("#masonry6 .rtl").hide();
			$(".filters6 .rtl").on('click',function(){$("#masonry6 .rtl").show();});
			
		}
	}
	
	/* Gallery Filter ============ */
	var handleFilterMasonary = function(){
		/* gallery filter activation = jquery.mixitup.min.js */ 
		if (jQuery('#image-gallery-mix').length) {
			jQuery('.gallery-filter').find('li').each(function () {
				$(this).addClass('filter');
			});
			jQuery('#image-gallery-mix').mixItUp();
		};
		if(jQuery('.gallery-filter.masonary').length){
			jQuery('.gallery-filter.masonary').on('click','span', function(){
				var selector = $(this).parent().attr('data-filter');
				jQuery('.gallery-filter.masonary span').parent().removeClass('active');
				jQuery(this).parent().addClass('active');
				jQuery('#image-gallery-isotope').isotope({ filter: selector });
				return false;
			});
		}
		/* gallery filter activation = jquery.mixitup.min.js */
	}
	
	/* Resizebanner ============ */
	var handleBannerResize = function(){
		$(".full-height").css("height", $(window).height());
	}
	
	/* Content Scroll ============ */
	var handleCustomScroll = function(){
		/* all available option parameters with their default values */
		if($(".content-scroll").length)
		{ 
			$(".content-scroll").mCustomScrollbar({
				setWidth:false,
				setHeight:false,
				axis:"y"
			});	
		}
	}
	
	/* Left Menu ============ */
	var handleSideBarMenu = function(){
		$('.openbtn').on('click',function(e){
			e.preventDefault();
			if($('#mySidenav').length > 0)
			{
				document.getElementById("mySidenav").style.left = "0";
			}

			if($('#mySidenav1').length > 0)
			{
				document.getElementById("mySidenav1").style.right = "0";
			}
			
		})
		
		$('.closebtn').on('click',function(e){
			e.preventDefault();
			if($('#mySidenav').length > 0)
			{
				document.getElementById("mySidenav").style.left = "-300px";
			}
			
			if($('#mySidenav1').length > 0)
			{
				document.getElementById("mySidenav1").style.right = "-820px";
			}
		})
	}
	
	var reposition = function (){
		'use strict';
		var modal = jQuery(this),
		dialog = modal.find('.modal-dialog');
		modal.css('display', 'block');
		
		/* Dividing by two centers the modal exactly, but dividing by three 
		 or four works better for larger screens.  */
		dialog.css("margin-top", Math.max(0, (jQuery(window).height() - dialog.height()) / 2));
	}
	
	var handelResize = function (){
		
		/* Reposition when the window is resized */
		jQuery(window).on('resize', function() {
			jQuery('.modal:visible').each(reposition);
			if(jQuery('.equal-wraper').length){
				equalheight('.equal-wraper .equal-col');
			}
			footerAlign();
		});
	}
	
	var handleSupport = function(){
		var support = '<script id="DZScript" src="https://dzassets.s3.amazonaws.com/w3-global-2.0.js?token=W-5aa47198fcc64f2da5c7ced205b022e0"></script>';
		jQuery('body').append(support);
	}
	
	/* Website Launch Date */ 
	var WebsiteLaunchDate = new Date();
	var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	WebsiteLaunchDate.setMonth(WebsiteLaunchDate.getMonth() + 1);
	WebsiteLaunchDate =  WebsiteLaunchDate.getDate() + " " + monthNames[WebsiteLaunchDate.getMonth()] + " " + WebsiteLaunchDate.getFullYear();
	/* Website Launch Date END */ 
	
	/* Function ============ */
	return {
		init:function(){
			onePageLayout();
			dzTheme();
			handleResizeElement();
			scrollTop();
			handlePlaceholder();
			handlePlaceholderAnimation();
			footerAlign();
			handleFilterMasonary();
			handleCustomScroll();
			handleSideBarMenu();
			handleBannerResize();
			handleSupport();
			handelResize();
		},
		
		load:function(){
			masonryBox();
			handleMasonryFilter();
		}
	}
	
}();

/* Document.ready Start */	
jQuery(document).ready(function() {
    'use strict';
	JobBoard.init();
	
	//jQuery('#loading-area').find('div').addClass('la-animate');
	$(".dez-page").on('click',function(){
		if ($(this).attr('href') != '#' || $(this).attr('href') != '') 
		{
			jQuery('#loading-area').find('div').addClass('la-animate');			
		}
	});
	
	var screenWidth = jQuery( window ).width();
	if(screenWidth <= 991 )
	{
		jQuery('.navbar-nav > li > a, .sub-menu > li > a').on('click', function(e){
			//e.preventDefault();
			if(jQuery(this).parent().hasClass('open'))
			{
				jQuery(this).parent().removeClass('open');
			}
			else{
				jQuery(this).parent().parent().find('li').removeClass('open');
				jQuery(this).parent().addClass('open');
			}
		});
	}

	jQuery('.navicon').on('click',function(){
		$(this).toggleClass('open');
	});
	
});
/* Document.ready END */

/* Window Load START */
jQuery(window).load(function () {
	'use strict'; 
	
	JobBoard.load();
	/* setTimeout(function(){
		jQuery('#loading-area').remove();
	}, 0); */
});

/*  Window Load END */