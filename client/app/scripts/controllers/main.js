'use strict';

/**
 * @ngdoc function
 * @name blackjackApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the blackjackApp
 */
angular.module('blackjackApp')
  .controller('MainCtrl', function ($scope, $cookies, $location, BlackJackService) {
    
    //A very simple simple login method NO PRODUCTION!!!
    
    var myUser = $cookies.get('myUser');

    if (typeof myUser !== 'undefined' && myUser !== '') {
      $location.path('/dashboard/' + myUser);
    }

    //

    $scope.login = function (username) {
      if (username) {
    	  BlackJackService.login(username).success(function(data) {
          if (!data.error_code) {
            console.log(data.result);
            $cookies.put('myUser', data.result);
            $location.path('/dashboard/' + data.result);
          }
        }).error(function(status, data) {
           console.log(status);
           console.log(data);
        });
      }
    };

    

  });
