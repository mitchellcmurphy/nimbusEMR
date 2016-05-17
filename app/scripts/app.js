'use strict';

/**
 * @ngdoc overview
 * @name nimbusEmrApp
 * @description
 * # nimbusEmrApp
 *
 * Main module of the application.
 */
angular
    .module('nimbusEmrApp', [
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'firebase',
        'firebase.ref',
        'firebase.auth',
        'apiMock',
        'config',
        'ui.bootstrap'
    ])
    //Constants and config for Mock Data
    .config(function (apiMockProvider) {
        apiMockProvider.config({
            mockDataPath: '/mock-data/package',
            //TODO: Replace the url when this service opens
            apiPath: '/where-ever-packages-comes-from',
        });
    })
    .constant('VITALS_CONFIG', [
        {name: 'hr', unit: 'bpm', max: 190, min: 85},
        {name: 'sp02', unit: '%', max: 100, min: 85},
        {name: 'etc02', unit: '%', max: 100, min: 85},
        {name: 'resp', unit: 'bpm', max: 20, min: 1}
    ]);
;
