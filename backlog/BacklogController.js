'use strict';
angular.module('backlog')

.controller('BacklogController', ['$scope','$timeout','SprintService','BacklogService', function($scope, $timeout,SprintService,  BacklogService){
	
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
	
	
	
	$scope.startCallback = function(event, ui, title){
		console.log('You started draggin: ' + title.backlogId);
		$scope.draggedTitle = title.backlogId;
	};
	
	$scope.dropCallback = function(event, ui) {
		NProgress.start();
		$scope.backlogListsClass ="backlogLists";
		console.log('hey, you dumped me :-(' , $scope.draggedTitle, 'from sc12');
		SprintService.UpdateSprint(0, $scope.draggedTitle, function(response){
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
		if(response.backlogs == null){
			$scope.backlogLists = [];
			$scope.backlogListsClass = "backlogListsEmpty";
		}else{
			$scope.backlogListsClass ="backlogLists";
			$scope.backlogLists= response.backlogs;
		}
	});

	$scope.createBacklog= function(){
		NProgress.set(0.5);
		BacklogService.CreateBacklog($scope.backlogCreateName,$scope.backlogCreateType.type,$scope.backlogCreateDesc,$scope.backlogCreatePriority.type, $scope.backlogStoryPoint,$scope.userEmail, function(response){
			
		$scope.createBacklogResponse = !$scope.createBacklogResponse;
		
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
				$scope.backlogLists.push(response.backlog[0]);
				$timeout(function(){
					$('#backlogCreateModal').modal('toggle'); 
					$scope.createBacklogResponse = !$scope.createBacklogResponse;
					$("#createBacklogForm").trigger("reset");
					$scope.backlogCreateType = $scope.backlogCreateTypes[0];
					$scope.backlogCreatePriority = $scope.backlogPriorities[0];
					
				},500);
					
			break;
				
			case 2:
				$scope.createResponseClass ="alert alert-danger";
				$scope.createResponseMessage = "Server error 2";
			break;
				
			default:
				$scope.createResponseClass ="alert alert-danger";
				$scope.createResponseMessage = "Empty field(s) detected";
			break;
			
			}
		});
		NProgress.done();
	};
}])

.directive('productBacklog',function(){
	return{
		templateUrl : 'backlog/backlog.html',
		controller: 'BacklogController',
	};
});