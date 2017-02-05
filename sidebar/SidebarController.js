'use strict';
angular.module('sidebar')

.controller('SidebarController',['$scope','$routeParams','$location',function($scope,$routeParams,$location){
	
	$scope.pathParams =$routeParams.projectKey + "/"+ $routeParams.projectName;
	
	$scope.menus = 
	{
		"items":[
			{"item":"Backlog","icon":"glyphicon glyphicon-list", "ahref":"/project/"+$scope.pathParams,"href":"#/project/"+$scope.pathParams},
			{"item":"Sprints","icon":"glyphicon glyphicon-tasks", "ahref":"#/tasks","href":"#/home"},
			{"item":"Issues","icon":"glyphicon glyphicon-flag","ahref":"#/tasks", "href":"#/tasks"},
			{"item":"Analytics","icon":"glyphicon glyphicon-stats", "ahref":"#/tasks","href":"#/tasks"},
			{"item":"Invite Member","icon":"glyphicon glyphicon-user", "ahref":"#/tasks","href":"#/tasks"},
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
	
	
}])

.directive('sideBar',function(){
	return{
		templateUrl:"sidebar/sidebar.html",
		controller:"SidebarController",
	};
});