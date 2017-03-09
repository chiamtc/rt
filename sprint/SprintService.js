'use strict';

angular.module('sprint')

.factory('SprintService', ['$http','$routeParams','AnalyticsService',function($http, $routeParams,AnalyticsService){
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
			var backlogTPoint = 0.0;
			var backlogTBV = 0.0;
			angular.forEach(response.data.sprints, function(value, key){
				
				angular.forEach(value.backlogs, function(v,k){
					v.dateCreated = moment(v.dateCreated).fromNow();
					v.dateModified = moment(v.dateModified).fromNow();
					
				});
			});
			console.log(response.data);
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
			console.log(response.data);
			callback(response.data);
		});
	}
	
	factory.StartSprint = function(sprint,callback){
		$http({
			method: 'POST',
			url: 'php/sprint/startSprint.php',
			data:{
				sprintId: sprint.sprintId,
				
				projectKey : $routeParams.projectKey,
			},
			headers: {'Content-Type':'application/json'}
		}).then(function(response){
			
			AnalyticsService.StartBurnDown(sprint.sprintId, sprint.sprintStartDate,sprint.backlogTotalSP, sprint.backlogTotalBV);
			
			callback(response.data);
		});
	}
	
	factory.UpdateSprint = function(sprintId, backlog,oldSprintId,callback){
		$http({
			method: 'POST',
			url: 'php/sprint/updateSprint.php',
			data:{
				sprintId: sprintId,
				oldSprintId: oldSprintId,
				backlogId : backlog.backlogId,
				dateModified : moment().format('YYYY-MM-DD HH:mm:ss'),
				backlogStatus : backlog.backlogStatus,
				backlogTotalSP : backlog.backlogStoryPoint,
				backlogTotalBV : backlog.backlogBusinessValue,
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
			console.log(response.data);
			callback(response.data);
		});
	}
	
	factory.UpdateActiveSprint = function(sprintId, backlog, oldSprintId, callback){
		$http({
			method: 'POST',
			url: 'php/sprint/updateActiveSprint.php',
			data:{
				sprintId: sprintId,
				oldSprintId: oldSprintId,
				backlogId : backlog.backlogId,
				backlogStatus:backlog.backlogStatus,
				dateModified : moment().format('YYYY-MM-DD HH:mm:ss'),
				backlogTotalSP : backlog.backlogStoryPoint,
				backlogTotalBV : backlog.backlogBusinessValue,
				projectKey : $routeParams.projectKey,
			},
			headers: {'Content-Type':'application/json'}
		}).then(function(response){
			angular.forEach(response.data.activeSprints, function(value, key){
				angular.forEach(value.backlogs, function(v,k){
					v.dateCreated = moment(v.dateCreated).fromNow();
					v.dateModified = moment(v.dateModified).fromNow();
				});
			});
			
			/* $http({
				method: 'POST',
				url: 'php/analytics/updateBurndownReport.php',
				data:{
					sprintId: sprintId,
					backlogTotalSP : backlog.backlogStoryPoint,
					backlogTotalBV : backlog.backlogBusinessValue,
					eachDay : moment().format('YYYY-MM-DD'),
					type: 'sprint',
				},
				headers: {'Content-Type':'application/json'}
			}).then(function(response){
				console.log(response.data);
			}); */
			console.log(response.data);
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