'use strict';

describe('Controller: AccountCtrl', function () {

  // load the controller's module
  beforeEach(module('nimbusEmrApp'));

  var AccountCtrl,
    scope,
    user;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    scope.messages = [];
    user = {};
    AccountCtrl = $controller('AccountCtrl', {
      $scope: scope,
      user: user
    });
  }));

  it('should instantiate the controller properly', function () {
    expect(AccountCtrl).not.toBeUndefined();
  });
});
