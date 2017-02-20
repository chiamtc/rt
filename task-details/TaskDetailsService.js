'use strict';

angular.module('task-details')

.factory('TaskDetailsService', ['$cookies','$http','$routeParams',function($cookies,$http, $routeParams){
	var factory= {};
	
	factory.UpdateTaskTitle = function(taskTitle,taskId, backlogId, callback){
		$http({
			method: 'POST',
			url : 'php/task-details/updateTitle.php',
			data:{
				tasksTitle : taskTitle,
				taskId : taskId,
				backlogId:backlogId,
				dateModified : moment().format(),
			},
			headers : { 'Content-Type' : 'application/json'}
		}).then(function(response){
			callback(response.data);
		});
	}
	
	factory.DeleteTaskComment = function(commentId, tasksId,callback){
		$http({
			method : 'POST',
			url : 'php/task-details/deleteTaskComment.php',
			data:{
				commentId : commentId,
				tasksId : tasksId,
			},
			headers: {'Content-Type':'application/json'}
		}).then(function(response){
			callback(response.data);
		});
	}
	
	factory.UpdateTaskDesc = function(taskDesc, taskId, backlogId, callback){
		$http({
			method: 'POST',
			url : 'php/task-details/updateDesc.php',
			data:{
				taskId:taskId,
				taskDesc : taskDesc,
				backlogId:backlogId,
				dateModified : moment().format(),
			},
			headers : { 'Content-Type' : 'application/json'}
		}).then(function(response){
			callback(response.data);
		});
	}
	
	factory.ListTaskComments = function(tasksId, callback){
		$http({
			method : 'POST',
			url : 'php/task-details/getTaskComments.php',
			data:{
				tasksId: tasksId,
			},
			headers: {'Content-Type':'application/json'}
		}).then(function(response){
			angular.forEach(response.data.taskComments, function(value, key){
				value.dateComment = moment(value.dateComment).fromNow();
			});
			console.log(response);
			callback(response.data);
		});
	}
	
	factory.SubmitTaskComment = function(comment, tasksId,callback){
		$http({
			method : 'POST',
			url : 'php/task-details/submitTaskComment.php',
			data:{
				comment : comment,
				email:$cookies.get('email'),
				dateComment : moment().format(),
				tasksId: tasksId,
			},
			headers: {'Content-Type':'application/json'}
		}).then(function(response){
			
			angular.forEach(response.data.taskComment, function(value, key){
				
				value.dateComment = moment(value.dateComment).fromNow();
				
			});
			console.log(response);
			callback(response.data);
		});
	}
	
	return factory;
}]);