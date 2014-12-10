(function (undefined) {
	'use strict';

	angular
		.module('BrugSkallen')
		.controller('CupgameCtrl', CupgameCtrl);

	/* @ngInject */
	function CupgameCtrl($scope) {

    var cupgame = this;
    cupgame.options = {
      debug: true
    };
    cupgame.states = {

    };

    // Public functions
    cupgame.shuffle = shuffle;

/**---------------------------------------
		FUNCTION LIBRARY
---------------------------------------**/

    function shuffle() {
      log('shuffle');
    }

    // Debug log
    function log(msg1, msg2) {
      msg1 = (msg1 === undefined) ? null : msg1;
      msg2 = (msg2 === undefined) ? null : msg2;
      if (cupgame.options.debug) {
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

	}
})();
