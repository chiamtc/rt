'use strict';
angular.module('login')

.controller('LoginController',['$scope','$cookies','$location','LoginService','$http', '$timeout', 
	function($scope,$cookies,$location, LoginService, $http, $timeout ){
		/** fancy starts **/
		NProgress.start();
		NProgress.done();
		
		/** UI bindings **/
		$scope.btnLogin= "Login Here";
		$scope.loginResponse =false;
		
		/** UI function(s) **/
		$scope.login = function(){
			$scope.btnLogin="Logging in..";
			LoginService.Login($scope.loginEmail, $scope.loginPassword, function(response){
				NProgress.set(0.5);
				
				$scope.loginResponse = !$scope.loginResponse;
				switch(response.success)
				{
					case 0:
						$scope.loginResponseClass= "alert alert-danger alert-dismissible";
						$scope.loginMessage ="Sorry, incorrect username or password.";
						$timeout(function(){
							$scope.btnLogin= "Login";
							$scope.loginResponse = !$scope.loginResponse;
						},2000);
					break;
					
					case 1:
						
						$scope.loginResponseClass= "alert alert-success";
						$scope.loginMessage ="Redirecting to home page..";
						$timeout(function(){
							$location.path('/home');
						},1000);
					break;
					
					case 2:
						$scope.loginResponseClass= "alert alert-danger alert-dismissible";
						$scope.loginMessage ="Sorry, user not found!";
						$timeout(function(){
							$scope.btnLogin= "Login";
							$scope.loginResponse = !$scope.loginResponse;
						},2000);
					break;
					
					case 3:
						$scope.loginResponseClass= "alert alert-danger alert-dismissible";
						$scope.loginMessage ="Sorry, Empty field(s) detected!";
						$timeout(function(){
							$scope.btnLogin= "Login";
							$scope.loginResponse = !$scope.loginResponse;
						},2000);
					break;
					
					default:
					break;
				}
				NProgress.done();
			});
		};
		
		/** ends **/
}]);

