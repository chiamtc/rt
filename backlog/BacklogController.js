'use strict';
angular.module('backlog')

.controller('BacklogController', ['$scope','$timeout','SprintService','BacklogService', function($scope, $timeout,SprintService,  BacklogService){
	
	/** fancy starts **/
	NProgress.start();
	NProgress.done();
	
	/** UI bindings **/
	$scope.createBacklogResponse = false;
	$scope.backlogLists = [];
	$scope.backlogCounts = 0;
	$scope.list2 = [];
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
		{name: 'Lowest', type: 'Lowest'},
	];
	
	$scope.startCallback = function(event, ui, title){
		console.log('You started draggin: ' + title.backlogId);
		$scope.draggedTitle = title.backlogId;
	};

	$scope.dropCallback = function(event, ui) {
		if($scope.backlogLists.length == 0){
			$scope.backlogListsClass = "backlogListsEmpty";
		}
		
		if($scope.sprintLists.length == 0){
			$scope.sprintListsClass= "sprintListsEmpty";
		}else{
			$scope.backlogListsClass ="backlogLists";
			console.log('hey, you dumped me :-(' , $scope.draggedTitle2, 'from sc12');
			SprintService.UpdateSprint(0, $scope.draggedTitle2, function(response){
				console.log(0 + " " + $scope.draggedTitle2);
				NProgress.start();
				NProgress.set(0.7);
				NProgress.done();
			});
			
		}
		
	};
	
	BacklogService.ListBacklogs(function(response){
		if(response.backlogs == null){
			$scope.backlogLists = [];
			$scope.backlogListsClass = "backlogListsEmpty";
		}else{
			$scope.backlogListsClass ="backlogLists";
			$scope.backlogLists= response.backlogs;
			$scope.backlogCounts = $scope.backlogLists.length;
			$scope.sprintCounts = $scope.sprintLists.length;
		}
		
	});

	$scope.createBacklog= function(){
		NProgress.set(0.5);
		BacklogService.CreateBacklog($scope.backlogCreateName,$scope.backlogCreateType.type,$scope.backlogCreateDesc,$scope.backlogCreatePriority.type, $scope.userEmail, function(response){
			
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