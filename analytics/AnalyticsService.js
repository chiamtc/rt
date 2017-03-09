'use strict';

angular.module('analytics')

.factory('AnalyticsService', ['$http','$cookies','$routeParams',function($http,$cookies, $routeParams){
	var factory = {};
	
	factory.UpdateBurnDown = function(sprintId,backlogBV,backlogSP){
		$http({
			method: 'POST',
			url: 'php/analytics/updateBurndownReport.php',
			data:{
				sprintId: sprintId,
				backlogBV: backlogBV,
				eachDay : moment().format('YYYY-MM-DD'),
				backlogSP: backlogSP,
			},
			headers: {'Content-Type':'application/json'}
		}).then(function(response){
			console.log(response.data);
		});
	}
	
	factory.StartBurnDown = function(sprintId,sprintStartDate, backlogSP,backlogBV){
		$http({
			method: 'POST',
			url: 'php/analytics/startBurndownReport.php',
			data:{
				sprintId: sprintId,
				backlogBV: backlogBV,
				eachDay : sprintStartDate,
				backlogSP: backlogSP,
			},
			headers: {'Content-Type':'application/json'}
		}).then(function(response){
			console.log(response.data);
		});
	}
	
	factory.GetBurnDown = function(callback){
		$http({
			method: 'POST',
			url: 'php/analytics/getBurndownReport.php',
			data:{
				projectKey : $routeParams.projectKey,
			},
			headers: {'Content-Type':'application/json'}
		}).then(function(response){
			callback(response.data);
		});
	}
	
	return factory;
}])