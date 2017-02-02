'use strict';

angular.module('login')

.factory('LoginService', [ '$rootScope', '$location','$cookies','$http',function($rootScope, $location, $cookies, $http){
	 
	var factory = {};
	
	factory.Login = function(email, password,callback){
		$http({
			method:"POST",
			url:"php/login/getUser.php",
			data:{
				email: email,
				password:password,
			},
			headers: { 'Content-Type': 'application/json' }
		}).then(function(response){
			console.log(response.data.success);
			//console.log($cookieStore.get('email'));
			callback(response.data);
		});
	};
	
	factory.ClearCredentials = function(){
		$cookies.remove('uid');
		$cookies.remove('email');
		$http({
			method:"POST",
			url:"php/login/removeUser.php",
			data:{
				email: $cookies.get('email'),
				
			},
			headers: { 'Content-Type': 'application/json' }
		}).then(function(response){
			console.log(response.data);
		});
		$location.path('/');		
	}
	return factory;
}])