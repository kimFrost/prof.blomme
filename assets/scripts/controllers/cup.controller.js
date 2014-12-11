(function (undefined) {
	'use strict';

	angular
		.module('BrugSkallen')
		.controller('CupCtrl', CupCtrl);

	/* @ngInject */
	function CupCtrl($scope) {
    var cup = this;
    cup.options = {
      debug: true
    };
    cup.states = {

    };

    // Public functions

/**---------------------------------------
		FUNCTION LIBRARY
---------------------------------------**/

    // Debug log
    function log(msg1, msg2) {
      msg1 = (msg1 === undefined) ? null : msg1;
      msg2 = (msg2 === undefined) ? null : msg2;
      if (cup.options.debug) {
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
    $scope.$on('cupgame:setCupsPos', function(event, data) {
      log('asdasdsaad2',data);
    });
	}
})();
