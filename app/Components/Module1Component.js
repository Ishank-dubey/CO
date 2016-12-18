(function(){
	'use strict'
	angular.module('systemHome').component('systemHome',
			{
		    templateUrl :  'Templates/Module1Template.html',
		    controller :   Module1Component,
		    controllerAs : 'aM1Ctrl'
			});
	Module1Component.$inject = ['$scope','$http','$rootScope', '$timeout'];
	function Module1Component($scope, $http, $rootScope, $timeout){
		var aM1Ctrl = this;
		
		 aM1Ctrl.titleType = "Changelist / Build";
		 aM1Ctrl.titleOwner= "Owner";
		 aM1Ctrl.titleTimeStarted = "Time Started";
		 aM1Ctrl.titleState = "State";
		 aM1Ctrl.titleMetrics= "Metrics";
		 aM1Ctrl.titleBuild = "Build";
		 aM1Ctrl.titleUnitTest = "Unit Test";
		 aM1Ctrl.titleFunctionalTest = "Functional Test";
		 //Test egit
		 
		 $rootScope.previousExpandedRow = "";
		 
		 $scope.$watch(function(){
			 return aM1Ctrl.details;
		 },function(aNewValue, anOldValue){
			 if(aNewValue){
			 aM1Ctrl.clickMethod = function clickMethod($event){
	    		 var aClickedRow = $event.currentTarget,
	    		 aTitle = $event.currentTarget.querySelector('span').innerHTML,
	    		 anIdSelectedRow = $event.currentTarget.getAttribute("id"),
	    		 aCurrentRow = document.getElementById(anIdSelectedRow),
	    		 aPreviousRow, theImageElements, aRemovedContainer, anIndex, aPreviousCOntainer;
	    		 /* Reset the past expanded row if any*/
	    		 if(!$rootScope.previousExpandedRow == ""){
	    			 aPreviousRow = document.getElementById($rootScope.previousExpandedRow);
	    			 theImageElements = aPreviousRow.getElementsByTagName("img");
	    			 for(anIndex in theImageElements){
	    				 
	    				 if(anIndex!=0 && theImageElements.hasOwnProperty(anIndex)){
	    					 theImageElements[anIndex].style.visibility = "";
	    				 }
	    			 }
	    			 aPreviousCOntainer = aPreviousRow.getElementsByClassName("expanded_container");
	    			 aRemovedContainer = aPreviousRow.removeChild(aPreviousCOntainer[0]);
	    			 aPreviousRow.style.height = "45px";
	    		 }
	    		 
	    		 /*Add detail view div*/
	    		  theImageElements = aCurrentRow.getElementsByTagName("img");
	    		 
	    		 for(anIndex in theImageElements){
    				 if(anIndex!=0 && theImageElements.hasOwnProperty(anIndex)){
    					 theImageElements[anIndex].style.visibility = "hidden";
    				 }
    			 }
	    		 
	    		 aCurrentRow.style.height = "245px";
	    		 
	    		 aM1Ctrl.detailViewBuildMethod = function detailViewMethod($event){
	    				$event.stopPropagation();
	    				}
	    		 
	    		 /*Fetch the data corresponding to the row clicked*/
	    		 $http.get("Resources/"+aTitle+".json")
	    		    .then(function (response) {
	    		    	var aData = response.data, anIndex, aStatus;
	    		    	
	    		    	/*Populate the expanded view with the data fetched*/
	    		    	for(anIndex in aData){
	    		    		if(aData.hasOwnProperty(anIndex)){
	    		    			if(anIndex.toLowerCase() == "metrics"){
	    		    				aM1Ctrl.test = aData[anIndex].test;
	    		    				aM1Ctrl.metricsDetailStatus = aData[anIndex].metricsDetailStatus;
	    		    			}	else if(anIndex.toLowerCase() == "build"){
	    		    				aM1Ctrl.time = aData[anIndex].time;
	    		    				aM1Ctrl.buildDetailStatus = aData[anIndex].buildDetailStatus;
	    		    			}	else if(anIndex.toLowerCase() == "unittest"){
	    		    				aM1Ctrl.testPassed = aData[anIndex].testPassed;
	    		    				aM1Ctrl.failed = aData[anIndex].failed;
	    		    				aM1Ctrl.percentage = aData[anIndex].percentage;
	    		    				aM1Ctrl.coverage = aData[anIndex].coverage;
	    		    				aM1Ctrl.unitTestDetailStatus = aData[anIndex].unitTestDetailStatus;
	    		    			}   else if(anIndex.toLowerCase() == "functionaltest"){
	    		    				aM1Ctrl.functionalTestDetailStatus = aData[anIndex].functionalTestDetailStatus;
	    		    				aM1Ctrl.functionalTestPassed = aData[anIndex].functionalTestPassed;
	    		    				aM1Ctrl.functionalFailed = aData[anIndex].functionalFailed;
	    		    				aM1Ctrl.functionalPercentage = aData[anIndex].functionalPercentage;
	    		    				aM1Ctrl.functionalCoverage = aData[anIndex].functionalCoverage;
	    		    			}   else if(anIndex.toLowerCase() == "result"){
	    		    				aStatus = aData[anIndex].status;
	    		    				aM1Ctrl.message = aData[anIndex].message;
	    		    				aM1Ctrl.buttonMessage = aData[anIndex].buttonMessage;
	    		    				aM1Ctrl.acceptedOrRejected = aData[anIndex].acceptedOrRejected;
	    		    				if(aStatus.toLowerCase()=="pending" || aStatus.toLowerCase()=="running"){
	    		    					aM1Ctrl.cRejected = false;
	    		    					aM1Ctrl.fontClass = "fontPending";
		    		    				aM1Ctrl.ahidden = true;
	    		    				}else if(aStatus.toLowerCase()=="accepted"){
	    		    					aM1Ctrl.cRejected = false;
	    		    					aM1Ctrl.ahidden = true;
	    		    					aM1Ctrl.fontClass = "fontAccepted";
	    		    				} else if(aStatus.toLowerCase()=="rejected"){
	    		    					aM1Ctrl.cRejected = false;
	    		    					aM1Ctrl.ahidden = true;
	    		    					aM1Ctrl.fontClass = "fontRejected";
	    		    				} else if(aStatus.toLowerCase()=="complete"){
	    		    					aM1Ctrl.cRejected = true;
	    		    					aM1Ctrl.ahidden = false;
	    		    					aM1Ctrl.fontClass = "fontComplete";
	    		    				}
	    		    			}
	    		    		}
	    		    		
	    		    	}
	    		    	
	    		    	
	    		    });
	    		 
	    		 /*To match the css animation*/
	    		 $timeout(function(){
	    			 if(aRemovedContainer)
	    				 aCurrentRow.appendChild(aRemovedContainer);
	    			 else {
	    				 var aExpansionElement = document.getElementsByClassName("expanded_container")[0];
	    				 aExpansionElement.style.display = "";
	    				 aCurrentRow.appendChild(aExpansionElement);
	    				 }
		    		 $rootScope.previousExpandedRow = anIdSelectedRow;	 
	    		 },500);
			 };
			 }
		 })
		 
		 $http.get("Resources/Data.json")
	    .then(function (response) {
	    	aM1Ctrl.details = response.data;
	    });
	}
}
)();