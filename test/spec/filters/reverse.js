'use strict';

describe('Filter: reverse', function () {

  // load the controller's module
  beforeEach(module('nimbusEmrApp'));

  var reverseFilter;

  // Initialize the filter and a mock scope
  beforeEach(inject(function($sce, _reverseFilter_) {
    reverseFilter = _reverseFilter_;
  }));

  it('should reverse the items in an array', function () {
    var items = [3,2,1];
    var result = reverseFilter(items);
    expect(result).toEqual([1,2,3]);
  });
});
