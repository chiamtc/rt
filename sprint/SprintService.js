'use strict';

angular.module('sprint')

.factory('SprintService', ['$http','$routeParams',function($http, $routeParams){
	var factory = {};
	
	factory.ListSprints= function(callback){
		$http({
			method: 'POST',
			url : 'php/sprint/getSprints.php',
			data:{
				projectKey : $routeParams.projectKey,
			},
			headers : { 'Content-Type' : 'application/json'}
		}).then(function(response){
			
			angular.forEach(response.data.sprints, function(value, key){
				angular.forEach(value.backlogs, function(v,k){
					v.dateCreated = moment(v.dateCreated).fromNow();
					v.dateModified = moment(v.dateModified).fromNow();
				});
			});
			callback(response.data);
		});
	}
	
	factory.ListActiveSprints= function(callback){
		$http({
			method: 'POST',
			url : 'php/sprint/getActiveSprint.php',
			data:{
				projectKey : $routeParams.projectKey,
			},
			headers : { 'Content-Type' : 'application/json'}
		}).then(function(response){
			
			angular.forEach(response.data.activeSprints, function(value, key){
				angular.forEach(value.backlogs, function(v,k){
					v.dateCreated = moment(v.dateCreated).fromNow();
					v.dateModified = moment(v.dateModified).fromNow();
				});
			});
			callback(response.data);
		});
	}
	
	factory.StartSprint = function(sprintId, callback){
		$http({
			method: 'POST',
			url: 'php/sprint/startSprint.php',
			data:{
				sprintId: sprintId,
				projectKey : $routeParams.projectKey,
			},
			headers: {'Content-Type':'application/json'}
		}).then(function(response){
			callback(response.data);
		});
	}
	
	factory.UpdateSprint = function(sprintId, backlogId,callback){
		$http({
			method: 'POST',
			url: 'php/sprint/updateSprint.php',
			data:{
				sprintId: sprintId,
				backlogId : backlogId,
				dateModified : moment().format(),
				projectKey : $routeParams.projectKey,
			},
			headers: {'Content-Type':'application/json'}
		}).then(function(response){
			angular.forEach(response.data.sprints, function(value, key){
				angular.forEach(value.backlogs, function(v,k){
					v.dateCreated = moment(v.dateCreated).fromNow();
					v.dateModified = moment(v.dateModified).fromNow();
				});
			});
			callback(response.data);
		});
	}
	
	factory.UpdateSprintDetails = function(sprintId, sprintGoal, sprintStartDate, sprintEndDate,callback){
		$http({
			method: 'POST',
			url: 'php/sprint/updateSprintDetails.php',
			data:{
				sprintId: sprintId,
				sprintGoal : sprintGoal,
				sprintStartDate : sprintStartDate,
				sprintEndDate : sprintEndDate,
				projectKey : $routeParams.projectKey,
			},
			headers: {'Content-Type':'application/json'}
		}).then(function(response){
			//console.log(response.data);
			callback(response.data);
		});
	}
	
	factory.DeleteSprint = function(sprintId,callback){
		$http({
			method: 'POST',
			url: 'php/sprint/deleteSprint.php',
			data:{
				sprintId: sprintId,
				projectKey : $routeParams.projectKey,
			},
			headers: {'Content-Type':'application/json'}
		}).then(function(response){
			console.log(response.data);
			callback(response.data);
		});
	}
	
	factory.CreateSprint = function(sprintGoal, sprintStartDate, sprintEndDate,callback){
		$http({
			method : 'POST',
			url : 'php/sprint/createSprint.php',
			data:{
				sprintGoal : sprintGoal,
				sprintStartDate : sprintStartDate,
				sprintEndDate : sprintEndDate,
				projectKey : $routeParams.projectKey,
			},
			headers : { 'Content-Type' : 'application/json' }
		}).then(function(response){
			console.log(response.data);
			callback(response.data);
		});
	}
	
	return factory;
}]);