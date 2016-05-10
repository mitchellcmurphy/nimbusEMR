'use strict';

/**
 * @ngdoc function
 * @name nimbusEmrApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the nimbusEmrApp
 */
angular.module('nimbusEmrApp')
  .controller('MainCtrl', function ($scope, Auth, Ref, $firebaseArray) {

    $scope.logout = function() { Auth.$unauth(); };

      $scope.startDemo = function(){
          var thing = Ref.child('thing');
          thing.on("value", function(snapshot) {
              console.log(snapshot.val());
          }, function (errorObject) {
              console.log("The read failed: " + errorObject.code);
          });
      }
  });
