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

            //Grab the vitals when they change
            $scope.hr = [];
            $scope.sp02 = [];
            $scope.etc02 = [];
            $scope.resp = [];
            var userid = "user1";
            var hrRef = Ref.child(userid + '/vitals/hr');
            var sp02Ref = Ref.child(userid + '/vitals/sp02');
            var etc02Ref = Ref.child(userid + '/vitals/etc02');
            var respRef = Ref.child(userid + '/vitals/resp');
            $firebaseArray(hrRef).$loaded().then(function(hr){
                console.log("HR updated", hr);
                $scope.hr = hr;
            });
            $firebaseArray(sp02Ref).$loaded().then(function(sp02){
                console.log("SP02 updated", sp02);
                $scope.sp02 = sp02;
            });
            $firebaseArray(etc02Ref).$loaded().then(function(etc02){
                console.log("ETC02 updated", etc02);
                $scope.etc02 = etc02;
            });
            $firebaseArray(respRef).$loaded().then(function(resp){
                console.log("Resp updated", resp);
                $scope.resp = resp;
            });

            $scope.startSim = function() {
                //Start the simulator
                VitalsSim.startDemo(Ref);
            };

            $scope.stopSim = function(){
                //Stop the simulator
                VitalsSim.stopDemo();
            }

            $scope.clearData = function(){
                hrRef.remove();
                sp02Ref.remove();
                etc02Ref.remove();
                respRef.remove();
            }
        }
    ]);
