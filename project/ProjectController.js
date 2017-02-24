'use strict';
angular.module('project')

.controller('ProjectController', ['$scope','$cookies','$routeParams','ProjectService',function($scope,$cookies, $routeParams, ProjectService){
	$scope.colSize = false;
	$scope.userLists = [];

	$scope.close = function(){
		$scope.colSize = false;
	}
	
	
	$scope.calculateStyle= function(retrieved){
		var bPVal = retrieved.backlogPriority;
		if(bPVal == "Highest"){
			return {
				'border-left':'5px solid red'
			}
		}else if(bPVal == "High"){
			return {
				'border-left':"5px solid #ff8000"
			}
		}else if(bPVal == "Medium"){
			return{
				'border-left':"5px solid #ffff1a"
			}
		}else if(bPVal == "Low"){
			return{
				'border-left':'5px solid green'
			}
		}
	}
	
	ProjectService.ListUsers($routeParams.projectKey, function(response){
		switch(response.success){
			case 0:
				$scope.userLists = [];
			break;
			
			case 1:
				$scope.userLists = response.users;
			break;
		}
	});
	
	$scope.labelling = function(tasksStatus){
		var labelStatus = tasksStatus;
		if(labelStatus =='To-do'){
			return 'label label-info';
			
		}else if(labelStatus == 'In-Progress'){
			return 'label label-warning';
		}else if(labelStatus == 'Done'){
			return 'label label-success';
		}
	}
	
	$scope.taskLabelling = function(tasksStatus){
		var labelStatus = tasksStatus;
		if(labelStatus =='Done'){
			return {'text-decoration':'line-through'}
		}else{
			return {'text-decoration':'none'}
		}
	}
	
}]);