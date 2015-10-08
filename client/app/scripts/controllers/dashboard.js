'use strict';

/**
 * @ngdoc function
 * @name blackjackApp.controller:DashboardctrlCtrl
 * @description
 * # DashboardctrlCtrl
 * Controller of the blackjackApp
 */
angular.module('blackjackApp')
  .controller('DashboardCtrl', function ($scope, $routeParams, $cookies, $location, BlackJackService) {

  	var id_user = $routeParams.user;

  	$scope.showMatches=false;

    BlackJackService.dashboard(id_user).success(function(data) {
      if (!data.error_code) {
        //console.log(JSON.stringify(data.result));
        if (data.result.matches.length>0) {
        	$scope.showMatches=true;
        }
        $scope.dashboard = data.result;
       }
    }).error(function(status, data) {
        console.log(status);
        console.log(data);
    });

    $scope.best=10;

    $scope.newMatch = function (best) {
    	BlackJackService.newMatch($scope.dashboard._id, best).success(function(data) {
	      if (!data.error_code) {
	        //console.log(data.result);
	        $location.path('deck/'+data.result.id_user+'/'+data.result.id_match+'/'+data.result.id_hand);
	       }
	    }).error(function(status, data) {
	        console.log(status);
	        console.log(data);
	    });
    };

    $scope.goMatch = function (id_match, id_hand) {
    	$location.path('/deck/'+id_user+'/'+id_match+'/'+id_hand);
    };

    $scope.logout = function () {
    	$cookies.remove('myUser');
    	$location.path('/');
    };

  });
