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
    });
;
