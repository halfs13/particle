angular.module('particle')
.config(function($stateProvider) {
    $stateProvider
    .state('landing', {
        url: '/',
        templateUrl: 'app/views/landing/landing.html',
        controller: 'landingCtrl'
    });
});