'use strict';

describe('Service: BlackJackService', function () {

  // load the service's module
  beforeEach(module('blackjackApp'));

  // instantiate service
  var BlackJackService;
  beforeEach(inject(function (_BlackJackService_) {
    BlackJackService = _BlackJackService_;
  }));

  it('should do something', function () {
    expect(!!BlackJackService).toBe(true);
  });

});
