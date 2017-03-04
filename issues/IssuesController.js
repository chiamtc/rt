'use strict';
angular.module('issues')

.controller('IssuesController', ['$scope', '$routeParams','$timeout','ActiveSprintService' ,'BacklogService','SprintService', function($scope, $routeParams,$timeout,ActiveSprintService,BacklogService, SprintService){

	/** fancy starts **/
    NProgress.start();
	NProgress.done();
	
	/** UI binding(s)**/
	
	
	/** UI function(s) **/
	$scope.backlogCreateTypes=[
		{typeName: 'User Story', type: 'User Story',icon:'glyphicon glyphicon-plus'},
		{typeName: 'Issues', type: 'Issues',icon:'glyphicon glyphicon-user'},
		{typeName: 'Tasks', type: 'Tasks',icon:'glyphicon glyphicon-euro'},
	];
	
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
}])

.directive('sideIssues',function(){
	return{
		templateUrl : 'side-issues/side-issues.html',
		controller: 'SideIssuesController',
	};
})

.directive('mainIssues',function(){
	return{
		templateUrl : 'main-issues/main-issues.html',
		controller: 'MainIssuesController',
	};
<<<<<<< HEAD
})

.directive('sideTaskIssues',function(){
	return{
		templateUrl : 'side-task-issues/side-task-issues.html',
		controller: 'SideTaskIssuesController',
	};
=======
>>>>>>> 63b08976d6018f6431705f547af9a9a690221b69
});