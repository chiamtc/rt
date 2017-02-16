'use strict';
angular.module('sidebar')

.controller('SidebarController',['$scope','$timeout','$routeParams','SidebarService','$location',function($scope, $timeout, $routeParams,SidebarService, $location){
	
	$scope.pathParams =$routeParams.projectKey + "/"+ $routeParams.projectName;
	$scope.inviteResponse= false;
	$scope.toggleNav = true;
	/** UI functions **/
	$scope.isCurrent = function (viewLocation) {
    if(viewLocation === $location.path()){
		return "current";
	}
    return "";
	};
	
	$scope.controlNavSize = function(){
		return !$scope.toggleNav;
	}
	
	$scope.inviteMember = function(){
		SidebarService.InviteMember($scope.memberEmail, function(response){
			NProgress.start();
			NProgress.set(0.5);
			NProgress.done();
			$scope.inviteResponse = !$scope.inviteResponse;
			switch(response.success){
				case 0:
					$scope.inviteResponseClass ="alert alert-danger";
					$scope.inviteResponseMessage = "You can't invite yourself!";
				break;
				case 1:
					$scope.inviteResponseClass ="alert alert-success";
					$scope.inviteResponseMessage = "User invited!";
					$timeout(function(){
						$('#inviteModal').modal('toggle');
					},1000);
				break;
				case 2:
					$scope.inviteResponseClass ="alert alert-danger";
					$scope.inviteResponseMessage = "No such user found!";
				break;
				case 3:
					$scope.inviteResponseClass ="alert alert-danger";
					$scope.inviteResponseMessage = "Empty field or invalid email";
				break;
			}
			console.log(response);
			
		});
	};
}])
	
.directive('sideBar',function(){
	return{
		templateUrl:"sidebar/sidebar.html",
		controller:"SidebarController",
	};
});