'use strict';

/**
 * @ngdoc function
 * @name nimbusEmrApp.controller:TestCtrl
 * @description
 * # TestCtrl
 * Controller of the nimbusEmrApp
 */
angular.module('nimbusEmrApp')
    .controller('SessionController', ['$rootScope', '$scope', '$interval', 'Auth', 'Ref', 'VitalsSim', '$firebaseArray',
        function ($rootScope, $scope, $interval, Auth, Ref, VitalsSim, $firebaseArray) {

            var mapValues = function(id){
                switch (id){
                    case 'hr':
                        return 'Heart Rate';
                    case 'etc02':
                        return 'ETC02';
                    case 'resp':
                        return 'Respiratory';
                    case 'sp02':
                        return 'SP02';
                    default:
                        return 'N/A';
                }
            };

            //Grab the vitals when they change
            var userid = "user1";
            $scope.vitals = [];
            var vitalsRef = Ref.child(userid + '/vitals');
            $firebaseArray(vitalsRef).$loaded().then(function(vitals){
                angular.forEach(vitals, function(value, key) {
                    var vital = {
                        name: mapValues(vitals.$keyAt(key)),
                        values: value
                    };
                    $scope.vitals.push(vital);
                });
            });

            $scope.startSim = function() {
                //Start the simulator
                VitalsSim.startDemo(Ref);
            };

            $scope.stopSim = function(){
                //Stop the simulator
                VitalsSim.stopDemo();
            };

            $scope.clearData = function(){
                vitalsRef.remove();
            };

            vitalsRef.onDisconnect($scope.stopSim);
        }
    ]);
