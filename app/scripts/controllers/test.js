'use strict';

/**
 * @ngdoc function
 * @name nimbusEmrApp.controller:TestCtrl
 * @description
 * # TestCtrl
 * Controller of the nimbusEmrApp
 */
angular.module('nimbusEmrApp')
    .controller('TestCtrl', ['$rootScope', '$scope', '$interval', 'Auth', 'Ref',
        function ($rootScope, $scope, $interval, Auth, Ref) {
        //set this later by authing the user
        var userid = "user1";
        var hrRef = Ref.child(userid + '/vitals/hr');
        var updaterStarted = false;
        var stop;

        //Initialize the vitals
        $scope.hr = {};

        //Grab the hr when it changes
        hrRef.on("value", function(snapshot) {
            console.log("HR obtained", snapshot.val());
            $scope.hr.value = snapshot.val().value;
            $scope.hr.unitOfMeasure = snapshot.val().unitOfMeasure;
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });

        $scope.logout = function() { Auth.$unauth(); };

        $scope.startDemo = function(){
            if(updaterStarted === false){
                updaterStarted = true;
                stop = $interval(function() {
                    hrRef.set(
                        {
                            value: Math.floor((Math.random() * 160) + 40),
                            unitOfMeasure: 'bpm'
                        }
                    );
                }, 1000);
            }
        };

        $scope.stopDemo = function(){
            if(updaterStarted === true){
                updaterStarted = false;
                $interval.cancel(stop);
                stop = undefined;
            }
        }
    }]);
