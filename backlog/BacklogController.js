'use strict';
angular.module('backlog')

.controller('BacklogController', ['$scope','$filter','$timeout','SprintService','BacklogService', function($scope, $filter,$timeout,SprintService,  BacklogService){
	
	/** fancy starts **/
	NProgress.start();
	NProgress.done();
	
	/** UI bindings **/
	$scope.createBacklogResponse = false;
	$scope.backlogLists = [];
	$scope.backlogCreateTypes=[
		{typeName: 'User Story', type: 'User Story',icon:'glyphicon glyphicon-plus'},
		{typeName: 'Issues', type: 'Issues',icon:'glyphicon glyphicon-user'},
		{typeName: 'Tasks', type: 'Tasks',icon:'glyphicon glyphicon-euro'},
	];
	
	$scope.backlogPriorities=[
		{name: 'Highest', type: 'Highest'},
		{name: 'High', type: 'High'},
		{name: 'Medium', type: 'Medium'},
		{name: 'Low', type: 'Low'},
	];
	
	/** UI function(s) **/
	$scope.startCallback = function(event, ui, title){
		console.log('You started draggin: ' + title.backlogId + " status"+ title.backlogStatus);
		$scope.draggedTitle = title.backlogId;
		$scope.draggedStatus = title.backlogStatus;
	};
	
	$scope.dropCallback = function(event, ui) {
		NProgress.start();
		$scope.backlogListsClass ="backlogLists";
		console.log('hey, you dumped me :-(' , $scope.draggedTitle, 'from sc12', $scope.draggedStatus);
		SprintService.UpdateSprint(0, $scope.draggedTitle, $scope.draggedStatus, function(response){
			console.log(0 + " " + $scope.draggedTitle2);
			switch(response.success){
				case 1:
					BacklogService.ListBacklogs(function(response){
						if(response.backlogs == null){
							$scope.backlogLists = [];
							$scope.backlogListsClass = "backlogListsEmpty";
						}else{
							$scope.backlogListsClass ="backlogLists";
							$scope.backlogLists= response.backlogs;
						}
					});
				break;
				
				case 0:
				break;
			}
		});	
		
		NProgress.set(0.7);
		NProgress.done();
	};
	
	BacklogService.ListBacklogs(function(response){
		switch(response.success){
			case 0:
			$scope.backlogLists = [];
			$scope.backlogListsClass = "backlogListsEmpty";
			break;
			case 1:
			$scope.backlogListsClass ="backlogLists";
			$scope.backlogLists =  response.backlogs;
			break;
		}
	});

	$scope.createBacklog= function(){
		NProgress.set(0.5);
		$scope.createBacklogResponse = !$scope.createBacklogResponse;
		if(!$scope.backlogCreateName){
			$scope.createBacklogResponseClass ="alert alert-danger";
			$scope.createBacklogResponseMessage = "Backlog Title is empty";
			$timeout(function(){
				$scope.createBacklogResponse = !$scope.createBacklogResponse;	
			},1000);
		}else{
			BacklogService.CreateBacklog($scope.backlogCreateName,$scope.backlogCreateType.type,$scope.backlogCreateDesc,$scope.backlogCreatePriority.type, $scope.backlogCreateStoryPoint,$scope.backlogCreateBusinessValue,$scope.userEmail, function(response){
			switch(response.success){
				case 0:
					
					$scope.createResponseClass ="alert alert-danger";
					$scope.createResponseMessage = "Server Error";
				break;
				
				case 1:
					$scope.createBacklogResponseClass ="alert alert-success";
					$scope.createBacklogResponseMessage = "Backlog Created.";
						//console.log('/project/' + response.project[0].projectKey +'/'+ response.project[0].projectName);
						
					$scope.backlogListsClass = "backlogLists";
					$scope.backlogLists = response.backlogs;
					$timeout(function(){
						$('#backlogCreateModal').modal('toggle'); 
						$scope.createBacklogResponse = !$scope.createBacklogResponse;
						$scope.backlogCreateType = $scope.backlogCreateTypes[0];
						$scope.backlogCreatePriority = $scope.backlogPriorities[0];
					},500);
					$("#createBacklogForm").trigger("reset");
				break;
					
				case 2:
					$scope.createBacklogResponseClass ="alert alert-danger";
					$scope.createBacklogResponseMessage = "Server error 2";
				break;
					
				case 3:
					$scope.createBacklogResponseClass ="alert alert-danger";
					$scope.createBacklogResponseMessage = "Empty field(s) detected";
					$timeout(function(){
						$scope.createBacklogResponse = !$scope.createBacklogResponse;	
					},1000);
				break;
				
				
				}
			});
		}
		NProgress.done();
	};
	
	$scope.sortBacklog = function(x){
		switch(x){
			case 1:
				$scope.backlogLists = $filter('orderBy')($scope.backlogLists, 'backlogStatus');
			break;
			
			case 2:
				$scope.backlogLists = $filter('orderBy')($scope.backlogLists, 'dateCreated',true);
			break;
			case 3:
				$scope.backlogLists = $filter('orderBy')($scope.backlogLists, 'backlogStoryPoint');
			break;
			case 4:
				$scope.backlogLists = $filter('orderBy')($scope.backlogLists, 'backlogBusinessValue');
			break;
			
		}
		
		console.log($scope.backlogLists);
		
	}
}])

.directive('productBacklog',function(){
	return{
		templateUrl : 'backlog/backlog.html',
		controller: 'BacklogController',
	};
});