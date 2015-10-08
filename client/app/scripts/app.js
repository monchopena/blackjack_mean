'use strict';

/**
 * @ngdoc overview
 * @name blackjackApp
 * @description
 * # blackjackApp
 *
 * Main module of the application.
 */

angular
  .module('blackjackApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngCookies',
    'angularMoment'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/dashboard/:user', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboard'
      })
      .when('/deck/:user/:match/:hand', {
        templateUrl: 'views/deck.html',
        controller: 'DeckCtrl',
        controllerAs: 'deck'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
