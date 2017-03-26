'use strict';

angular.module('works')

.factory('WorksService',['$http','$cookies',function($http,$cookies){
	var factory={};
	
	factory.GetPersonalWorks= function(callback){
		$http({
			method : 'POST',
			url : 'php/works/getPersonalWorks.php',
			data:{
				personalId : $cookies.get('uid'),
				personalEmail : $cookies.get('email'),
			},
			headers: {'Content-Type':'application/json'}
		}).then(function(response){
			console.log(response.data);
			callback(response.data);
		});
	}
	
	factory.FindTask= function(taskId, callback){
		$http({
			method : 'POST',
			url : 'php/works/findTask.php',
			data:{
				taskId : taskId,
			},
			headers: {'Content-Type':'application/json'}
		}).then(function(response){
			response.data.tasks[0].dateCreated = moment(response.data.tasks[0].dateCreated).fromNow();
			response.data.tasks[0].dateModified = moment(response.data.tasks[0].dateModified).fromNow();
			console.log(response.data.tasks[0]);
			callback(response.data.tasks[0]);
		});
	}
	
	return factory;
}]);