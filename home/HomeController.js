'use strict';
angular.module('home')

.controller('HomeController',['HomeService','$filter','$cookies','$scope','$location', function(HomeService,$filter, $cookies, $scope, $location){
	
	$scope.checkResponse = false;
	$scope.createResponse = false;
	
	$scope.clearKey = false;
	var userProjectKey = false;
	/** fancy starts **/
		NProgress.start();
		NProgress.done();
	$scope.records = [
        "Alfreds Futterkiste",
        "Berglunds snabbköp",
        "Centro comercial Moctezuma",
        "Ernst Handel",
    ]
	
	/** uppercase the project key field **/
	$scope.$watch('projectKey', function(val) {
		$scope.projectKey = $filter('uppercase')(val);
	}, true);
	
	$scope.checkProjectKey = function(){
		HomeService.CheckProjectKey($scope.projectKey,function(response){
			
			switch(response.success){
				case 0:
					$scope.checkResponse = !$scope.checkResponse;
					$scope.checkResponseClass ="alert alert-warning";
					$scope.checkMessage = "Project key is used";
					
				break;
				
				case 1:
					$scope.clearKey = !$scope.clearKey;
					userProjectKey = !userProjectKey;
				break;
				default:
				break;
			}
		});
		!$scope.clearKey;
	};
	
	$scope.createProject = function(){
		if(userProjectKey){
			HomeService.CreateProject($scope.projectCreateName, $scope.projectCreateDesc, $scope.projectKey, function(response){
					NProgress.set(0.5);
					
					$scope.createResponse = !$scope.createResponse;
					switch(response.success){
						case 0:
							$scope.createResponseClass ="alert alert-warning";
							$scope.createResponseMessage = "Server Error";
						break;
						
						case 1:
							$scope.createResponseClass ="alert alert-success";
							$scope.createResponseMessage = "Project Created. Redirecting..";
						break;
						
						case 2:
							$scope.createResponseClass ="alert alert-warning";
							$scope.createResponseMessage = "Project key is used";
						break;
						case 3:
							$scope.createResponseClass ="alert alert-warning";
							$scope.createResponseMessage = "Server Error 2";
						break;
						default:
							$scope.createResponseClass ="alert alert-warning";
							$scope.createResponseMessage = "Empty field(s) detected";
						break;
					}
			});
		}else{
			$scope.createResponseClass ="alert alert-warning";
			$scope.createResponseMessage = "Project key is used";
		}
		NProgress.done();
	};
	
	
	
	/**ends **/
}])

/**.controller('homeProjectCtrl',['$scope',function($scope){
	$scope.display1= "from another controller";
	$scope.createProject= function(){
		$scope.display1 = "hello from modal";
	};
}])**/

