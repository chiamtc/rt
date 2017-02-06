'use strict';

angular.module('backlog')

.factory('BacklogService', ['$http','$routeParams',function($http, $routeParams){
	var factory = {};
	
	factory.CreateBacklog = function(backlogName, backlogType, backlogDesc, backlogPriority, backlogCreator,callback){
		$http({
			method : "POST",
			url:"php/backlog/createBacklog.php",
			data:{
				backlogName : backlogName,
				backlogType : backlogType,
				backlogDesc : backlogDesc,
				backlogPriority  : backlogPriority,
				backlogCreator: backlogCreator,
				projectKey : $routeParams.projectKey,
			},
			headers :{ 'Content-Type' : 'application/json' }
		}).then(function(response){
			callback(response.data);
		});
	};
	
	factory.ListBacklogs = function(callback){
		$http({
			method : "POST",
			url: 'php/backlog/getBacklogs.php',
			data:{
				projectKey : $routeParams.projectKey,
			},
			headers: { 'Content-Type': 'application/json'}
		}).then(function(response){
			callback(response.data);
		});
	};
	
	return factory;
	
}])