'use strict';

angular.module('project')

.factory('ProjectService', ['$http','$cookies','$routeParams',function($http,$cookies, $routeParams){
	var factory = {};
	
	factory.ListUsers = function(projectKey, callback){
		$http({
			method : 'POST',
			url : 'php/project/getListUsers.php',
			data:{
				projectKey : projectKey,
			},
			headers: {'Content-Type':'application/json'}
		}).then(function(response){
			callback(response.data);
		});
	}
	return factory;
}])