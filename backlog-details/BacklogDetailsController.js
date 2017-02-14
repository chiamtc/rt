'use strict';
angular.module('backlog-details')

.controller('BacklogDetailsController', ['$scope','$timeout','SprintService','BacklogService', function($scope, $timeout,SprintService,  BacklogService){
	
	/** fancy starts **/
	NProgress.start();
	NProgress.done();
	
	/** UI bindings **/
	$scope.passBacklog = [];
	$scope.toggle = function(backlog){
		$scope.colSize = true;
		$scope.passBacklog = backlog;
		console.log($scope.passBacklog);
		$scope.backlogDDesc = $scope.passBacklog.backlogDesc;
	}
	
	/** UI functions **/
	$scope.tested= function(){
		console.log($scope.backlogDPriority);
	}
	
	$scope.testedd= function(){
		console.log($scope.backlogDDesc);
	}
	
	$scope.cars = [{model : "Ford Mustang", color : "red"},
    {model : "Fiat 500", color : "white"},
    {model : "Volvo XC90", color : "black"}];
}])

.directive('backlogDetails',function(){
	return{
		templateUrl : 'backlog-details/backlog-details.html',
		controller: 'BacklogDetailsController',
	};
})