'use strict';

/**
 * @ngdoc function
 * @name blackjackApp.controller:DeckctrlCtrl
 * @description
 * # DeckctrlCtrl
 * Controller of the blackjackApp
 */
angular.module('blackjackApp')
  .controller('DeckCtrl', function ($scope, $routeParams, $location, $interval, BlackJackService) {
    
    	var id_user = $routeParams.user;
  		var id_match = $routeParams.match;
  		var id_hand = $routeParams.hand;

  		//init vars
  		$scope.cardShow = false;
  		$scope.showNextCard = false;
  		$scope.human = [];
  		$scope.computer = [];

  		$scope.showButtons = true;

  		$scope.youLose = false;
  		$scope.youWin = false;

  		$scope.nextHand = false;
  		$scope.textFinishid = false;

  		//them match
  		BlackJackService.match(id_match).success(function(data) {
	      if (!data.error_code) {
	        //console.log(JSON.stringify(data.result));
	        $scope.match=data.result;

	        //the hand
	        BlackJackService.hand(id_hand).success(function(data) {
		      if (!data.error_code) {
		        //console.log(JSON.stringify(data.result));
		        $scope.hand = data.result;
		        $scope.deck = data.result.deck;
		        $scope.human = data.result.hand_human;
		  		$scope.computer = data.result.hand_computer;
		  		$scope.cards = data.result.deck;
		  		$scope.turn = data.result.turn;

		  		$scope.computer_points = BlackJackService.getPoints($scope.computer);
		  		$scope.human_points = BlackJackService.getPoints($scope.human);

		  		if ($scope.hand.finished === 1) {
		  			$scope.showButtons = false;
		        	$scope.nextHand=true;
		        	$scope.cardShow = true;
		  		} else {
		  			if ($scope.computer_points === 21) {
		  				$scope.computerWin();
		  			}
		  		}

		  		//console.log('### Score ###');
		  		//console.log('computer_points: '+$scope.computer_points);
		  		//console.log('human_points: '+$scope.human_points);
		  		
		        if ($scope.match.finished === 1) {
		        	$scope.finishedMatch();
		        }
		  		
		       }
		    }).error(function(status, data) {
		        console.log(status);
		        console.log(data);
		    });
	       }
	    }).error(function(status, data) {
	        console.log(status);
	        console.log(data);
	        $location.path('/dashboard/'+id_user);
	    });


	    $scope.hit = function () {
	    	
	    	var card = $scope.deck[$scope.turn];

	    	BlackJackService.updateHand(id_hand, card, 'human').success(function(data) {
		      if (!data.error_code) {
		        //console.log(JSON.stringify(data.result));
		        $scope.human.push(card);
				
		        $scope.human_points = BlackJackService.getPoints($scope.human);
		        $scope.turn += 1;

		        //console.log('###Score# hit##');
	  			//console.log('computer_points: '+$scope.computer_points);
	  			//console.log('human_points: '+$scope.human_points);

		        if ($scope.human_points === 21) {
	  				$scope.cardShow = true;
	  				$scope.showButtons = false;
	  				$scope.dealerTurn();
	  			} else if ($scope.human_points > 21) {
	  				$scope.computerWin();
	  			}
		       }
		    }).error(function(status, data) {
		        console.log(status);
		        console.log(data);
		        $location.path('/dashboard/'+id_user);
		    });
			
	    };

	    $scope.dealerTurn = function () {
	    	
	    	var card = $scope.deck[$scope.turn];

    		BlackJackService.updateHand(id_hand, card, 'computer').success(function(data) {
		    
		      if (!data.error_code) {
		        console.log(JSON.stringify(data.result));
		        $scope.computer.push(card);
				
		        $scope.computer_points = BlackJackService.getPoints($scope.computer);
				$scope.turn += 1;

				//console.log('@@@Score dealer@@@');
	  			//console.log('computer_points: '+$scope.computer_points);
	  			//console.log('human_points: '+$scope.human_points);

	  			if ($scope.computer_points >= $scope.human_points && $scope.computer_points <= 21) {
	  				$scope.computerWin();
	  			} else if  ($scope.computer_points < 17) {
	  				$scope.dealerTurn();
	  			} else if ($scope.computer_points >= 17 && $scope.computer_points <= 21) {
	  				if ($scope.computer_points >= $scope.human_points) {
	  					$scope.computerWin();
	  				} else {
	  					$scope.humanWin();
	  				}
	  			} else {
	  				$scope.humanWin();
	  			}
		       }
		    }).error(function(status, data) {
		        console.log(status);
		        console.log(data);
		    });
	    };


	    $scope.stand = function () {
	    	
	    	//hidden buttons
	    	$scope.showButtons = false;
	    	$scope.cardShow = true;

	    	//$scope.dealerTurn();
	    	//console.log('###Score# stand##');
	  		//console.log('computer_points: '+$scope.computer_points);
	  		//console.log('human_points: '+$scope.human_points);

	    	if ($scope.computer_points >= $scope.human_points) {
	    		$scope.computerWin();
	    	} else {
	    		$scope.dealerTurn();
	    	}

	    };


	    $scope.computerWin = function () {
	    	$scope.youLose = true;
	    	$scope.match.score_computer += 1;
	    	BlackJackService.finishHand(id_hand, id_match, 'computer', id_user).success(function(data) {
		      if (!data.error_code) {
		        //console.log(JSON.stringify(data.result));
		        $scope.cardShow = true;
	  			$scope.showButtons = false;
	  			$scope.youLose = true;
	  			$scope.nextHand=true;
	  			if (data.result === 1) {
		        	$scope.finishedMatch();
		        }
		       }
		    }).error(function(status, data) {
		        console.log(status);
		        console.log(data);
		    });
	    };

	    $scope.humanWin = function () {
	  		$scope.computer_points += 1;
	  		$scope.match.score_human += 1;
	    	BlackJackService.finishHand(id_hand, id_match, 'human', id_user).success(function(data) {
		      if (!data.error_code) {
		        //console.log(JSON.stringify(data.result));
	  			$scope.showButtons = false;
	  			$scope.youWin = true;
	  			$scope.nextHand=true;
	  			if (data.result === 1) {
		        	$scope.finishedMatch();
		        }
		       }
		    }).error(function(status, data) {
		        console.log(status);
		        console.log(data);
		    });
	    };

	    $scope.finishedMatch = function () {
	    	$scope.showButtons = false;
	    	$scope.nextHand=false;
	    	$scope.textFinishid = true;
	    };

	    $scope.change = function () {
	    	if ($scope.cheatMode === true) {
	    		$scope.cardShow = true;
  				$scope.showNextCard = true;
	    	} else {
	    		$scope.cardShow = false;
  				$scope.showNextCard = false;
	    	}
	    };

	    $scope.goHand = function () {
	    	BlackJackService.newHand(id_match).success(function(data) {
		      if (!data.error_code) {
		        $location.path('/deck/'+id_user+'/'+id_match+'/'+data.result);
		       }
		    }).error(function(status, data) {
		        console.log(status);
		        console.log(data);
		    });
	    };

	    $scope.goDashboard = function () {
	    	$location.path('/dashboard/'+id_user);
	    };

  });
