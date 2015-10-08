'use strict';

describe('Controller: DeckctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('blackjackApp'));

  var DeckctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DeckctrlCtrl = $controller('DeckctrlCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DeckctrlCtrl.awesomeThings.length).toBe(3);
  });
});
