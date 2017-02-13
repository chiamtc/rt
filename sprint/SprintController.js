'use strict';
angular.module('sprint')

.controller('SprintController', ['$scope', '$timeout', 'SprintService', function($scope, $timeout,SprintService){

	/** fancy starts **/
	NProgress.start();
	NProgress.done();
	
	/** UI bindings **/
	$scope.sprintLists = [];
	$scope.createSprintResponse= false;
	$scope.editSprintResponse= false;
	/** date format **/
	//var a = new Date(Date.parse("2017-02-08T14:00:00.000Z"));
	
	$scope.startCallback2 = function(event, ui, sc2){
		console.log('You started draggin: ' + sc2.backlogId);
		$scope.draggedTitle= sc2.backlogId;
	};

	$scope.dropCallback2 = function(event, ui, item) {
		if($scope.backlogLists.length == 0){
			$scope.backlogListsClass = "backlogListsEmpty";
		}
		
		if($scope.sprintLists.length == 0){
			$scope.sprintListsClass= "sprintListsEmpty";
		}else{
			$scope.sprintListsClass = "sprintLists";
			console.log('sprintId' , item,' backlogId',$scope.draggedTitle);
			SprintService.UpdateSprint(item, $scope.draggedTitle, function(response){
				NProgress.start();
				NProgress.set(0.7);
				NProgress.done();
				$scope.sprintLists = response.sprints;
			});
		}
	};
	
	$scope.passEdit = function(sprint){
		$scope.sprintEditId = sprint.sprintId;
		$scope.sprintEditGoal = sprint.sprintGoal;
		$scope.sprintEditStartDate = new Date(Date.parse(sprint.sprintStartDate));
		$scope.sprintEditEndDate = new Date(Date.parse(sprint.sprintEndDate));
	}
	
	$scope.updateSprint = function(){
		SprintService.UpdateSprintDetails($scope.sprintEditId, $scope.sprintEditGoal, $scope.sprintEditStartDate, $scope.sprintEditEndDate, function(response){
			NProgress.start();
			$scope.editSprintResponse = !$scope.editSprintResponse;
			switch(response.success){
				case 0:
					$scope.editSprintResponseClass = "alert alert-danger";
					$scope.editSprintResponseMessage = "Failed to update";
				break;
				
				case 1:
					$scope.editSprintResponseClass = "alert alert-success";
					$scope.editSprintResponseMessage = "Details are updated! :)";
					$timeout(function(){
						$('#sprintEditModal').modal('toggle');
					},500);
				break;
			}
			NProgress.set(0.7);
			NProgress.done();
		});
	}
	
	SprintService.ListSprints(function(response){
		switch(response.success){
			case 1:
				$scope.sprintListsClass="sprintLists";
				$scope.sprintLists = response.sprints;
				console.log($scope.sprintLists);
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