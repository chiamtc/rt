'use strict';

angular.module('side-task-issues')

.controller('SideTaskIssuesController', ['$scope', '$routeParams', '$cookies','ActiveSprintService','SideIssuesService','BacklogService','ProjectService','SprintService',function($scope, $routeParams, $cookies,ActiveSprintService,SideIssuesService,BacklogService,ProjectService,SprintService){
	$scope.selectedTask = [];
	$scope.userLists = [];
	$scope.toggleTask = function(task){
		$scope.selectedTask = task;
		$scope.taskDTitle = task.tasksTitle;
		$scope.taskDStatus = task.tasksStatus;
		$scope.taskDAssignee = task.assignee;
	}
	ProjectService.ListUsers($routeParams.projectKey, function(response){
		switch(response.success){
			case 0:
				$scope.userLists = [];
			break;
			
			case 1:
				$scope.userLists = response.users;
			break;
		}
	});
}]);