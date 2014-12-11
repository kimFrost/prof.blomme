(function (undefined) {
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
			scope: {
        cupcount: '@cupcount'
      },
			controller: directiveController
		};

		/* @ngInject */
		function directiveController($scope) {

			$scope.cupgame = {
				options: {
					debug: true,
					rewardIndex: 1, //0-2
          shuffleTime: 3000
				},
				indexes: [],
				states: {
					initiated: false,
          shuffling: false
        },
				temp: {
          lastColor1: '',
          lastColor2: ''
				},
				css: {}
			};

			// FUNCTIONS
			$scope.cupgame.shuffle = function() {
        if (!$scope.cupgame.states.shuffling) {
          $scope.cupgame.states.shuffling = true;

          // Pick two random and swithc position, and recal offset
          var randomIndex1 = Math.floor(Math.random()*$scope.cupgame.indexes.length);
          var randomIndex2 = Math.floor(Math.random()*$scope.cupgame.indexes.length);
          while (randomIndex1 === randomIndex2) {
            randomIndex2 = Math.floor(Math.random()*$scope.cupgame.indexes.length);
          }

          var tempPos1 =  $scope.cupgame.indexes[randomIndex1].posX;
          var tempPos2 =  $scope.cupgame.indexes[randomIndex2].posX;
          $scope.cupgame.indexes[randomIndex1].posX = tempPos2;
          $scope.cupgame.indexes[randomIndex2].posX = tempPos1;

          $scope.cupgame.indexes[randomIndex1].posY = 1;
          $scope.cupgame.indexes[randomIndex2].posY = -1;

          $scope.cupgame.updateOffsets();

          $scope.cupgame.indexes[randomIndex1].posY = 0;
          $scope.cupgame.indexes[randomIndex2].posY = 0;

          // Change translate position again, to move down again
          $timeout(function(){
            $scope.cupgame.updateOffsets(false);
          },$scope.cupgame.options.shuffleTime / 3);

          $timeout(function(){
            $scope.cupgame.states.shuffling = false;
            $scope.cupgame.shuffle();
          },$scope.cupgame.options.shuffleTime * 1.9);

        }
      };

      // updateOffset
      $scope.cupgame.updateOffsets = function(updateZIndex) {
        updateZIndex = (updateZIndex === undefined) ? true : updateZIndex;
        for(var i=0;i<$scope.cupgame.indexes.length;i++) {
          var index = $scope.cupgame.indexes[i];

          var leftOffset = 0;
          var topOffset = 0;
          var zIndex = 0;

          leftOffset = index.posX * 100;
          topOffset = index.posY * 30;
          zIndex = index.posY;

          if (!updateZIndex) {
            zIndex = index.css['z-index'];
          }

          index.css = {
            '-moz-transform': 'translate('+leftOffset+'%, '+topOffset+'%)',
            '-ms-transform': 'translate('+leftOffset+'%, '+topOffset+'%)',
            '-webkit-transform': 'translate('+leftOffset+'%, '+topOffset+'%)',
            'transform': 'translate('+leftOffset+'%, '+topOffset+'%)',
            'z-index': zIndex
          };
        }
      };

      // init
			$scope.cupgame.init = function() {
				if (!$scope.cupgame.states.initiated) {

					// Generate Indexes
					for (var i=0;i<$scope.cupcount;i++) {
            var reward = false;
            if (i === $scope.cupgame.options.rewardIndex) {
              reward = true;
            }
						$scope.cupgame.indexes.push({
							index: i,
              posX: i,
              posY: 0,
							reward: reward,
              css: {}
						});
					}

          $scope.cupgame.updateOffsets();
					$scope.cupgame.states.initiated = true;
				}
			};


			// Debug log
			function log(msg1, msg2) {
				msg1 = (msg1 === undefined) ? null : msg1;
				msg2 = (msg2 === undefined) ? null : msg2;
				if ($scope.cupgame.options.debug) {
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

      $scope.getCupList = function() {
        return $scope.cupgame.indexes;
      };

		}
		return directive;

		function link(scope, element, attrs) {
			// BINDINGS

			// INIT
			scope.cupgame.init();
		}
	}
})();


