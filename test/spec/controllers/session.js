'use strict';

describe('Controller: SessionController', function () {

    // load the controller's module
    beforeEach(module('nimbusEmrApp'));

    var SessionController,
        scope,
        VitalsSim;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        VitalsSim = {
            startDemo: jasmine.createSpy('VitalsSim.startDemo'),
            stopDemo: jasmine.createSpy('VitalsSim.stopDemo')
        };
        SessionController = $controller('SessionController', {
            $scope: scope,
            VitalsSim: VitalsSim
        });
    }));

    it('should instantiate the controller properly', function () {
        expect(SessionController).not.toBeUndefined();
    });

    it('should instantiate the controller mapValues properly', function () {
        expect(scope.mapValues()).not.toBeUndefined();
    });

    it('should send mapValues hr and get Heart Rate back', function(){
        expect(scope.mapValues('hr')).toEqual('Heart Rate');
    });

    it('should send mapValues etc02 and get ETC02 back', function(){
        expect(scope.mapValues('etc02')).toEqual('ETC02');
    });

    it('should send mapValues sp02 and get SP02 back', function(){
        expect(scope.mapValues('sp02')).toEqual('SP02');
    });

    it('should send mapValues resp and get Respiratory back', function(){
        expect(scope.mapValues('resp')).toEqual('Respiratory');
    });

    it('should call the startDemo function of the VitalsSim service', function(){
        scope.startSim();
        expect(VitalsSim.startDemo).toHaveBeenCalled();
    });

    it('should call the stopDemo function of the VitalsSim service', function(){
        scope.stopSim();
        expect(VitalsSim.stopDemo).toHaveBeenCalled();
    });
});
