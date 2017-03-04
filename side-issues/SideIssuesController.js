'use strict';

angular.module('side-issues')

.controller('SideIssuesController', ['$scope', '$routeParams', '$cookies','ActiveSprintService','SideIssuesService','BacklogService','SprintService',function($scope, $routeParams, $cookies,ActiveSprintService,SideIssuesService,BacklogService,SprintService){
	
	SprintService.ListActiveSprints(function(response){
		switch(response.success){
			case 1:
				
				$scope.activeBacklog = response.activeSprints[0].backlogs;
				console.log($scope.activeBacklog);
				
			break;
			
			case 0:
				$scope.activeSprint=[];
			break;
		}
	});
	
	SprintService.ListSprints(function(response){
		switch(response.success){
			case 1:
				
				$scope.inactiveBacklog = response.sprints;
			break;
			case 0:
				
			break;
		}
	});
	
	BacklogService.ListBacklogs(function(response){
		switch(response.success){
			case 1:
			
				$scope.backlogLists = response.backlogs;
			break;
			case 0:
				
			break;
		}
	});
}]);