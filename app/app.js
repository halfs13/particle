'use strict';

angular.module('particle', [
  'ui.router',

  'particle.directives'
])
.config(['$urlRouterProvider', function($urlRouterProvider) {
    $urlRouterProvider
    .otherwise('/');
}]);

angular.module('particle.directives', []);
