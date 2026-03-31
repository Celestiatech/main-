/**
Core script to handle the entire theme and core functions
**/

function getUrlParams(dParam) {
    var dPageURL = window.location.search.substring(1),
        dURLVariables = dPageURL.split('&'),
        dParameterName,
        i;

    for (i = 0; i < dURLVariables.length; i++) {
        dParameterName = dURLVariables[i].split('=');

        if (dParameterName[0] === dParam) {
            return dParameterName[1] === undefined ? true : decodeURIComponent(dParameterName[1]);
        }
    }
}

var Mophy = function(){
	
	/* Search Bar ============ */
	var screenWidth = $( window ).width();
	
	// var homeSearch = function() {}
	
	var handleSelectPicker = function(){
		if(jQuery('.dataTables_length select').length > 0 ){
			jQuery('.dataTables_length select').selectpicker();
		}
	}
	
	var handleTheme = function(){
		
		// var direction = getCookie('direction') || getUrlParams('dir') || 'ltr';
		
		// if(direction == 'rtl' || body.attr('direction') == 'rtl'){
			$('#preloader').fadeOut(500);
			$('#main-wrapper').addClass('show');
		// }
	}
	
	var handleMetisMenu = function() {
		if(jQuery('#menu').length > 0 ){
			$("#menu").metisMenu();
		}
		jQuery('.metismenu > .mm-active ').each(function(){
			if(!jQuery(this).children('ul').length > 0)
			{
				jQuery(this).addClass('active-no-child');
			}
		});
	}
	
	
	var handleAllChecked = function() {
		$("#checkAll, #checkAll4, #checkAll1, #checkAll2, #checkAll5").on('change',function() {
			$("td input:checkbox, .custom-checkbox input:checkbox").prop('checked', $(this).prop("checked"));
		});
		$(".checkAllInput").on('click',function() {
			jQuery(this).closest('.ItemsCheckboxSec').find('input[type="checkbox"]').prop('checked', true);		
		});
		$(".unCheckAllInput").on('click',function() {
			jQuery(this).closest('.ItemsCheckboxSec').find('input[type="checkbox"]').prop('checked', false);		
		});
	}
	
	var handleNavigation = function() {
		$(".nav-control").on('click', function() {

			$('#main-wrapper').toggleClass("menu-toggle");

			$(".hamburger").toggleClass("is-active");
		});
	}
	
	var handleCurrentActive = function() {
		var nk = window.location.href;
		var o = $("ul#menu a").filter(function() {
			return this.href === nk;
		});

		// Remove existing classes first
		$("ul#menu li").removeClass("mm-active");
		$("ul#menu a").removeClass("mm-active");
		$("ul#menu ul").removeClass("mm-show").attr("aria-expanded", "false");

		if (o.length > 0) {
			// Mark the matched <a> and its hierarchy
			o.addClass("mm-active");
			var parentLi = o.parent();
			parentLi.addClass("mm-active");

			var parentUl = parentLi.parent();
			while (parentUl.is("ul")) {
				parentUl.addClass("mm-show").attr("aria-expanded", "true");
				var upperLi = parentUl.parent();
				if (upperLi.is("li")) {
					upperLi.addClass("mm-active");
				}
				parentUl = upperLi.parent();
			}
		} else {
			// Default: only activate the first <li> and its structure
			var firstLi = $("ul#menu > li:first");
			firstLi.addClass("mm-active");
			firstLi.children('a').attr('aria-expanded', 'true').addClass('mm-active');
			firstLi.children('ul').addClass('mm-show').attr('aria-expanded', 'true');
		}
	};

	var handleCkEditor = function(){
		if(jQuery("#ckeditor").length>0) {
			ClassicEditor
			.create( document.querySelector( '#ckeditor' ), {
				simpleUpload: {
                    uploadUrl: 'ckeditor-upload.php', 
                }
			} )
			.then( editor => {
				window.editor = editor;
			} )
			.catch( err => {
				console.error( err.stack );
			} );
		}
	}
	var handleCustomFileInput = function() {
		$(".custom-file-input").on("change", function() {
			var fileName = $(this).val().split("\\").pop();
			$(this).siblings(".custom-file-label").addClass("selected").html(fileName);
		});
	}
	var handleDraggableCard = function() {
		if($('.draggable-zone').length > 0){
			var dzCardDraggable = function () {
				return {
					init: function () {
						var containers = document.querySelectorAll('.draggable-zone');

						if (containers.length === 0) {
							return false;
						}

						var swappable = new Sortable.default(containers, {
							draggable: '.draggable',
							handle: '.draggable.draggable-handle',
							mirror: {
								appendTo: 'body',
								constrainDimensions: true
							}
						});
				   
						swappable.on('drag:stop', () => {
							setTimeout(function(){
								setBoxCount();
							}, 200);
						})
					}
				};
			}();

			jQuery(document).ready(function () {
				dzCardDraggable.init();
			});
			
			function setBoxCount(){
				var cardCount = 0;
				jQuery('.dropzoneContainer').each(function(){
					cardCount = jQuery(this).find('.draggable-handle').length;
					jQuery(this).find('.totalCount').html(cardCount);
				});
			}	
		}
	}
	
	var handleMiniSidebar = function() {
		$("ul#menu>li").on('click', function() {
			const sidebarStyle = $('body').attr('data-sidebar-style');
			if (sidebarStyle === 'mini') {
				console.log($(this).find('ul'))
				$(this).find('ul').stop()
			}
		})
	}
	
	
	
	var handleDataAction = function() {
		$('a[data-action="collapse"]').on("click", function(i) {
			i.preventDefault(),
				$(this).closest(".card").find('[data-action="collapse"] i').toggleClass("mdi-arrow-down mdi-arrow-up"),
				$(this).closest(".card").children(".card-body").collapse("toggle");
		});

		$('a[data-action="expand"]').on("click", function(i) {
			i.preventDefault(),
				$(this).closest(".card").find('[data-action="expand"] i').toggleClass("icon-size-actual icon-size-fullscreen"),
				$(this).closest(".card").toggleClass("card-fullscreen");
		});



		$('[data-action="close"]').on("click", function() {
			$(this).closest(".card").removeClass().slideUp("fast");
		});

		$('[data-action="reload"]').on("click", function() {
			var e = $(this);
			e.parents(".card").addClass("card-load"),
				e.parents(".card").append('<div class="card-loader"><i class=" ti-reload rotate-refresh"></div>'),
				setTimeout(function() {
					e.parents(".card").children(".card-loader").remove(),
						e.parents(".card").removeClass("card-load")
				}, 2000)
		});
	}
	
	var handleHeaderHight = function() {
		const headerHight = $('.header').innerHeight();
		$(window).scroll(function() {
			if ($('body').attr('data-layout') === "horizontal" && $('body').attr('data-header-position') === "static" && $('body').attr('data-sidebar-position') === "fixed")
				$(this.window).scrollTop() >= headerHight ? $('.deznav').addClass('fixed') : $('.deznav').removeClass('fixed')
		});
	}
	
	
	
	var handleMenuTabs = function() {
		if(screenWidth <= 991 ){
			jQuery('.menu-tabs .nav-link').on('click',function(){
				if(jQuery(this).hasClass('open'))
				{
					jQuery(this).removeClass('open');
					jQuery('.fixed-content-box').removeClass('active');
					jQuery('.hamburger').show();
				}else{
					jQuery('.menu-tabs .nav-link').removeClass('open');
					jQuery(this).addClass('open');
					jQuery('.fixed-content-box').addClass('active');
					jQuery('.hamburger').hide();
				}
				//jQuery('.fixed-content-box').toggleClass('active');
			});
			jQuery('.close-fixed-content').on('click',function(){
				jQuery('.fixed-content-box').removeClass('active');
				jQuery('.hamburger').removeClass('is-active');
				jQuery('#main-wrapper').removeClass('menu-toggle');
				jQuery('.hamburger').show();
			});
		}
	}
	
	var handleChatbox = function() {
		jQuery('.bell-link').on('click',function(){
			jQuery('.chatbox').addClass('active');
		});
		jQuery('.chatbox-close').on('click',function(){
			jQuery('.chatbox').removeClass('active');
		});
	}
	
	var handleBtnNumber = function() {
		$('.btn-number').on('click', function(e) {
			e.preventDefault();

			fieldName = $(this).attr('data-field');
			type = $(this).attr('data-type');
			var input = $("input[name='" + fieldName + "']");
			var currentVal = parseInt(input.val());
			if (!isNaN(currentVal)) {
				if (type == 'minus')
					input.val(currentVal - 1);
				else if (type == 'plus')
					input.val(currentVal + 1);
			} else {
				input.val(0);
			}
		});
	}
	
	var handledzChatUser = function() {
		jQuery('.dz-chat-user-box .dz-chat-user').on('click',function(){
			jQuery('.dz-chat-user-box').addClass('d-none');
			jQuery('.dz-chat-history-box').removeClass('d-none');
		}); 
		
		jQuery('.dz-chat-history-back').on('click',function(){
			jQuery('.dz-chat-user-box').removeClass('d-none');
			jQuery('.dz-chat-history-box').addClass('d-none');
		}); 
		
		jQuery('.dz-fullscreen').on('click',function(){
			jQuery('.dz-fullscreen').toggleClass('active');
		});
	}
	
	var handledzLoadMore = function() {
		$(".dz-load-more").on('click', function(e)
		{
			e.preventDefault();	//STOP default action
			$(this).append(' <i class="fa fa-refresh"></i>');
			
			var dzLoadMoreUrl = $(this).attr('rel');
			var dzLoadMoreId = $(this).attr('id');
			
			$.ajax({
				method: "POST",
				url: dzLoadMoreUrl,
				dataType: 'html',
				success: function(data) {
					$( "#"+dzLoadMoreId+"Content").append(data);
					$('.dz-load-more i').remove();
				}
			})
		});
	}
	
	
	var handleheartBlast = function (){
		$(".heart").on("click", function() {
			$(this).toggleClass("heart-blast");
		});
	}	
    
	var handleShowPass = function(){
		jQuery('.show-pass').on('click',function(){
			var inputType = jQuery(this).parent().find('.dz-password');
			if(inputType.attr('type') == 'password')
			{
				inputType.attr('type', 'text');
				jQuery(this).addClass('active');
			}
			else
			{
				inputType.attr('type', 'password');
				jQuery(this).removeClass('active');
			}
		});
	}
    
	var handleLightgallery = function(){
		if(jQuery('#lightgallery').length > 0){
			$('#lightgallery').lightGallery({
				loop:true,
				thumbnail:true,
				exThumbImage: 'data-exthumbimage'
			});
		}
		if(jQuery('#lightgallery2').length > 0){
			$('#lightgallery2').lightGallery({
				loop:true,
				thumbnail:true,
				exThumbImage: 'data-exthumbimage'
			});
		}
	}
	
	var handleSupport = function(){
		var support = '<script id="DZScript" src="https://dzassets.s3.amazonaws.com/w3-global.js?btn_dir=right"></script>';
		jQuery('body').append(support);
	}
    
	var domoPanel = function(){
		if(jQuery('.dz-demo-content').length > 0){
		}
		$('.dz-demo-trigger').on('click', function() {
				$('.dz-demo-panel').addClass('show');
		  });
		  $('.dz-demo-close, .bg-close').on('click', function() {
				$('.dz-demo-panel').removeClass('show');
		  });
		  
		  $('.dz-demo-bx').on('click', function() {
			  $('.dz-demo-bx').removeClass('demo-active');
			  $(this).addClass('demo-active');
		  });
	} 
	
	var handleThemeMode = function () {
		if (jQuery(".dz-theme-mode").length > 0) {

			// Toggle button click
			jQuery('.dz-theme-mode').on('click', function () {
				jQuery(this).toggleClass('active');

				var mode = jQuery(this).hasClass('active') ? 'dark' : 'light';

				jQuery('body')
					.attr('data-bs-theme', mode)
					.attr('data-theme-version', mode);

				setCookie('version', mode);
				jQuery('#theme_version').val(mode).selectpicker('refresh');

				$('.default-select').selectpicker('refresh');
			});

			// Initial load: set body attributes based on cookie or select
			var version = getCookie('version') || jQuery('#theme_version').val() || 'light';

			jQuery('body')
				.attr('data-bs-theme', version)
				.attr('data-theme-version', version);

			jQuery('.dz-theme-mode').removeClass('active');

			setTimeout(function () {
				if (version === "dark") {
					jQuery('.dz-theme-mode').addClass('active');
				}
			}, 1500);

			// When the select changes
			jQuery('#theme_version').on('change', function () {
				var selectedVersion = jQuery(this).val();

				jQuery('body')
					.attr('data-bs-theme', selectedVersion)
					.attr('data-theme-version', selectedVersion);

				setCookie('version', selectedVersion);

				if (selectedVersion === 'dark') {
					jQuery('.dz-theme-mode').addClass('active');
				} else {
					jQuery('.dz-theme-mode').removeClass('active');
				}

				$('.default-select').selectpicker('refresh');
			});

			// On page load: apply active state if select is 'dark'
			if (jQuery('#theme_version').val() === 'dark') {
				jQuery('.dz-theme-mode').addClass('active');
			}
		}
	};

	
	var handleDatetimepicker = function(){
		//    if(jQuery(".datepicker").length>0) {
		//        $('.datepicker').datetimepicker();
		//    }
			if(jQuery('.bt-datepicker').length > 0){
				$(".bt-datepicker").datepicker({ 
					autoclose: true, 
					todayHighlight: true
				}).datepicker('update', new Date());
			}
	}

	var handleMinHeight = function() {
		setTimeout(() => {
			if(
				$('body').attr('data-header-position') === "fixed" 
				&& 
				$('body').attr('data-layout') === "horizontal"
				&&
				$('body').attr('data-sidebar-position') === "fixed"
			){
				$('.content-body').css("padding-top" ,  ($('.deznav').height() + $('.header').height()) + 'px');
			}else if(
				$('body').attr('data-header-position') === "fixed" 
				&& 
				$('body').attr('data-layout') === "horizontal"
				&&
				$('body').attr('data-sidebar-position') === "static"
			){
				$('.content-body').css("padding-top" , $('.header').height() + "px" );
			}else if(
				$('body').attr('data-header-position') === "static" 
				&& 
				$('body').attr('data-layout') === "horizontal"
				&&
				$('body').attr('data-sidebar-position') === "fixed"
			){
				$('.content-body').css("padding-top" , "0px" );
			}else {
				$('.content-body').css("padding-top" , "" );
			}
		},400);
		
	}
	
	var setCurrentYear = function () {
		const currentDate = new Date();
		let currentYear = currentDate.getFullYear();
		let elements = document.getElementsByClassName('current-year');

		for (const element of elements) {
			element.innerHTML = currentYear;
		}
	}

	var handleImageUpload = function (){
		if ($('.upload-trigger').length > 0) {
			$('.upload-trigger').on('click', function () {
				$(this).siblings('.imageUpload').click();
			});
			$('.imageUpload').on('change', function () {
				var input = this;
				if (input.files && input.files[0]) {
					var reader = new FileReader();
					reader.onload = function (e) {
						$(input).siblings('.imagePreview').attr('src', e.target.result).hide().fadeIn(650);
					};
					reader.readAsDataURL(input.files[0]);
				}
			});
		}
	}
	
	/* Function ============ */
	return {
		init:function(){
			handleMetisMenu();	
			handleAllChecked();	
			handleNavigation();
			handleCurrentActive();
			handleCustomFileInput();
			handleDraggableCard();
			handleMiniSidebar();
			handleDataAction();
			handleHeaderHight();
			handleMenuTabs();
			handleChatbox();
			handleBtnNumber();
			handledzChatUser();
			handledzLoadMore();
			handleheartBlast();
			handleShowPass();
			handleLightgallery();
			handleCkEditor();
            domoPanel();
			handleSelectPicker();
			handleThemeMode();
			handleDatetimepicker();
			handleMinHeight();
			setCurrentYear();
			handleImageUpload();
		},

		
		load:function(){
			setTimeout(() => {
			    handleTheme();
			},1000);
			handleSelectPicker();
			handleSupport();
		},
		
		resize:function(){
			
			
		}
	}
	
}();

/* Document.ready Start */	
jQuery(document).ready(function() {
    'use strict';
	Mophy.init();
	
});
/* Document.ready END */

/* Window Load START */
jQuery(window).on('load',function () {
	'use strict'; 
	Mophy.load();
	
});
/*  Window Load END */

/* Window Resize START */
jQuery(window).on('resize',function () {
	'use strict'; 
	Mophy.resize();
});
/*  Window Resize END */