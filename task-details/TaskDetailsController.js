'use strict';

angular.module('task-details')

.controller('TaskDetailsController', ['$scope','TaskDetailsService','$timeout', function($scope, TaskDetailsService,$timeout){
	
	$scope.passTask = [];
	$scope.taskCommentLists = [];
	$scope.toggle = function(task){
		$scope.colSize = true;
		
		$scope.passTask = task;
		$scope.taskDTitle = task.tasksTitle;
		$scope.taskDDesc = task.tasksDesc;
		TaskDetailsService.ListTaskComments($scope.passTask.tasksId,function(response){
		console.log($scope.passTask.tasksId);
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
	}
	
	$scope.deleteTaskComment = function(comment){
		TaskDetailsService.DeleteTaskComment(comment.taskCommentId, comment.tasksId, function(response){
			switch(response.success){
				case 1:
					TaskDetailsService.ListTaskComments($scope.passTask.tasksId,function(response){
					console.log($scope.passTask.tasksId);
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
				break;
				case 0:
					console.log(response);
				break;
			}
		});
	}
	
	$scope.retain = function(){
		$scope.taskDTitle = $scope.task.taskDTitle;
		$scope.taskDDesc = $scope.task.backlogDesc;
	}
	
	$scope.commentTask= function(){
		TaskDetailsService.SubmitTaskComment($scope.tasksDComment,$scope.passTask.tasksId, function(response){
			switch(response.success){
				case 0:
				break;
				
				case 1:
					$scope.taskCommentLists.push(response.taskComment[0]);
				break;
			}
		});
		$scope.tasksDComment = "";
	}
	
	$scope.updateTaskTitle = function(){
		TaskDetailsService.UpdateTaskTitle($scope.taskDTitle, $scope.passTask.tasksId,$scope.passTask.backlogId, function(response){
			switch(response.success){
				case 1:
					$scope.snackbarShow = !$scope.snackbarShow;
					$scope.snackbarClass= "alert alert-success alert-dismissible snackbar";
					$scope.snackbarMessage = "Task Title Updated ! ";
					$scope.passTask.tasksTitle = $scope.taskDTitle; // two-way binding in parameter
					$scope.passTask.dateModified = moment().fromNow();
					
					$timeout(function(){
						$scope.snackbarShow = !$scope.snackbarShow;
					},5000);
				break;
				
				case 0:
					$scope.snackbarShow = !$scope.snackbarShow;
					$scope.snackbarClass= "alert alert-danger alert-dismissible snackbar";
					$scope.snackbarMessage = "Something is wrong! :X ";
					$timeout(function(){
						$scope.snackbarShow = !$scope.snackbarShow;
					},5000);
				break;
			}
		});
	}
	
	$scope.updateTaskDesc = function(){
		TaskDetailsService.UpdateTaskDesc($scope.taskDDesc, $scope.passTask.tasksId, $scope.passTask.backlogId, function(response){
			switch(response.success){
				case 1:
					$scope.snackbarShow = !$scope.snackbarShow;
					$scope.snackbarClass= "alert alert-success alert-dismissible snackbar";
					$scope.snackbarMessage = "Task Desc Updated ! ";
					$scope.passTask.tasksDesc = $scope.taskDDesc; // two-way binding in parameter
					$scope.passTask.dateModified = moment().fromNow();
					
					$timeout(function(){
						$scope.snackbarShow = !$scope.snackbarShow;
					},5000);
				break;
				
				case 0:
					$scope.snackbarShow = !$scope.snackbarShow;
					$scope.snackbarClass= "alert alert-danger alert-dismissible snackbar";
					$scope.snackbarMessage = "Something is wrong! :X ";
					$timeout(function(){
						$scope.snackbarShow = !$scope.snackbarShow;
					},5000);
				break;
			}
		});
	}
	
}])

.directive('taskDetails',function(){
	return{
		templateUrl : 'task-details/task-details.html',
		controller: 'TaskDetailsController',
	}
});