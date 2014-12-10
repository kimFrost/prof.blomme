(function (undefiend) {
	'use strict';

	angular
		.module('BrugSkallen')
		.directive('cupgame', cupgame);

	/* @ngInject */
	function cupgame($timeout) {
		var directive = {
			replace: true,
			link: link,
			restrict: 'A',
      templateUrl: 'templates/cupgame.html',
			scope: {},
			controller: directiveController
		};

		/* @ngInject */
		function directiveController($scope) {

      $scope.cupgame = {
        options: {

        },
        states: {

        },
        temp: {

        },
        css: {}
      };

      // FUNCTIONS
      $scope.cupgame.shuffle = function() {
        console.log('shuffle');


      };

    }
		return directive;

		function link(scope, element, attrs) {



		}
	}
})();


