'use strict';

describe('Service: PackagesService', function () {

  // load the controller's module
  beforeEach(module('nimbusEmrApp'));

  var packageService,
    scope,
    httpBackend;

  //var packagesUrl = '/where-ever-packages.js-comes-from';
  var packagesUrl = '/mock-data/package.get.json';

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_PackagesService_, $rootScope, $httpBackend) {
    packageService = _PackagesService_;
    scope = $rootScope;
    httpBackend = $httpBackend;

    //Ignore get requests that lead to our service calls
    $httpBackend.whenGET(/\.html$/).respond('');
  }));

  it('should instantiate a proper Package Service Object', function () {
    expect(packageService).not.toBeUndefined();
  });

  it('should check the getPackageData is instantiated', function () {
    expect(packageService.getPackageData).not.toBeUndefined();
  });

  it('should check the getPackageData can be called', function () {
    //Mock the backend to return no data, we just want to test that the fuction exists and is called
    httpBackend.when('GET', packagesUrl).respond({});
    expect(packageService.getPackageData()).not.toBeUndefined();
    httpBackend.flush();
  });

  it('should obtain the packages data from the backend service', function(){
    //Construct our URL
    var url = packagesUrl;
    //Construct our sample response
    var httpResponse = [
      {
        "callSign": "ATL1557",
        "dispatcher": "Kent, C.",
        "pilot": "Kristopherson, K.",
        "flightPlanId": "002712",
        "tailId": "N101RP",
        "flightNumber": "1557",
        "pod": "ATL",
        "etd": "2358",
        "poa": "MAD",
        "state": "PUBLISHED",
        "typeOfAircraft": "GLFS",
        "dod": "24.12.2015 14:30:10 UTC",
        "altPilotInCommand": "Wright, O.",
        "numberOfFiles": 7
      },
      {
        "callSign": "ATL1558",
        "dispatcher": "Zakharenko, N.",
        "pilot": "Jeppesen, E.",
        "flightPlanId": "",
        "tailId": "N102RP",
        "flightNumber": "1558",
        "pod": "LHR",
        "etd": "2300",
        "poa": "AMS",
        "state": "PENDING",
        "typeOfAircraft": "GLFS",
        "dod": "24.12.2015 14:30:10 UTC",
        "altPilotInCommand": "Wright, O.",
        "numberOfFiles": 7
      }
    ];
    //Mock our response when the url is called
    httpBackend.when('GET', url).respond(httpResponse);
    //Call our function
    packageService.getPackageData().then(function(response){
      expect(response.data).toEqual(httpResponse);
    });
    httpBackend.flush();
  });

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

});
