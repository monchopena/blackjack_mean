'use strict';

/**
 * @ngdoc service
 * @name blackjackApp.BlackJackService
 * @description
 * # BlackJackService
 * Factory in the blackjackApp.
 */
angular.module('blackjackApp')
  .factory('BlackJackService', function ($http) {
    // Service logic
    // ...

    var options = {};

    //options.domain='localhost';
    options.domain='46.101.15.22';
    options.base_http='http';
    options.port='3001';

    options.base_url=options.base_http+'://'+options.domain+':'+options.port+'/blackjack';

    // Public API here
    return {
      login: function (username) {
        var params = { username: username };
        return $http.post(options.base_url + '/login', params);
      },
      dashboard: function (id) {
        var params = { id: id };
        return $http.post(options.base_url + '/dashboard', params);
      },
      match: function (id_match) {
        var params = { id_match: id_match };
        return $http.post(options.base_url + '/match', params);
      },
      newMatch: function (id_user, best) {
        var params = { id_user: id_user, best: best };
        return $http.post(options.base_url + '/newmatch', params);
      },
      hand: function (id_hand) {
        var params = { id_hand: id_hand };
        return $http.post(options.base_url + '/hand', params);
      },
      newHand: function (id_match) {
        var params = { id_match: id_match };
        return $http.post(options.base_url + '/newhand', params);
      },
      updateHand: function (id_hand, card, type) {
        var params = { id_hand: id_hand, card: card,  type: type};
        return $http.post(options.base_url + '/updatehand', params);
      },
      finishHand: function (id_hand, id_match, type, id_user) {
        var params = { id_hand: id_hand, id_match: id_match,  type: type, id_user: id_user };
        return $http.post(options.base_url + '/finishhand', params);
      },
      finishMatch: function (id_match, type) {
        var params = { id_match: id_match,  type: type };
        return $http.post(options.base_url + '/finishmatch', params);
      },
      getPoints: function (cards) {
        var total=0;
        if (cards.length === 0) {
          return 0;
        } else {
          //No aces
          for(var i = 0; i < cards.length; i++) {
              //console.log(cards[i].number);
              var valueCard =  parseInt(cards[i].number);
              if (valueCard !== 14) { //ace = 14
                if (valueCard > 10 && valueCard < 14) {
                  total += 10;
                } else {
                  total += valueCard;
                }
              }
          }
          //Aces
          for(var w = 0; w < cards.length; w++) {
              //console.log(cards[i].number);
              var newValueCard =  parseInt(cards[w].number);
              if (newValueCard === 14) { //aces = 14
                var test = total + 11;
                //console.log('here: '+test);
                if (test > 21) {
                  total += 1;
                } else {
                  total += 11;
                }
              }
          }

          return total;
        }
      }
    };
  });
