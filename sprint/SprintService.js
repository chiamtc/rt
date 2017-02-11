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
			callback(response.data);
			
		});
	}
	
	factory.updateSprint = function(){
		$http({
			method: 'POST',
			url: 'php/sprint/updateSprint.php',
			data:{
				
			},
			headers: {'Content-Type':'application/json'}
		}).then(function(response){
			
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
			callback(response.data);
		});
	}
	
	return factory;
}]);