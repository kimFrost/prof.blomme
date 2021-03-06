﻿(function (undefined) {
	'use strict';

	// shim layer with setTimeout fallback
	window.requestAnimFrame = (function(){
		return  window.requestAnimationFrame       ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			function( callback ){
				window.setTimeout(callback, 1000 / 60);
			};
	})();

	/**
	 * @ngdoc overview
	 * @name MainController
	 * @description
	 * #
	 *
	 * Main module of the application.
	 */

	angular
		.module('BrugSkallen')
		.controller('MainCtrl', MainCtrl);

	/* @ngInject */
	function MainCtrl($scope, $window, $interval) {

		var main = this;
		main.options = {
			debug: true,
			useWebStorage: false,
			cookieStorageName: 'CookieAccepted'
		};
    main.activePanelIndex = 0;
		main.overlays = {
			juicy: {
				states: {
					show: false
				}
			}
		};
		main.states = {
			showCookiePopup: true,
			expandHeader: false,
      lockPageScroll: false
		};

		// Public functions
		main.setStorage = setStorage;
		main.toggleHeader = toggleHeader;
		main.activePanel = activePanel;
		main.toggleOverlay = toggleOverlay;
		main.registerOverlay = registerOverlay;
		main.closeAllOverlays = closeAllOverlays;


/**---------------------------------------
		FUNCTION LIBRARY
---------------------------------------**/

		// Overlay
		function toggleOverlay(id, state) {
			state = (state === undefined) ? 'toggle' : state;
			if (main.overlays[id] === undefined) {
				return undefined;
			}
			if (state === 'toggle') {
				state = !main.overlays[id].states.show;
			}
      log('state', state);
			main.overlays[id].states.show = state;
      main.states.lockPageScroll = state;
			if (state) {
        for (var key in main.overlays) {
          if (key !== id) {
            main.overlays[key].states.show = !state;
          }
        }
			}
		}

    function closeAllOverlays(event) {
      for (var key in main.overlays) {
        main.overlays[key].states.show = false;
        main.states.lockPageScroll = false;
      }
    }

		function registerOverlay(id) {
      log('registerOverlay', id);
      if (id !== undefined) {
        main.overlays[id] = {
          states: {
            show: false
          }
        };
      }
		}

		// Header Toggle
		function toggleHeader(state) {
			state = (state === undefined) ? 'toggle' : state;
			if (state === 'toggle') {
				state = !main.states.expandHeader;
			}
			main.states.expandHeader = state;
		}

    function activePanel(index) {
      if (index !== undefined) {
        var container = document.querySelector('#scrollCapture');
        var scrollTop = container.scrollTop;

        return true;
      }
    }

		// Cookie
		function checkCookie() {
			var CookieAccepted = false;
			if(main.options.useWebStorage &&  typeof(Storage) !== 'undefined') {
				CookieAccepted = sessionStorage.getItem(main.options.cookieStorageName);
				if (CookieAccepted !== undefined && CookieAccepted !== null) {
					CookieAccepted = (CookieAccepted === 'true');
					main.states.showCookiePopup = !CookieAccepted;
				}
				else {
					setStorage(false);
				}
			}
			else {
				CookieAccepted = getCookie(main.options.cookieStorageName);
				if (CookieAccepted !== undefined && CookieAccepted !== null) {
					CookieAccepted = (CookieAccepted === 'true');
					main.states.showCookiePopup = !CookieAccepted;
				}
				else {
					setStorage(false);
				}
			}
		}
		function setStorage(state) {
			state = (state === undefined) ? true : state;
			if(main.options.useWebStorage && typeof(Storage) !== 'undefined') {
				sessionStorage.setItem(main.options.cookieStorageName, state);
			}
			else {
				setCookie(main.options.cookieStorageName, state, 365);
			}
		}
		function setCookie(cname, cvalue, exdays) {
			var d = new Date();
			d.setTime(d.getTime() + (exdays*24*60*60*1000));
			var expires = 'expires='+d.toUTCString();
			document.cookie = cname + '=' + cvalue + '; ' + expires + '; path=/';
		}
		function getCookie(cname) {
			var name = cname + '=';
			var ca = document.cookie.split(';');
			for(var i=0; i<ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) === ' ') {
					c = c.substring(1);
				}
				if (c.indexOf(name) !== -1) {
					return c.substring(name.length,c.length);
				}
			}
			return '';
		}

		// Debug log
		function log(msg1, msg2) {
			msg1 = (msg1 === undefined) ? null : msg1;
			msg2 = (msg2 === undefined) ? null : msg2;
			if (main.options.debug) {
				if (msg2 !== null) {
					try {
						console.log(msg1, msg2);
					}
					catch(err) {

					}
				}
				else {
					try {
						console.log(msg1);
					}
					catch(err) {

					}
				}
			}
		}
/**---------------------------------------
	BINDINGS
---------------------------------------**/

    $scope.$on('MainCtrl:toggleOverlay', function(event, data) {
      toggleOverlay(data.id, data.state);
    });

    //Get Active Panel Index from window.snap
    $interval(function(){
      main.activePanelIndex = window.snap.activeIndex;
    }, 300);

    //angular.element(window).bind("scroll", function(){});

		checkCookie();
	}
})();
