'use strict';
angular.module('project')

.controller('ProjectController', ['$scope','$cookies','$routeParams',function($scope, $cookies, $routeParams){
	//var self = this;

	$scope.thisParam = $routeParams.projectKey;
	
}]);