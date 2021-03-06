'use strict';
angular.module('home')

.controller('HomeController',['HomeService','$filter','$timeout','$cookies','$scope','$location', function(HomeService,$filter,$timeout ,$cookies, $scope, $location){
	/** UI bindings **/
	$scope.checkResponse = false;
	$scope.createResponse = false;
	$scope.projectListResponse = false;
	$scope.clearKey = false;
	$scope.projectLists = [];
	
	
	/** fancy starts **/
		NProgress.start();
		NProgress.done();
	
	HomeService.ListProjects(function(response){
		switch(response.success){
			case 0:
				$scope.projectListResponse = !$scope.projectListResponse;
				$scope.projectListResponseClass ="alert alert-info";
				$scope.projectListResponseMessage = "no projects found :( ";
			break;
			case 1:
				$scope.projectLists = response.projects;
			break;
			default:
			break;
		}
	});
	
	/** uppercase the project key field **/
	$scope.$watch('projectKey', function(val) {
		$scope.projectKey = $filter('uppercase')(val);
	}, true);
	
	/** UI function(s) **/
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
				break;
				default:
				
				break;
			}
		});
	};
	
	$scope.createProject = function(){
		NProgress.set(0.5);
		
			HomeService.CreateProject($scope.projectCreateName, $scope.projectCreateDesc, $scope.projectKey, function(response){
			$scope.createResponse = !$scope.createResponse;
				switch(response.success){
					case 0:
						$scope.createResponseClass ="alert alert-danger";
						$scope.createResponseMessage = "Server Error";
					break;
						
					case 1:
						$scope.createResponseClass ="alert alert-success";
						$scope.createResponseMessage = "Project Created.";
						$scope.projectLists.push(response.project[0]);
						console.log($scope.projectLists);
						$timeout(function(){
							$('#projectCreateModal').modal('toggle');
							$scope.checkResponse = !$scope.checkResponse;
							$scope.createResponse = !$scope.createResponse;
							$('#projectCreateModal').find('form').trigger('reset');
						},1500);
					break;
						
					case 2:
						$scope.createResponseClass ="alert alert-danger";
						$scope.createResponseMessage = "Project key is used";
						$timeout(function(){
							$scope.createResponse = !$scope.createResponse;
						},1500);
					break;
					case 3:
						$scope.createResponseClass ="alert alert-danger";
						$scope.createResponseMessage = "Server Error 2";
					break;
					default:
						$scope.createResponseClass ="alert alert-danger";
						$scope.createResponseMessage = "Empty field(s) detected";
						$timeout(function(){
							$scope.createResponse = !$scope.createResponse;
						},1500);
					break;
				}
			});
		
		NProgress.done();
	};
	/**ends **/
}])

