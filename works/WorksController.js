'use strict';

angular.module('works')

.controller('WorksController',['$scope','$timeout','$filter','$cookies', 'WorksService','TaskDetailsService','ProjectService',function($scope, $timeout,$filter, $cookies, WorksService,TaskDetailsService,ProjectService){
	
	$scope.works = [];
	$scope.passTask = [];
	$scope.colSize = false;
	$scope.userLists=[];
	WorksService.GetPersonalWorks(function(response){
		$scope.works = response.works;
	});
	
	$scope.labelling = function(tasksStatus){
		var labelStatus = tasksStatus;
		if(labelStatus =='To-do'){
			return 'label label-info';
			
		}else if(labelStatus == 'In-Progress'){
			return 'label label-warning';
		}else if(labelStatus == 'Done'){
			return 'label label-success';
		}
	}
	
	$scope.close = function(){
		$scope.colSize = false;
	}
	
	$scope.toggleEachTask = function(taskId, projectKey){
		WorksService.FindTask(taskId, function(response){
			
			$scope.colSize = true;
			$scope.passTask = response;
			$scope.taskDTitle = response.tasksTitle;
			$scope.taskDDesc = response.tasksDesc;
			$scope.taskDAssignee = response.assignee;
			$scope.taskDStatus = response.tasksStatus;
			
		TaskDetailsService.ListTaskComments(taskId,function(response){
			switch(response.success){ 
				case 0:
					$scope.taskCommentLists =[];
				break;
					
				case 1:
					$scope.taskCommentLists = response.taskComments;
				break;
				case 2:
				break;
				}
			});
		});
		
		ProjectService.ListUsers(projectKey, function(response){
			switch(response.success){
				case 0:
					$scope.userLists = [];
				break;
				
				case 1:
					$scope.userLists = response.users;
				break;
			}
		});
	}
	
	$scope.sortByHeader = function(type){
		switch(type){
			case 1:
				$scope.works = $filter('orderBy')($scope.works, 'taskStatus');
			break;
		}
	}
}]);