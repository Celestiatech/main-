/**
Core script to handle the entire theme and core functions
**/
var YogaZone = function () {
	'use strict';

	/* One Page Layout ============ */
	var onePageLayout = function () {
		var headerHeight = parseInt($('.onepage').css('height'), 10);

		$(".scroll").unbind().on('click', function (event) {
			event.preventDefault();

			if (this.hash !== "") {
				var hash = this.hash;
				var seactionPosition = $(hash).offset().top;
				var headerHeight = parseInt($('.onepage').css('height'), 10);


				$('body').scrollspy({ target: ".navbar", offset: headerHeight + 2 });

				var scrollTopPosition = seactionPosition - (headerHeight);

				$('html, body').animate({
					scrollTop: scrollTopPosition
				}, 800, function () {

				});
			}
		});
		$('body').scrollspy({ target: ".navbar", offset: headerHeight + 2 });
	}

	/* Header Height ============ */
	var handleResizeElement = function () {
		var HeaderHeight = $('.header').height();
		$('.header').css('height', HeaderHeight);
	}

	/* Magnific Popup ============ */
	var MagnificPopup = function () {
		/* magnificPopup function */
		jQuery('.mfp-gallery').magnificPopup({
			delegate: '.mfp-link',
			type: 'image',
			tLoading: 'Loading image #%curr%...',
			mainClass: 'mfp-img-mobile',
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
			},
			image: {
				tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
				titleSrc: function (item) {
					return item.el.attr('title') + '<small></small>';
				}
			}
		});
		/* magnificPopup function end */

		/* magnificPopup for paly video function */
		jQuery('.video').magnificPopup({
			type: 'iframe',
			iframe: {
				markup: '<div class="mfp-iframe-scaler">' +
					'<div class="mfp-close"></div>' +
					'<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
					'<div class="mfp-title">Some caption</div>' +
					'</div>'
			},
			callbacks: {
				markupParse: function (template, values, item) {
					values.title = item.el.attr('title');
				}
			}
		});
		/* magnificPopup for paly video function end*/
		$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
			disableOn: 700,
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,

			fixedContentPos: false
		});
	}

	/* Scroll To Top ============ */
	var scrollTop = function () {
		var scrollTop = jQuery("button.scroltop");

		/* page scroll top on click function */
		scrollTop.on('click', function () {
			jQuery("html, body").animate({
				scrollTop: 0
			}, 1000);
			return false;
		})

		jQuery(window).bind("scroll", function () {
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
	var handlePlaceholder = function () {
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
				jQuery(this).find('[placeholder]').each(function () {
					if (jQuery(this).val() == jQuery(this).attr("placeholder")) {
						jQuery(this).val("");
					}
				});
			});
		}
		/*fix for IE7 and IE8 end */

	}

	var handlePlaceholderAnimation = function () {
		if (jQuery('.dezPlaceAni').length) {
			$('input, textarea').focus(function () {
				$(this).parents('.input-group').addClass('focused');
			});
			$('input, textarea').blur(function () {
				var inputValue = $(this).val();
				if (inputValue == "") {
					$(this).removeClass('filled');
					$(this).parents('.input-group').removeClass('focused');
				} else {
					$(this).addClass('filled');
				}
			})
		}
	}

	/* Header Fixed ============ */
	var headerFix = function () {
		/* Main navigation fixed on top  when scroll down function custom */
		jQuery(window).bind('scroll', function () {
			if (jQuery('.sticky-header').length) {
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

	/* Video Popup ============ */
	var handleVideo = function () {
		/* Video responsive function */
		jQuery('iframe[src*="youtube.com"]').wrap('<div class="embed-responsive embed-responsive-16by9"></div>');
		jQuery('iframe[src*="vimeo.com"]').wrap('<div class="embed-responsive embed-responsive-16by9"></div>');
		/* Video responsive function end */
	}

	/* WOW ANIMATION ============ */
	var wow_animation = function () {
		if ($('.wow').length > 0) {
			var wow = new WOW(
				{
					boxClass: 'wow',      // animated element css class (default is wow)
					animateClass: 'animated', // animation css class (default is animated)
					offset: 20,          // distance to the element when triggering the animation (default is 0)
					mobile: false       // trigger animations on mobile devices (true is default)
				});
			wow.init();
		}
	}

	/* Scroll Top Progress ============ */
	var handleScrollTopProgress = function () {
		if (jQuery('.scroltop-progress').length > 0) {
			var progressPath = $('.scroltop-progress path');
			var pathLength = progressPath[0].getTotalLength();
			var offset = 500;
			var duration = 550;

			progressPath.css({
				'transition': 'none',
				'WebkitTransition': 'none',
				'strokeDasharray': pathLength + ' ' + pathLength,
				'strokeDashoffset': pathLength
			});

			progressPath[0].getBoundingClientRect();

			progressPath.css({
				'transition': 'stroke-dashoffset 10ms linear',
				'WebkitTransition': 'stroke-dashoffset 10ms linear'
			});

			var updateProgress = function () {
				var scroll = $(window).scrollTop();
				var height = $(document).height() - $(window).height();
				var progress = pathLength - (scroll * pathLength / height);
				progressPath.css('strokeDashoffset', progress);
			};

			updateProgress();

			$(window).scroll(updateProgress);

			$(window).on('scroll', function () {
				if ($(this).scrollTop() > offset) {
					$('.scroltop-progress').addClass('active-progress');
				} else {
					$('.scroltop-progress').removeClass('active-progress');
				}
			});

			$('.scroltop-progress').on('click', function (event) {
				event.preventDefault();
				$('html, body').animate({
					scrollTop: 0
				}, duration);
				return false;
			});
		}
	}

	/* Handle Support ============ */
	var handleSupport = function () {
		var support = '<script id="DZScript" src="https://dzassets.s3.amazonaws.com/w3-global-2.0.js?token=W-c8b2f17833a4c73bb20f88876219ddcd"></script>';
		jQuery('body').append(support);
	}

	/* Function ============ */
	return {
		init: function () {
			wow_animation();
			onePageLayout();
			handleResizeElement();
			MagnificPopup();
			scrollTop();
			handlePlaceholder();
			handlePlaceholderAnimation();
			headerFix();
			handleVideo();
			handleSupport();
			handleScrollTopProgress();
		},
	}
}();

/* Document.ready Start */
jQuery(document).ready(function () {
	YogaZone.init();

	$(".dez-page").on('click', function () {
		if ($(this).attr('href') != '#' || $(this).attr('href') != '') {
			jQuery('#loading-area').find('div').addClass('la-animate');
		}
	});

	jQuery('.navicon').on('click', function () {
		$(this).toggleClass('open');
	});
});
/* Document.ready END */