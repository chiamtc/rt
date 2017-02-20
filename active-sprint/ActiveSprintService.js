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
				angular.forEach(value.backlogs, function(v,k){
					v.dateCreated = moment(v.dateCreated).fromNow();
					v.dateModified = moment(v.dateModified).fromNow();
					angular.forEach(v.tasks, function(v1,k1){
						v1.dateCreated = moment(v1.dateCreated).fromNow();
						v1.dateModified = moment(v1.dateModified).fromNow();
					});
				});
			});
			console.log(response.data);
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