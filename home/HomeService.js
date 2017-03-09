'use strict';

angular.module('home')

.factory('HomeService', ['$http',function($http){
	 
	var factory = {};
	
	factory.CreateProject = function(projectName, projectDesc, projectKey, callback){
		$http({
			method:"POST",
			url:"php/home/createProject.php",
			data:{
				projectName : projectName,
				projectDesc : projectDesc,
				projectKey: projectKey,
				dateCreated: moment().format('YYYY-MM-DD HH:mm:ss'),
			},
			headers: { 'Content-Type' : 'application/json' }
		}).then(function(response){
			angular.forEach(response.data.project, function(value, key){
				value.dateCreated = moment(value.dateCreated).format("D MMMM YYYY");
			});
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
	
	factory.ListProjects = function(callback){
		$http({
			method : 'POST',
			url: 'php/home/getProjects.php',
			headers : { 'Content-Type' : 'application/json' }
		}).then(function(response){
			angular.forEach(response.data.projects, function(value, key){
				value.dateCreated = moment(value.dateCreated).format("D MMMM YYYY");
				
			});
			callback(response.data);
		});
	}
	return factory;
}])

/** note to myself
	callback function for array = response.data.projects
	but in controller callback function -> function(response) uses response.projects
**/