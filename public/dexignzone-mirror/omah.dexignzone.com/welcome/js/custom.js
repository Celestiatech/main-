var dzWelcome = function(){
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
	
	/* Handle Support ============ */
	var handleSupport = function(){
		var support = '<script id="DZScript" src="https://dzassets.s3.amazonaws.com/w3-global-2.0.js?token=W-1a093738915a720c0407088e86031f4e"></script>';
		jQuery('body').append(support);
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
			jQuery('#preloader').remove();
			$('.page-wraper').addClass('show');
		},800);
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
			handleWowAnimation();
			handlePointerEffect();
			handleStickyHeader();
		},
		
		load:function(){
			handlePreloader();
		},
	}
	
}();

/* Document.ready Start */	
jQuery(document).ready(function(){
	dzWelcome.init();
});

/* Window Load START */
jQuery(window).on('load', function(){
	dzWelcome.load();
});
/*  Window Load END */