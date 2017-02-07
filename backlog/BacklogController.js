'use strict';
angular.module('backlog')

.controller('BacklogController', ['$scope','$timeout','BacklogService', function($scope, $timeout, BacklogService){
	
	/** fancy starts **/
	NProgress.start();
	NProgress.done();
	
	/** UI bindings **/
	$scope.createBacklogResponse = false;
	$scope.backlogLists = [];
	$scope.backlogCounts = 0;
	$scope.list2 = [];
	console.log($scope.list2);
	$scope.backlogCreateTypes=[
		{typeName: 'User Story', type: 'User Story',icon:'glyphicon glyphicon-plus'},
		{typeName: 'Issues', type: 'Issues',icon:'glyphicon glyphicon-user'},
		{typeName: 'Tasks', type: 'Tasks',icon:'glyphicon glyphicon-euro'},
	];
	
	
	$scope.backlogPriorities=[
		{name: 'Highest', type: 'Highest'},
		{name: 'High', type: 'High'},
		{name: 'Medium', type: 'Medium'},
		{name: 'Low', type: 'Low'},
		{name: 'Lowest', type: 'Lowest'},
	];
	
	/** UI function(s) **/
	
	BacklogService.ListBacklogs(function(response){
		if(response.backlogs == null){
			$scope.backlogLists = [];
			$scope.backlogListClass = "backlogListEmpty";
		}else{
			$scope.backlogListClass ="backlogLists";
			$scope.backlogLists= response.backlogs;
			$scope.backlogCounts = $scope.backlogLists.length;
		}
		
	});
	
	$scope.startCallback = function(event, ui, title) {
    console.log('You started draggin: ' + title.backlogTitle);
    $scope.draggedTitle = title.backlogTitle;
  };

  $scope.dropCallback = function(event, ui) {
    console.log('hey, you dumped me :-(' , $scope.draggedTitle);
	BacklogService.SendUp($scope.draggedTitle,function(response){
		console.log(response.message);
	});
	console.log($scope.list2);
  };

 
	
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