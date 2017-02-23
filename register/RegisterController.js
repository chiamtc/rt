'use strict';
angular.module('register')

.controller('RegisterController', ['$scope','$location','RegisterService','$timeout','$http', 
	function($scope, $location,RegisterService, $timeout,$http){
		/** fancy starts **/
		NProgress.start();
		NProgress.done();
		
		/** UI binding **/
		$scope.registerResponse = false;
		$scope.btnRegister="Create an account";
		
		/** UI functions(s) **/
		$scope.register= function(){
			$scope.btnRegister="Creating account...";
			RegisterService.Register($scope.registerEmail, $scope.registerPassword, $scope.registerConfPassword,function(response){
				$scope.registerResponse = !$scope.registerResponse;
				switch(response.success)
				{
					case 1:
						$scope.registerResponseClass= "alert alert-success";
						$scope.registerMessage ="You just opened an account!";
						$timeout(function(){
							$scope.btnRegister = "Redirecting to login page..";
							$location.path('/');
						},2000);
					break;
					
					case 0:
						$scope.registerResponseClass= "alert alert-danger alert-dismissible";
						$scope.registerMessage ="Sorry, internal server errors!";
						$timeout(function(){
							$scope.btnRegister="Create an account";
							$scope.registerResponse = !$scope.registerResponse;
						},2000);
					break;
					
					case 2:
						$scope.registerResponseClass= "alert alert-danger alert-dismissible";
						$scope.registerMessage ="Sorry, your password isn't matched!";
						$timeout(function(){
							$scope.btnRegister="Create an account";
							$scope.registerResponse = !$scope.registerResponse;
						},2000);
					break;
					
					case 3:
						$scope.registerResponseClass= "alert alert-danger alert-dismissible";
						$scope.registerMessage ="Sorry, the email is in used!";
						$timeout(function(){
							$scope.btnRegister="Create an account";
							$scope.registerResponse = !$scope.registerResponse;
						},2000);
					break;
					
					case 4:
						$scope.registerResponseClass= "alert alert-danger alert-dismissible";
						$scope.registerMessage ="Sorry, empty fields!";
						$timeout(function(){
							$scope.btnRegister="Create an account";
							$scope.registerResponse = !$scope.registerResponse;
						},2000);
					break;
					
					default:
					break;
				}
			});
			$scope.btnRegister = "Create an account";
		};
		
		
		/** ends **/
}]);