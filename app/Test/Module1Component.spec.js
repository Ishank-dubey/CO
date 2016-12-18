'use strict'

describe('Module1Component',function(){
	
	beforeEach(angular.mock.module('CoP'));
	var $httpBackend, $componentController, $rootScope, aCtrl;
	
	beforeEach(inject(function(_$httpBackend_, $componentController, $rootScope){
		$httpBackend = _$httpBackend_;
		
		$httpBackend.expectGET('Resources/Data.json')
        .respond([
        	{
                "image":"Resources/build-pending.jpg",
        		"name": "Tenrox-R1_1235", 
                "owner": "", 
                "timeStarted": "", 
                "status": "Pending",
                "metrics" : "pending",
                "build":"pending",
                "unit_test":"pending",
                "functional_test":"pending"
            }]);
		
		aCtrl = $componentController('systemHome');
	}));
	
	it('after loading initial data the details var must exist', function() {
	      expect(aCtrl.details).not.toBeDefined();
	      $httpBackend.flush();
	      expect(aCtrl.details).toEqual([
	        	{
	                "image":"Resources/build-pending.jpg",
	        		"name": "Tenrox-R1_1235", 
	                "owner": "", 
	                "timeStarted": "", 
	                "status": "Pending",
	                "metrics" : "pending",
	                "build":"pending",
	                "unit_test":"pending",
	                "functional_test":"pending"
	            }]);
	    });
	
	it('Variables must be set to corresponding values', function() {
		 expect(aCtrl.titleType).toBe('Changelist / Build');
		 expect(aCtrl.titleOwner).toBe("Owner");
		 expect(aCtrl.titleTimeStarted).toBe( "Time Started");
		 expect(aCtrl.titleState).toBe("State");
		 expect(aCtrl.titleMetrics).toBe("Metrics");
		 expect(aCtrl.titleBuild).toBe("Build");
		 expect(aCtrl.titleUnitTest).toBe("Unit Test");
		 expect(aCtrl.titleFunctionalTest).toBe("Functional Test");
	});
});
