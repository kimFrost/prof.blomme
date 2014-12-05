(function (undefined) {
    'use strict';

    /**
     * @ngdoc overview
     * @name prof-blomme - MainController
     * @description
     * # prof-blomme
     *
     * Main module of the application.
     */

    angular
      .module('prof-blomme')
      .controller('MainCtrl', MainCtrl);

    /* @ngInject */
    function MainCtrl() {
        console.log('MainCtrl');
    }
})();