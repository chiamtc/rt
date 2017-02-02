'use strict';

angular.module('home')

.factory('HomeService', [ '$http',function($http){
	 
	var factory = {};
	
	factory.CreateProject = function(projectName, projectDesc, projectKey, callback){
		$http({
			method:"POST",
			url:"php/home/createProject.php",
			data:{
				projectName : projectName,
				projectDesc : projectDesc,
				projectKey: projectKey,
			},
			headers: { 'Content-Type' : 'application/json' }
		}).then(function(response){
			console.log(response.data.success);
			callback(response.data);
		}); //end then
	}; //end createproject factory 
	
	factory.CheckProjectKey = function(projectKey,callback){
		$http({
			method:"POST",
			url:"php/home/checkProjectKey.php",
			data:{
				projectKey: projectKey,
			},
			headers: { 'Content-Type' : 'application/json' }
		}).then(function(response){
			callback(response.data);
		}); //end of then
	}; //end of checkprojectkey factory
	
	return factory;
}])