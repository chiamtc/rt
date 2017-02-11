'use strict';
angular.module('sprint')

.controller('SprintController', ['$scope', '$timeout', 'SprintService', function($scope, $timeout,SprintService){

	/** fancy starts **/
	NProgress.start();
	NProgress.done();
	
	/** UI bindings **/
	$scope.sprintLists = [];
	$scope.sprintCounts = 0;
	$scope.createSprintResponse= false;
	/** date format **/
	//var a = new Date(Date.parse("2017-02-08T14:00:00.000Z"));
	
	$scope.startCallback2 = function(event, ui, sc2){
		console.log('You started draggin: ' + sc2.backlogId);
		$scope.draggedTitle2 = sc2.backlogId;
	};

	$scope.dropCallback2 = function(event, ui, item) {
		if($scope.backlogLists.length == 0){
			$scope.backlogListsClass = "backlogListsEmpty";
		}
		
		if($scope.sprintLists.length == 0){
			$scope.sprintListsClass= "sprintListsEmpty";
		}else{
			if($scope.backlogLists.length == 0){
				$scope.backlogListsClass = "backlogListsEmpty";
			}
			$scope.sprintListsClass = "sprintLists";
			console.log('hey, you dumped me :-(' , item,$scope.draggedTitle);
		}
	};
	
	SprintService.ListSprints(function(response){
		switch(response.success){
			case 1:
				$scope.sprintListsClass="sprintLists";
				$scope.sprintLists = response.sprints;
			break;
		}
	});
	
	$scope.createSprint = function(){
		$scope.createSprintResponse = !$scope.createSprintResponse;
		if($scope.sprintStartDate.getTime() == $scope.sprintEndDate.getTime()){
			$scope.createSprintResponseClass ="alert alert-danger";
			$scope.createSprintResponseMessage = "Both dates shouldn't be the same!";
			
		}else if($scope.sprintStartDate.getTime() > $scope.sprintEndDate.getTime()){
			$scope.createSprintResponseClass ="alert alert-danger";
			$scope.createSprintResponseMessage = "Start date is later than end date";
		}else{
			SprintService.CreateSprint($scope.sprintGoal, $scope.sprintStartDate, $scope.sprintEndDate, function(response){
				switch(response.success){
				case 0:
					$scope.createSprintResponseClass ="alert alert-danger";
					$scope.createSprintResponseMessage = "Server Error";
				break;
				
				case 1:
					$scope.createSprintResponseClass ="alert alert-success";
					$scope.createSprintResponseMessage = "Sprint Created.";
					//console.log('/project/' + response.project[0].projectKey +'/'+ response.project[0].projectName);
					$scope.sprintLists.push(response.sprints[0]);
					$scope.sprintListsClass = "sprintLists";
					$timeout(function(){
							$('#sprintCreateModal').modal('toggle');
					},500);
					
				break;
				
				case 2:
					$scope.createSprintResponseClass ="alert alert-danger";
					$scope.createSprintResponseMessage = "Server error 2";
				break;
				
				case 3:
					$scope.createSprintResponseClass ="alert alert-danger";
					$scope.createSprintResponseMessage = "Empty field(s) detected";
				break;
				
			}
			}); 
		}
	}
}])

.directive('productSprint',function(){
	return{
		templateUrl : 'sprint/sprint.html',
		controller: 'SprintController',
	};
});