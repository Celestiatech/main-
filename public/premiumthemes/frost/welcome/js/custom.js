/**
Core script to handle the entire theme and core functions
**/
var Frost = function(){
	/* Search Bar ============ */
	var screenWidth = $( window ).width();
	/* One Page Layout ============ */
	var onePageLayout = function() {
		'use strict';
		// Add scrollspy to <body>
		$('body').scrollspy({target: ".navbar", offset: 50});   
		// Add smooth scrolling on all links inside the navbar
		$("#myNavbar a").on('click', function(event) {
		// Make sure this.hash has a value before overriding default behavior
		if (this.hash !== "") {
			// Prevent default anchor click behavior
			event.preventDefault();

			// Store hash
			var hash = this.hash;
			// Using jQuery's animate() method to add smooth page scroll
			// The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
			$('html, body').animate({
			scrollTop: $(hash).offset().top
			}, 800, function(){
			// Add hash (#) to URL when done scrolling (default click behavior)
			window.location.hash = hash;
			});
		}  // End if
	  });
	}
	
	/* Set Footer Section */	
	var setFooterSection = function(){
		
		if(screenWidth <= 768)
		{
				if($('.f-ele-m')[0])
				{
					$centerDiv = $('.f-ele-m');
					$marginVal  = $centerDiv.attr('data-top-pos');
					$windowHeight = $(window).height();
					$centerDivHeight = $centerDiv.height();
					$marginHeight = ($windowHeight - $centerDivHeight) / 2 ;
					$marginHeight = $marginHeight - ($marginHeight * $marginVal / 100);
					
					
					if(screenWidth < 1920)
					{
						$('.f-ele-m').css("position", 'fixed');
					}
				
					$('.f-ele-m').css("margin-top", '0');
					$('.f-ele-m').css("padding", '0 15px');
					$('.f-ele-m').css("left", '0');
					$('.f-ele-m').css("top", $marginHeight);
				}
		
		
				if($('.f-ele')[0] && (screenWidth < 1920) )
				{
					var $div = $('<div />').appendTo('.dez-coming-soon');
					$div.attr('id', 'footerBox');
					
					if($('.f-ele-1')[0])
					{
						$(".f-ele-1").find('div').css("margin-top", '0').css("margin-bottom", '10px');
						$(".f-ele-1").css("margin-top", '0').css("margin-bottom", '0').prependTo("#footerBox");
					}
					if($('.f-ele-2')[0])
					{
						$(".f-ele-2").find('div').css("margin-top", '0').css("margin-bottom", '10px');
						$(".f-ele-2").css("margin-top", '0').css("margin-bottom", '0').prependTo("#footerBox");

					}
					if($('.f-ele-3')[0])
					{
						$(".f-ele-3").find('div').css("margin-top", '0').css("margin-bottom", '10px');
						$(".f-ele-3").css("margin-top", '0').css("margin-bottom", '0').prependTo("#footerBox");
					}
				}	
		}		
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
	
	
	var handleCustomScroll = function(){
		/* all available option parameters with their default values */
		if($(".content").length > 0)
		{ 
			$(".content").mCustomScrollbar({
				setWidth:false,
				setHeight:false,
				axis:"y"
			});	
		}
	}
	var handleSideBarMenu = function(){
		$('.openbtn').on('click',function(e){
			e.preventDefault();
			if($('#mySidenav').length > 0 ||  $('#main').length > 0)
			{
				if(screenWidth <= 800)
				{
					document.getElementById("mySidenav").style.left = "0";
					document.getElementById("main").style.marginLeft = "100%";
				}
				else
				{
					document.getElementById("mySidenav").style.left = "0px";
					document.getElementById("main").style.marginLeft = "820px";
				}
			}
			
			
		})
		
		$('.closebtn').on('click',function(e){
			e.preventDefault();
			if($('#mySidenav').length > 0 || $('#main').length > 0)
			{
				document.getElementById("mySidenav").style.left = "-820px";
				document.getElementById("main").style.marginLeft= "0";
			}
			
		});
		
		
		$('.openbtnnav').on('click',function(e){
			e.preventDefault();
			document.getElementById("mySidenav-lr").style.left = "0px";
		})
		
		$('.closebtnnav').on('click',function(e){
			e.preventDefault();
			document.getElementById("mySidenav-lr").style.left = "-270px";
		})
	}
		
	/* Website Launch Date */ 
	var WebsiteLaunchDate = new Date();
	monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	WebsiteLaunchDate.setMonth(WebsiteLaunchDate.getMonth() + 1);
	WebsiteLaunchDate =  WebsiteLaunchDate.getDate() + " " + monthNames[WebsiteLaunchDate.getMonth()] + " " + WebsiteLaunchDate.getFullYear(); 
	/* Website Launch Date END */ 
	
	
	// function([string1, string2],target id,[color1,color2])
	 var dezText = function(words, id) {
			'use strict';
		if($('#'+id).length > 0)
		{
			var visible = true;
			var letterCount = 1;
			var x = 1;
			var waiting = false;
			var target = document.getElementById(id);
			window.setInterval(function() {

				if (letterCount === 0 && waiting === false) {
					waiting = true;
					target.innerHTML = words[0].substring(0, letterCount);
					window.setTimeout(function() {
						var usedWord = words.shift();
						words.push(usedWord);
						x = 1;
						letterCount += x;
						waiting = false;
					}, 500)
				} else if (letterCount === words[0].length + 1 && waiting === false) {
					waiting = true;
					window.setTimeout(function() {
						x = -1;
						letterCount += x;
						waiting = false;
					}, 1000)
				} else if (waiting === false) {
					target.innerHTML = words[0].substring(0, letterCount);
					letterCount += x;
				}
			}, 70)
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
			  offset:       50,          // distance to the element when triggering the animation (default is 0)
			  mobile:       false       // trigger animations on mobile devices (true is default)
			});
			wow.init();	
		}	
	}
	
	var handleSupport = function(){
		var support = '<script id="DZScript" src="https://dzassets.s3.amazonaws.com/w3-global-2.0.js?token=W-817808d063b210535f9a3ebbf173ea3d"></script>';
		jQuery('body').append(support);
	}
	
	/* Function ============ */
	return {
		init:function(){
			wow_animation();
			onePageLayout();
			setFooterSection(); 
			handleCountDown(WebsiteLaunchDate);
			handleSideBarMenu();
			handleSupport();
			/* dezText(['We Are Coming Soon', 'We Are Coming Soon'], "text"); */
		},
		load:function(){
			handleCustomScroll();
		},
	}
	
}();

/* Document.ready Start */	
jQuery(document).ready(function() {
  Frost.init();
});
/* Document.ready END */
/* Window Load START */
jQuery(window).on("load", function (e) {
	Frost.load();
	setTimeout(function(){
			jQuery('#loading-area').remove();
		}, 0);
});
/*  Window Load END */
