(function (undefined) {
	'use strict';

	angular
		.module('BrugSkallen')
		.directive('cup', cup);

	/* @ngInject */
	function cup($timeout) {
		var directive = {
			replace: false,
			link: link,
			restrict: 'A',
      //transclude: false,
      require: '^cupgame',
      templateUrl: 'templates/cup.html',
			scope: {
        cup: '@'
      },
			controller: directiveController
		};

		/* @ngInject */
		function directiveController($scope) {

      $scope.options = {
        debug: true
      };
      $scope.states = {
          open: false
      };
      $scope.css = {};

      // Debug log
      function log(msg1, msg2) {
        msg1 = (msg1 === undefined) ? null : msg1;
        msg2 = (msg2 === undefined) ? null : msg2;
        if ($scope.cup.options.debug) {
          if (msg2 !== null) {
            try { console.log(msg1, msg2); }
            catch(err) { }
          }
          else {
            try { console.log(msg1); }
            catch(err) {}
          }
        }
      }

      /*
      $scope.getPosClass = function(test) {
        console.log('getPosClass');
        return 'cupgame__slot--pos' + test;
      };
      */


    }
		return directive;

		function link(scope, element, attrs, ctrl) {

      console.log(ctrl.requestPos(scope.cup));

		}
	}
})();


