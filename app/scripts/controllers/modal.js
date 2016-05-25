'use strict';

/**
 * @ngdoc function
 * @name nimbusEmrApp.controller:ModalController
 * @description
 * # ModalController
 *
 */
angular.module('nimbusEmrApp')
  .controller('ModalController', function ($scope, $uibModalInstance, modalData) {
  //Assign modalData to scope for access in the view
  $scope.modalData = modalData;

  $scope.ok = function () {
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.closeModal = function () {
    $uibModalInstance.dismiss();
  };
});
