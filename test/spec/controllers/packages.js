'use strict';

describe('Controller: PackagesController', function () {

  // load the controller's module
  beforeEach(module('nimbusEmrApp'));

  var PackagesController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();

    PackagesController = $controller('PackagesController', {
      $scope: scope
    });
  }));

  it('should instantiate the controller properly', function () {
    expect(PackagesController).not.toBeUndefined();
  });

});
