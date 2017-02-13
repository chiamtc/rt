'use strict';
angular.module('sidebar')

.controller('SidebarController',['$scope','$routeParams','SidebarService','$location',function($scope,$routeParams,SidebarService, $location){
	
	$scope.pathParams =$routeParams.projectKey + "/"+ $routeParams.projectName;
	$scope.inviteResponse= false;
	$scope.menus = 
	{
		"items":[
			{"item":"Backlog","icon":"glyphicon glyphicon-list", "ahref":"/project/"+$scope.pathParams,"href":"#/project/"+$scope.pathParams},
			{"item":"Sprints","icon":"glyphicon glyphicon-tasks", "ahref":"#/tasks","href":"#/home"},
			{"item":"Issues","icon":"glyphicon glyphicon-flag","ahref":"#/tasks", "href":"#/tasks"},
			{"item":"Analytics","icon":"glyphicon glyphicon-stats", "ahref":"#/tasks","href":"#/tasks"},
			{"item":"Invite Member","icon":"glyphicon glyphicon-user", "ahref":""},
			{"item":"Project Settings","icon":"glyphicon glyphicon-wrench", "ahref":"#/tasks","href":"#/tasks"}
		]
	};
	
	/** UI functions **/
	$scope.isCurrent = function (viewLocation) {
    if(viewLocation === $location.path()){
		return "current";
	}
    return "";
	};
	
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