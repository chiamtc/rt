'use strict';

angular.module('sidebar')

.factory('SidebarService', ['$http','$routeParams',function($http, $routeParams){
	var factory = {};
	
	factory.InviteMember = function(email, callback){
		$http({
			method : "POST",
			url: 'php/sidebar/inviteMember.php',
			data:{
				email: email,
				projectKey : $routeParams.projectKey,
			},
			headers: { 'Content-Type': 'application/json'}
		}).then(function(response){
			console.log(response.data);
			callback(response.data);
		});
	};
	return factory;
}])