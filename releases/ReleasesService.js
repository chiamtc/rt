'use strict';

angular.module('releases')

.factory('ReleasesService', ['$http','$routeParams',function($http, $routeParams){
	var factory = {};
	
	factory.CreateRelease = function(releaseName, releaseDesc, releaseStartDate, releaseEndDate,callback){
		$http({
			method : "POST",
			url:"php/releases/createRelease.php",
			data:{
				releaseName : releaseName,
				releaseDesc : releaseDesc,
				releaseStartDate : releaseStartDate,
				releaseEndDate  : releaseEndDate,
				projectKey: $routeParams.projectKey,
			},
			headers :{ 'Content-Type' : 'application/json' }
		}).then(function(response){
			callback(response.data);
		});
	}

	factory.GetReleases = function(callback){
		$http({
			method : "POST",
			url:"php/releases/getReleases.php",
			data:{
				projectKey: $routeParams.projectKey,
			},
			headers :{ 'Content-Type' : 'application/json' }
		}).then(function(response){
			callback(response.data);
		});
	}
	
	factory.DeleteRelease = function(releaseId,callback){
		$http({
			method : "POST",
			url:"php/releases/deleteRelease.php",
			data:{
				releaseId: releaseId,
			},
			headers :{ 'Content-Type' : 'application/json' }
		}).then(function(response){
			callback(response.data);
		});
	}
	
	return factory;
}]);