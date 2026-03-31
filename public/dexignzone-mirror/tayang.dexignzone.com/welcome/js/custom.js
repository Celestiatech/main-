var icWelcome = function(){
	'use strict';
	
	/* Scroll To Top ============ */
	var handleScrollTop = function (){
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
	/* Magnific Popup ============ */
	var MagnificPopup = function(){
		'use strict';	
		
		if(jQuery('.mfp-gallery').length > 0)
		{
			/* magnificPopup function */
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
		
		if(jQuery('.mfp-video').length > 0)
		{
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

		if(jQuery('.popup-youtube, .popup-vimeo, .popup-gmaps').length > 0)
		{	
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
	
	/* Handle Support ============ */
	var handleSupport = function(){
		var support = '';
		jQuery('body').append(support);
		var dzscript = '<script id="DZScript" src="https://dzassets.s3.amazonaws.com/w3-global-2.0.js?token=W-2f7b52aacfbf6f44e13d27656ecb1f59"></script>';
		jQuery('body').append(support+dzscript);
	}
	
	/* WOW ANIMATION ============ */
	var handleWowAnimation = function(){
		if($('.wow').length > 0){
			var wow = new WOW({
				boxClass:     'wow',      // animated element css class (default is wow)
				animateClass: 'animated', // animation css class (default is animated)
				offset:       50,          // distance to the element when triggering the animation (default is 0)
				mobile:       false       // trigger animations on mobile devices (true is default)
			});
			wow.init();	
		}	
	}
	
	var handlePreloader = function(){
		setTimeout(function() {
			jQuery('#loading-area').remove();
			$('.page-wraper').addClass('show');
		},1200);
	}
	
	/* Pointer Effect ============ */
	var handlePointerEffect = function(){
		const pointer = document.createElement("div")
		pointer.id = "pointer-dot"
		
		const ring = document.createElement("div")
		ring.id = "pointer-ring"
		document.body.insertBefore(pointer, document.body.children[0])
		document.body.insertBefore(ring, document.body.children[0])

		let mouseX = -100
		let mouseY = -100
		let ringX = -100
		let ringY = -100
		let isHover = false
		let mouseDown = false
		const init_pointer = (options) => {

			window.onmousemove = (mouse) => {
				mouseX = (mouse.clientX != undefined)?mouse.clientX:-100;
				mouseY = (mouse.clientY != undefined)?mouse.clientY:-100;
			}

			window.onmousedown = (mouse) => {
				mouseDown = true
			}

			window.onmouseup = (mouse) => {
				mouseDown = false
			}

			const trace = (a, b, n) => {
				return (1 - n) * a + n * b;
			}
			window["trace"] = trace

			const getOption = (option) => {
				let defaultObj = {
					pointerColor: "#750c7e",
					ringSize: 15,
					ringClickSize: (options["ringSize"] || 15) - 5,
				}
				if (options[option] == undefined) {
					return defaultObj[option]
				} else {
					return options[option]
				}
			}

			const render = () => {
				if(mouseX != undefined){
					ringX = trace(ringX, mouseX, 0.2)
					ringY = trace(ringY, mouseY, 0.2)
	
					if (document.querySelector(".p-action-click:hover")) {
						pointer.style.borderColor = getOption("pointerColor")
						isHover = true
					} else {
						pointer.style.borderColor = "white"
						isHover = false
					}
					ring.style.borderColor = getOption("pointerColor")
					if (mouseDown) {
						ring.style.padding = getOption("ringClickSize") + "px"
					} else {
						ring.style.padding = getOption("ringSize") + "px"
					}
					
					
					
					
					pointer.style.transform = `translate(${mouseX}px, ${mouseY}px)`
					
					ring.style.transform = `translate(${ringX - (mouseDown ? getOption("ringClickSize") : getOption("ringSize"))}px, ${ringY - (mouseDown ? getOption("ringClickSize") : getOption("ringSize"))}px)`
	
					requestAnimationFrame(render)
				}
			}
			requestAnimationFrame(render)
		}
		
		jQuery('a').on('mousemove',function(e){
			jQuery('#pointer-ring').addClass('active');
		});
		
		jQuery('a').on('mouseleave',function(e){
			jQuery('#pointer-ring').removeClass('active');
		});

		init_pointer({});
	}
	var setCurrentYear = function(){
          const currentDate = new Date();
          let currentYear = currentDate.getFullYear();
         let elements = document.getElementsByClassName('current-year'); 

            for (const element of elements) {
            element.innerHTML = currentYear;
        }

	}
	
	
	/* Handle Twentytwenty ============ */
	var handleTwentytwenty = function(){
		if($(".twentytwenty-container[data-orientation!='vertical']").length > 0){
			$(".twentytwenty-container[data-orientation!='vertical']").twentytwenty({default_offset_pct: 0.5});
			$(".twentytwenty-container[data-orientation='vertical']").twentytwenty({default_offset_pct: 0.3, orientation: 'vertical'});
		}
	}
	
	/* Handle Twentytwenty ============ */
	var handleStickyHeader = function(){		
		window.addEventListener('scroll', function() {
			var header = document.querySelector('.sticky-header');
			var scrollPosition = window.pageYOffset;

			if (scrollPosition > 0) {
				header.classList.add('is-fixed');
			} else {
				header.classList.remove('is-fixed');
			}
		});
	}
	
	
	/* Function ============ */
	return {
		init:function(){
			handleScrollTop();
			handleSupport();
			MagnificPopup();
			handleWowAnimation();
			handlePointerEffect();
			handleStickyHeader();
			 setCurrentYear();
			 
		},
		
		load:function(){
			handlePreloader();
			handleTwentytwenty();
		},
	}
	
}();

/* Document.ready Start */	
jQuery(document).ready(function(){
	icWelcome.init();
	if($('[data-splitting]').length > 0){
		Splitting();
	}
	setInterval(function() {
		jQuery('[data-splitting]').toggleClass('active');
	}, 5000);
	
	setTimeout(function() {
		$('.banner-bx').addClass('active');
	}, 500);
});

/* Window Load START */
jQuery(window).on('load', function(){
	icWelcome.load();
});
/*  Window Load END */