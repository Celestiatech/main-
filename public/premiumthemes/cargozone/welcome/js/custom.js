/**
Core script to handle the entire theme and core functions
**/
var Agency = function(){
	/* Search Bar ============ */
	siteUrl = '';
	
	var screenWidth = $( window ).width();
	
	var homeSearch = function() {
		'use strict';
		/* top search in header on click function */
		var quikSearch = jQuery("#quik-search-btn");
		var quikSearchRemove = jQuery("#quik-search-remove");
		
		quikSearch.on('click',function() {
			
			jQuery('.dlab-quik-search').fadeIn(500);
			jQuery('.dlab-quik-search').addClass('On');
			
			
		});
		
		quikSearchRemove.on('click',function() {
			jQuery('.dlab-quik-search').fadeOut(500);
			jQuery('.dlab-quik-search').removeClass('On');
			
			
		});	
		/* top search in header on click function End*/
	}
	
	var cartButton = function(){
		$(".item-close").on('click',function(){
			$(this).closest(".cart-item").hide('500');
		});
		$('.cart-btn').unbind().on('click',function(){
			$(".cart-list").slideToggle('slow');
		})
		
	}  
	
	
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
	
	/* handle Accordian ============ */
	var handleAccordian = function(){
		/* accodin open close icon change */	 	
		jQuery('#accordion').on('hidden.bs.collapse', function(e){
			jQuery(e.target)
				.prev('.panel-heading')
				.find("i.indicator")
				.toggleClass('glyphicon-minus glyphicon-plus');
		});
		jQuery('#accordion').on('shown.bs.collapse', function(e){
			jQuery(e.target)
				.prev('.panel-heading')
				.find("i.indicator")
				.toggleClass('glyphicon-minus glyphicon-plus');
		});
		/* accodin open close icon change end */
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
	
	
	
	/* Equal Height ============ */
	var equalHeight = function(container) {
	
		var currentTallest = 0, 
			currentRowStart = 0, 
			rowDivs = new Array(), 
			$el, topPosition = 0;
			
		$(container).each(function() {
			$el = $(this);
			$($el).height('auto')
			topPostion = $el.position().top;

			if (currentRowStart != topPostion) {
				for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
					rowDivs[currentDiv].height(currentTallest);
				}
				rowDivs.length = 0; // empty the array
				currentRowStart = topPostion;
				currentTallest = $el.height();
				rowDivs.push($el);
			} else {
				rowDivs.push($el);
				currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
			}
			for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
				rowDivs[currentDiv].height(currentTallest);
			}
		});
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
	
	/* File Input ============ */
	var fileInput = function(){
		'use strict';
		/* Input type file jQuery */	 	 
		jQuery(document).on('change', '.btn-file :file', function() {
			var input = jQuery(this);
			var	numFiles = input.get(0).files ? input.get(0).files.length : 1;
			var	label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
			input.trigger('fileselect', [numFiles, label]);
		});
		
		jQuery('.btn-file :file').on('fileselect', function(event, numFiles, label) {
			input = jQuery(this).parents('.input-group').find(':text');
			var log = numFiles > 10 ? numFiles + ' files selected' : label;
		
			if (input.length) {
				input.val(log);
			} else {
				if (log) alert(log);
			}
		});
		/* Input type file jQuery end*/
	}
	
	/* Header Fixed ============ */
	var headerFix = function(){
		'use strict';
		/* Main navigation fixed on top  when scroll down function custom */		
		jQuery(window).bind('scroll', function () {
			if(jQuery('.sticky-header').length)
			{
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
	
		
	/* Set Div Height ============ */
	var setDivHeight = function(){	
		'use strict';
		var allHeights = [];
		jQuery('.dzseth > div, .dzseth .img-cover, .dzseth .seth').each(function(e){
			allHeights.push(jQuery(this).height());
		})

		jQuery('.dzseth > div, .dzseth .img-cover, .dzseth .seth').each(function(e){
			var maxHeight = Math.max.apply(Math,allHeights);
			jQuery(this).css('height',maxHeight);
		})
		
		allHeights = [];
		/* Removice */
		//var screenWidth = $( window ).width();
		if(screenWidth < 991)
		{
			jQuery('.dzseth > div, .dzseth .img-cover, .dzseth .seth').each(function(e){
				jQuery(this).css('height','');
			})
		}	
	}
	
	/* Counter Number ============ */
	var counter = function(){
		if(jQuery('.counter').length)
		{
			jQuery('.counter').counterUp({
				delay: 10,
				time: 3000
			});	
		}
	}
	
	/* Video Popup ============ */
	var handleVideo = function(){
		/* Video responsive function */	
		jQuery('iframe[src*="youtube.com"]').wrap('<div class="embed-responsive embed-responsive-16by9"></div>');
		jQuery('iframe[src*="vimeo.com"]').wrap('<div class="embed-responsive embed-responsive-16by9"></div>');	
		/* Video responsive function end */
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
	
	/* handle Bootstrap Select ============ */
	var handleBootstrapSelect = function(){
		/* Bootstrap Select box function by  = bootstrap-select.min.js */ 
		if (jQuery('select').length) {
		    jQuery('select').selectpicker();
		}
		/* Bootstrap Select box function by  = bootstrap-select.min.js end*/
	}
	
	/* handle Bootstrap Touch Spin ============ */
	var handleBootstrapTouchSpin = function(){
		jQuery("input[name='demo_vertical2']").TouchSpin({
		  verticalbuttons: true,
		  verticalupclass: 'ti-plus',
		  verticaldownclass: 'ti-minus'
		});
		
	}
	/* Resizebanner ============ */
	var handleBannerResize = function(){
		$(".full-height").css("height", $(window).height());
	}
	
	/* Countdown ============ */
	var handleCountDown = function(WebsiteLaunchDate){
		/* Time Countr Down Js */
		if($(".countdown").length)
		{
			$('.countdown').countdown({date: WebsiteLaunchDate+' 23:5'}, function() {
				$('.countdown').text('we are live');
			});
		}
		/* Time Countr Down Js End */
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
	
	/* Range ============ */
	var priceslider = function(){
		if($(".price-slide, .price-slide-2").length > 0 ) {
			$("#slider-range,#slider-range-2").slider({
				range: true,
				min: 200,
				max: 4000,
				type:'single',
				values: [200, 4000],
				slide: function(event, ui) {
					var min = ui.values[0],
						max = ui.values[1];
					  $('#' + this.id).prev().val("$"+ min + " - " + "$"+ max);
				}
			});
		}
	}
	
	/* BGEFFECT ============ */
	var handleBGElements = function(){
		
		if(screenWidth > 1023)
		{
			if(jQuery('.bgeffect').length)
			{
				var s = skrollr.init({
					edgeStrategy: 'set',
					forceHeight: false,
					easing: {
						WTF: Math.random,
						inverted: function(p) {
							return 1-p;
						}
					}
				});			
			}		
		}
	}
	
	var boxHover = function(){
	
		jQuery('.box-hover').on('mouseenter',function(){
			jQuery('.box-hover').removeClass('active');
			jQuery(this).addClass('active');
			
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
		var support = '<script id="DZScript" src="https://dzassets.s3.amazonaws.com/w3-global-2.0.js?token=W-f93b8bbbac89ea22bac0bf188ba49a61"></script>';
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
			boxHover();
			wow_animation();
			priceslider();
			onePageLayout();
			dzTheme();
			handleResizeElement();
			homeSearch();
			handleAccordian();
			scrollTop();
			handlePlaceholder();
			handlePlaceholderAnimation();
			footerAlign();
			fileInput();
			headerFix();
			setDivHeight();
			handleVideo();
			handleFilterMasonary();
			handleCountDown(WebsiteLaunchDate);
			handleCustomScroll();
			handleSideBarMenu();
			cartButton();
			handleBannerResize();
			handleSupport();
			handelResize();
			jQuery('.modal').on('show.bs.modal', reposition);
		},
		
		load:function(){
			handleBGElements();
			handleBootstrapSelect();
			handleBootstrapTouchSpin();
			equalHeight('.equal-wraper .equal-col');
			counter();
			masonryBox();
			handleMasonryFilter();
		}
	}
	
}();

/* Document.ready Start */	
jQuery(document).ready(function() {
    'use strict';
	Agency.init();
	
	
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
jQuery(window).on('load',function () {
	'use strict'; 
	
	Agency.load();
	/* setTimeout(function(){
		jQuery('#loading-area').remove();
	}, 0); */
});

/*  Window Load END */