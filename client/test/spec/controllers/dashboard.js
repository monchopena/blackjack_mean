'use strict';

describe('Controller: DashboardctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('blackjackApp'));

  var DashboardctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DashboardctrlCtrl = $controller('DashboardctrlCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DashboardctrlCtrl.awesomeThings.length).toBe(3);
  });
});
