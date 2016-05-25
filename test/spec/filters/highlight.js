'use strict';

describe('Filter: highlight', function () {

  // load the controller's module
  beforeEach(module('nimbusEmrApp'));

  var highlightFilter;

  // Initialize the filter and a mock scope
  beforeEach(inject(function($sce, _highlightFilter_) {
    highlightFilter = _highlightFilter_;
  }));

  it('should highlight the matched text properly', function () {
    // Execute
    var result = highlightFilter('this str contains a str that will be a highlighted str.', 'str');

    // Test
    expect(result.$$unwrapTrustedValue()).toEqual('this <span class="highlighted">str</span> contains a <span class="highlighted">str</span> that will be a highlighted <span class="highlighted">str</span>.');
  });
});
