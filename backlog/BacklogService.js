'use strict';

angular.module('backlog')

.factory('BacklogService', ['$http','$filter','$routeParams',function($http, $filter,$routeParams){
	var factory = {};
	
	factory.CreateBacklog = function(backlogName, backlogType, backlogDesc, backlogPriority, backlogStoryPoint, backlogBusinessValue,backlogVersion,backlogCreator,callback){
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
				backlogBusinessValue:backlogBusinessValue,
				backlogVersion: backlogVersion,
				dateCreated : moment().format('YYYY-MM-DD HH:mm:ss'),
				dateModified : moment().format('YYYY-MM-DD HH:mm:ss'),
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