'use strict';

/**
 * @ngdoc function
 * @name nimbusEmrApp.controller:PackagesController
 * @description
 * # PackagesController
 *
 */
angular.module('nimbusEmrApp')
  .filter('highlight', function($sce) {
    return function(text, phrase) {
      if (phrase)
        text = text.replace(new RegExp('('+phrase+')', 'gi'), '<span class="highlighted">$1</span>');

      return $sce.trustAsHtml(text)
    }
  });
