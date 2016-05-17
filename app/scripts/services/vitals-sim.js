'use strict';

/**
 * @ngdoc function
 * @name nimbusEmrApp.factory:VitalsSim
 * @description
 * # Wall
 * VitalsSim Service for the nimbusEmrApp
 */


angular.module('nimbusEmrApp')
    .factory('VitalsSim', ['$rootScope', '$interval', '$firebaseArray', 'VITALS_CONFIG',
        function ($rootScope, $interval, $firebaseArray, VITALS_CONFIG) {
            var stop;
            //var vitalsData = [
            //    {name: 'hr', unit: 'bpm', max: 190, min: 85},
            //    {name: 'sp02', unit: '%', max: 100, min: 85},
            //    {name: 'etc02', unit: '%', max: 100, min: 85},
            //    {name: 'resp', unit: 'bpm', max: 20, min: 1}
            //];
            //var vitalsArray = [];
            var vitals = {
                startDemo: function (firebaseRef) {
                    var userid = "user1";
                    //Set the ref for each vital
                    angular.forEach(VITALS_CONFIG, function(vital){
                        var ref = firebaseRef.child(userid + '/vitals/' + vital.name);
                        vital.ref = $firebaseArray(ref);
                    });
                    //Start our interval
                    stop = $interval(function () {
                        //Add data into the firebase array for each vital
                        //Set with a min, max, and unit
                        angular.forEach(VITALS_CONFIG, function(vital){
                           vital.ref.$add (
                               {
                                   value: Math.floor((Math.random() * vital.max) + vital.min),
                                   unitOfMeasure: vital.unit
                               });
                        });
                    }, 1000);
                },
                stopDemo: function(){
                    $interval.cancel(stop);
                    stop = undefined;
                }
            };

            return vitals;
        }
    ]);