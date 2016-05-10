'use strict';

describe('Controller: LoginCtrl', function () {

  // load the controller's module
  beforeEach(module('nimbusEmrApp'));

  var LoginCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LoginCtrl = $controller('LoginCtrl', {
      $scope: scope
    });
  }));

  it('should instantiate the controller properly', function () {
    expect(LoginCtrl).not.toBeUndefined();
  });

});
