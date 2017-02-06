'use strict';
angular.module('backlog')

.controller('BacklogController', ['$scope','$timeout','BacklogService', function($scope, $timeout, BacklogService){
	
	/** fancy starts **/
	NProgress.start();
	NProgress.done();
	
	/** UI bindings **/
	$scope.createBacklogResponse = false;
	$scope.backlogLists = [];
	
	$scope.list2 = [];
	$scope.backlogCreateTypes=[
		{typeName: 'User Story', type: 'user_story',icon:'glyphicon glyphicon-plus'},
		{typeName: 'Issues', type: 'issues',icon:'glyphicon glyphicon-user'},
		{typeName: 'Tasks', type: 'tasks',icon:'glyphicon glyphicon-euro'},
	];
	
	
	$scope.backlogPriorities=[
		{name: 'Highest', type: 'highest'},
		{name: 'High', type: 'high'},
		{name: 'Medium', type: 'medium'},
		{name: 'Low', type: 'low'},
		{name: 'Lowest', type: 'lowest'},
	];
	
	/** UI function(s) **/
	
	BacklogService.ListBacklogs(function(response){
		console.log(response.backlogs);
		$scope.backlogLists= response.backlogs;
		
	});
	
	$scope.createBacklog= function(){
		NProgress.set(0.5);
		BacklogService.CreateBacklog($scope.backlogCreateName,$scope.backlogCreateType.type,$scope.backlogCreateDesc,$scope.backlogCreatePriority.type, $scope.userEmail, function(response){
			
			$scope.createBacklogResponse = !$scope.createBacklogResponse;
			
			switch(response.success){
				case 0:
					$scope.createResponseClass ="alert alert-warning";
					$scope.createResponseMessage = "Server Error";
				break;
				
				case 1:
					$scope.createBacklogResponseClass ="alert alert-success";
					$scope.createBacklogResponseMessage = "Backlog Created.";
					//console.log('/project/' + response.project[0].projectKey +'/'+ response.project[0].projectName);
					$scope.backlogLists.push(response.backlog[0]);
					console.log(response);
					$timeout(function(){
							$('#backlogCreateModal').modal('toggle');
					},1500);
				break;
				
				case 2:
					$scope.createResponseClass ="alert alert-warning";
					$scope.createResponseMessage = "Server error 2";
				break;
				
				default:
					$scope.createResponseClass ="alert alert-warning";
					$scope.createResponseMessage = "Empty field(s) detected";
				break;
				
			}
		});
		NProgress.done();
	};
	
}])

.directive('productBacklog',function(){
	return{
		templateUrl : 'backlog/backlog.html',
		controller: 'BacklogController',
	};
});