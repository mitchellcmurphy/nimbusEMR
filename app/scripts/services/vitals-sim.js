'use strict';

/**
 * @ngdoc function
 * @name nimbusEmrApp.factory:VitalsSim
 * @description
 * # Wall
 * VitalsSim Service for the nimbusEmrApp
 */


angular.module('nimbusEmrApp')
    .factory('VitalsSim', ['$rootScope', '$interval', '$firebaseArray',
        function ($rootScope, $interval, $firebaseArray) {
            var stop;
            var vitals = {
                startDemo: function (firebaseRef) {
                    var userid = "user1";
                    //hr
                    var hrRef = firebaseRef.child(userid + '/vitals/hr');
                    var hr = $firebaseArray(hrRef);
                    //sp02
                    var sp02Ref = firebaseRef.child(userid + '/vitals/sp02');
                    var sp02 = $firebaseArray(sp02Ref);
                    //etc02
                    var etc02Ref = firebaseRef.child(userid + '/vitals/etc02');
                    var etc02 = $firebaseArray(etc02Ref);
                    //resp
                    var respRef = firebaseRef.child(userid + '/vitals/resp');
                    var resp = $firebaseArray(respRef);

                    stop = $interval(function () {
                        hr.$add(
                            {
                                value: Math.floor((Math.random() * 190) + 85),
                                unitOfMeasure: 'bpm'
                            }
                        );
                        sp02.$add(
                            {
                                value: Math.floor((Math.random() * 100) + 85),
                                unitOfMeasure: '%'
                            }
                        );
                        etc02.$add(
                            {
                                value: Math.floor((Math.random() * 100) + 85),
                                unitOfMeasure: '%'
                            }
                        );
                        resp.$add(
                            {
                                value: Math.floor((Math.random() * 20) + 1),
                                unitOfMeasure: 'bpm'
                            }
                        );
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