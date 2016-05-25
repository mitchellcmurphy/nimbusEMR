'use strict';

/**
 * @ngdoc function
 * @name nimbusEmrApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the nimbusEmrApp
 */
angular.module('nimbusEmrApp')
  .controller('MainCtrl', function ($rootScope, $scope, Auth, Ref) {
      $scope.logout = function() { Auth.$unauth(); };
  });
