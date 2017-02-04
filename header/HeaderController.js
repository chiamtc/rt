angular.module('header')

.controller('HeaderController',['LoginService','$routeParams','$cookies','$scope','$location', function(LoginService, $routeParams, $cookies,$scope, $location){
	/** UI binding **/
	$scope.userEmail = $cookies.get('email');
	$scope.headerProjectName = $routeParams.projectName;
	$scope.pathParams ="/project/"+ $routeParams.projectKey + "/"+ $routeParams.projectName;
	$scope.currentPath = $location.path() == $scope.pathParams;
	if($cookies.get('uid') == null){
		$location.path('/');
	}
	
	/** UI functions **/
	$scope.isActive = function (viewLocation) {
    if(viewLocation === $location.path()){
		return "active";
	}
    return "";
	};
	
	$scope.logout = function(){
		LoginService.ClearCredentials();
	}
	
	/**ends **/
}])

/** header directive **/
.directive('projectHeader', function(){
	return{
		templateUrl:"header/header.html",
		controller:"HeaderController"
	};
	
})


