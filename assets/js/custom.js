/* ============================================================== */
/* Template Name : Metronal - Personal Portfolio Page             */
/* Author        : Rietts Andreas Ruff                            */
/* Author URI    : https://themeforest.net/user/riettsruff        */
/* Version       : 1.3                                            */
/* ============================================================== */

(function($) {

	"use strict";

	// Init Metronal
	var metronal = {};

	// Init Main Content
	metronal.mainContent = {
		list: ["#home", "#about", "#resume", "#portfolio", "#contact"],
		on: "",
		off: ""
	};

	// Pre Load
	metronal.preLoad = function(duration) {
		$('#pre-load').fadeOut(parseInt(duration, 10));
	};

	// Replace Viewport Height
	// Solves the issue about the viewport height on mobile devices as when the page loads
	metronal.replaceVHeight = function() {
		$('html').css({
			'height': $(window).height()
		});
	};

	// Portfolio Filter
	metronal.portfolioFilter = {
		// Item container
		container: $('#portfolio .portfolio-item .item-wrapper'),
		// Init function
		init: function() {
			// Checking if all images are loaded
			metronal.portfolioFilter.container.imagesLoaded(function() {
				// Init isotope once all images are loaded
	            metronal.portfolioFilter.container.isotope({
	                itemSelector: '#portfolio .portfolio-item .item-wrapper .item',
	                layoutMode: 'masonry',
	                transitionDuration: '0.8s'
	            });
	            // Forcing a perfect masonry layout after initial load
	            metronal.portfolioFilter.container.isotope('layout');
	            // Filter items when the button is clicked
	            $('#portfolio .portfolio-filter ul li').on('click', 'a', function () {
	            	// Remove the current class from the previous element
	                $('#portfolio .portfolio-filter ul li .current').removeClass('current');
	                // Add the current class to the button clicked
	                $(this).addClass('current');
	                // Data filter
	                var selector = $(this).attr('data-filter');
	                metronal.portfolioFilter.container.isotope({
	                    filter: selector
	                });
	                setTimeout(function () {
	                    metronal.portfolioFilter.container.isotope('layout');
	                }, 6);
	                return false;
	            });
	        });
	    } 
	};

	// Use Magnific Popup
	metronal.useMagnificPopup = function() {
		// For portfolio item
		$('#portfolio .portfolio-item .item-wrapper .item').magnificPopup({
			delegate: 'a',
			type: 'inline',
			removalDelay: 300,
			mainClass: 'mfp-fade',
			fixedContentPos: true,
		    callbacks: {
		    	beforeOpen: function() { 
		    		$('html').addClass('mfp-helper'); 
		    	},
		    	close: function() { 
		    		$('html').removeClass('mfp-helper'); 
		    	}
		  	}
		});
	};

	// Use TypeIt.js
	metronal.useTypeIt = function() {
		if(typeof TypeIt != 'undefined') {
			new TypeIt('.passion', {
				speed: 200,
		        startDelay: 800,
		        strings: ['Developer', 'Gamer', 'Anime Fan'],
		        breakLines: false,
		        loop: true
			}).go();
			
		} else {
			return false;
		}
	};

	// Progress Animation
	metronal.progressAnimation = function() {
		// Disable progress animation on IE Browser
		if(navigator.userAgent.indexOf('MSIE')!==-1 || navigator.appVersion.indexOf('Trident/') > -1) {
			$('.progress-wrapper .progress').css({
				'animation': 'none'
			});
		}
	};

	// Dynamic Page
	metronal.dynamicPage = function(event, target) {
		if(!event) {
			if(!target) {
				$('#home').addClass('active');
				metronal.mainContent.on = metronal.mainContent.off = "#home";
			} else {
				if(metronal.mainContent.list.includes(target)) {
					$(target).addClass('active');
					metronal.mainContent.on = metronal.mainContent.off = target;
				} else {
					$('#home').addClass('active');
					metronal.mainContent.on = metronal.mainContent.off = "#home";
				}
			}
		} else {
			var currentTarget = event.currentTarget;
			var prevMainContentOff = metronal.mainContent.off, 
				targetOff = metronal.mainContent.on,
				targetOn;
			if(currentTarget.className === "menu-link" || currentTarget.className === "close-menu-link") {
				if(metronal.mainContent.list.includes(target)) {
					targetOn = target;
				} else {
					return;
				}
			} else {
				return;
			}

			if(targetOn !== targetOff) {
				$(prevMainContentOff).removeClass("scaleDownCenter");
				$(targetOff).removeClass("scaleDownCenter");
				$(targetOff).removeClass("scaleUpCenter active");
				$(targetOff).addClass("scaleDownCenter");
				$(targetOn).addClass("scaleUpCenter active");

				metronal.mainContent.off = targetOff;
				metronal.mainContent.on = targetOn;
			}
		}
	};

	// Window On Resize
	$(window).on('resize', function() {
		metronal.replaceVHeight(),
		metronal.portfolioFilter.container.isotope('layout');
	});

	// Device Orientation Changes
	window.addEventListener("orientationchange", function () {
		metronal.replaceVHeight(),
        metronal.portfolioFilter.container.isotope('layout');
    }, false);

    // Menu Link On Click
	$(".menu-link").on("click", function(e) {
		metronal.dynamicPage(e, $(this)[0].hash);
	});

	// Close Menu Link On Click
	$(".close-menu-link").on("click", function(e) {
		metronal.dynamicPage(e, $(this)[0].hash);
	});

	// Prevent Default 'a[href=""]' click
	$('a[href="#"]').on('click', function (e) {
        e.preventDefault();
    });

	// Window On Load
	$(window).on('load', function() {
		metronal.preLoad(800);
	});

	// Document Ready
	$(document).ready(function() {
		metronal.dynamicPage(undefined, window.location.hash),
		metronal.replaceVHeight(),
		metronal.portfolioFilter.init(),
		metronal.useMagnificPopup(),
		metronal.progressAnimation(),
		metronal.useTypeIt();
	});

})(jQuery);