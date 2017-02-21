'use strict';

angular.module('active-sprint')

.factory('ActiveSprintService', ['$http','$routeParams',function($http, $routeParams){
	var factory = {};
	
	factory.ListActiveBacklogsTasks= function(callback){
		$http({
			method: 'POST',
			url : 'php/active-sprint/getBacklogsTasks.php',
			data:{
				projectKey : $routeParams.projectKey,
			},
			headers : { 'Content-Type' : 'application/json'}
		}).then(function(response){
			angular.forEach(response.data.activeSprints, function(value, key){
				value.sprintStartDate = moment(value.sprintStartDate).format('YYYY-MM-DD');
				
				value.sprintEndDate = moment(value.sprintEndDate).format('YYYY-MM-DD');
				//console.log(days);
				//value.days = days;
				angular.forEach(value.backlogs, function(v,k){
					v.dateCreated = moment(v.dateCreated).fromNow();
					v.dateModified = moment(v.dateModified).fromNow();
					angular.forEach(v.tasks, function(v1,k1){
						v1.dateCreated = moment(v1.dateCreated).fromNow();
						v1.dateModified = moment(v1.dateModified).fromNow();
					});
				});
			});
			
			callback(response.data);
		});
	}
	
	factory.UpdateToDo=function(tasksId, backlogId, callback){
		$http({
			method: 'POST',
			url : 'php/active-sprint/updateTodo.php',
			data:{
				tasksId: tasksId,
				backlogId: backlogId,
				dateModified : moment().format(),
			},
			headers : { 'Content-Type' : 'application/json'}
		}).then(function(response){
			response.data.dateModified = moment(response.data.dateModified).fromNow();
			callback(response.data);
		});
	}
	
	factory.UpdateInProgress=function(tasksId, backlogId, callback){
		$http({
			method: 'POST',
			url : 'php/active-sprint/updateInProgress.php',
			data:{
				tasksId: tasksId,
				backlogId: backlogId,
				dateModified : moment().format(),
			},
			headers : { 'Content-Type' : 'application/json'}
		}).then(function(response){
			response.data.dateModified = moment(response.data.dateModified).fromNow();
			callback(response.data);
		});
	}
	
	factory.UpdateDone=function(tasksId, backlogId, callback){
		$http({
			method: 'POST',
			url : 'php/active-sprint/updateDone.php',
			data:{
				tasksId: tasksId,
				backlogId: backlogId,
				dateModified : moment().format(),
			},
			headers : { 'Content-Type' : 'application/json'}
		}).then(function(response){
			response.data.dateModified = moment(response.data.dateModified).fromNow();
			callback(response.data);
		});
	}
	
	factory.ListTodoTasks= function(callback){
		$http({
			method: 'POST',
			url : 'php/active-sprint/getTodoTasks.php',
			data:{
				projectKey : $routeParams.projectKey,
			},
			headers : { 'Content-Type' : 'application/json'}
		}).then(function(response){
			/* angular.forEach(response.data.activeSprints, function(value, key){
				angular.forEach(value.backlogs, function(v,k){
					v.dateCreated = moment(v.dateCreated).fromNow();
					v.dateModified = moment(v.dateModified).fromNow();
				});
			}); */
			console.log(response.data);
			callback(response.data);
		});
	}
	return factory;
}]);