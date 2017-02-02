angular.module('header')

.controller('HeaderController',['LoginService','$cookies','$scope','$location', function(LoginService, $cookies,$scope, $location){
	/** UI binding **/
	$scope.userEmail = $cookies.get('email');
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
.directive('homeHeader', function(){
	return{
		templateUrl:"header/header.html",
		controller:"HeaderController"
	};
	
})


