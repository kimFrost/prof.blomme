(function (undefiend) {
	'use strict';

	angular
		.module('BrugSkallen')
		.directive('cup', cup);

	/* @ngInject */
	function cup($timeout) {
		var directive = {
			replace: true,
			link: link,
			restrict: 'A',
      templateUrl: 'templates/cup.html',
			scope: {},
			controller: directiveController
		};

		/* @ngInject */
		function directiveController($scope) {

      $scope.cup = {
        options: {

        },
        states: {

        },
        temp: {

        },
        css: {}
      };

    }
		return directive;

		function link(scope, element, attrs) {



		}
	}
})();


