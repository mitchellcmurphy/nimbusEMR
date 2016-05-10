describe('Controller: ModalController', function () {

  // load the controller's module
  beforeEach(module('nimbusEmrApp'));

  var ModalController,
    scope;
  var modalData = {"packageId": "packageId"};

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    scope.modalData = modalData;
    modalInstance = {
      dismiss: jasmine.createSpy('uibModalInstance.dismiss')
    };
    ModalController = $controller('ModalController', {
      $scope: scope,
      $uibModalInstance: modalInstance,
      modalData: modalData
    });
  }));

  it('should instantiate the controller properly', function () {
    expect(ModalController).not.toBeUndefined();
  });

  it('should check that modal data is set', function () {
    expect(scope.modalData).toEqual(modalData);
  });

});
