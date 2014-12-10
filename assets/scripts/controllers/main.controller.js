(function (undefined) {
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
	function MainCtrl($scope) {

    var main = this;
    main.options = {
      debug: true,
      useWebStorage: false,
      cookieStorageName: 'CookieAccepted'
    };
    main.states = {
      showCookiePopup: true,
      expandHeader: false
    };

    // Public functions
    main.setStorage = setStorage;
    main.toogleHeader = toogleHeader;

/**---------------------------------------
		FUNCTION LIBRARY
---------------------------------------**/

    // Header
    function toogleHeader(state) {
      state = (state === undefined) ? 'toogle' : state;
      if (state === 'toogle') {
        state = !main.states.expandHeader;
      }
      main.states.expandHeader = state;
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


		checkCookie();
	}
})();
