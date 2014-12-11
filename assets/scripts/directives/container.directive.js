

(function (undefined) {
	'use strict';

	angular
		.module('NoerdDk')
		.directive('container', container);

	/* @ngInject */
	function container($timeout) {
		var directive = {
			replace: false,
			link: link,
			restrict: 'A',
			scope: true,
			controller: directiveController
		};

		/* @ngInject */
		function directiveController($scope) {

				$scope.container = {
					options: {

					},
					states: {
						active: false
					},
					temp: {

					},
					css: {}
				};

			}
		return directive;

		function link(scope, element, attrs) {
			//console.log('scope', scope);

			scope.$on('noerd:updateActiveContainer', function(event, data) {
				//console.log(data);
				//console.log('element', element[0].offsetTop);
				var offsets = element[0].getBoundingClientRect();
				//console.log('offsets', offsets);
				//console.log('data', data);
				if (offsets.top < data.pos && offsets.bottom > data.pos) {
					scope.container.states.active = true;
					//console.log('ACTIVATE!!!!!!!!!!!!!!!!!!');
					//console.log(element[0]);
				}
				else {
					scope.container.states.active = false;
				}

			});

		}
	}
})();


