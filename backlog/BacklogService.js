'use strict';

angular.module('backlog')

.factory('BacklogService', ['$http','$filter','$routeParams',function($http, $filter,$routeParams){
	var factory = {};
	
	factory.CreateBacklog = function(backlogName, backlogType, backlogDesc, backlogPriority, backlogStoryPoint, backlogCreator,callback){
		$http({
			method : "POST",
			url:"php/backlog/createBacklog.php",
			data:{
				backlogName : backlogName,
				backlogType : backlogType,
				backlogDesc : backlogDesc,
				backlogPriority  : backlogPriority,
				backlogStoryPoint : backlogStoryPoint,
				backlogCreator: backlogCreator,
				dateCreated : moment().format(),
				dateModified : moment().format(),
				projectKey : $routeParams.projectKey,
			},
			headers :{ 'Content-Type' : 'application/json' }
		}).then(function(response){
			console.log(response.data);
			angular.forEach(response.data.backlogs, function(value, key){
				
				value.dateCreated = moment(value.dateCreated).fromNow();
				value.dateModified =  moment(value.dateModified).fromNow();
				
			});
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
			angular.forEach(response.data.backlogs, function(value, key){
				value.dateCreated = moment(value.dateCreated).fromNow();
				value.dateModified = moment(value.dateModified).fromNow();
			});
			callback(response.data);
		});
	};
	
	return factory;
	
}])