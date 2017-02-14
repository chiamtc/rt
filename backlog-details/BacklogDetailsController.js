'use strict';
angular.module('backlog-details')

.controller('BacklogDetailsController', ['$scope','$timeout','BacklogDetailsService','SprintService','BacklogService', function($scope, $timeout,BacklogDetailsService,SprintService,  BacklogService){
	
	/** fancy starts **/
	NProgress.start();
	NProgress.done();
	
	/** UI bindings **/
	$scope.passBacklog = [];
	$scope.commentLists = [];
	
	/** UI functions **/
	
	$scope.toggle = function(backlog){
		$scope.colSize = true;
		$scope.passBacklog = backlog;
		$scope.backlogDDesc = $scope.passBacklog.backlogDesc;
		
		BacklogDetailsService.ListComment($scope.passBacklog.backlogId,function(response){
		switch(response.success){
			case 0:
				$scope.commentLists = response.comments;
			break;
			case 1:
				$scope.commentLists = response.comments;
			break;
			case 2:
			break;
		}
	});
	}
	
	$scope.tested= function(){
		console.log($scope.backlogDPriority);
	}
	
	$scope.testedd= function(){
		console.log($scope.backlogDDesc);
	}
	
	
	
	$scope.comment= function(){
		console.log($scope.passBacklog.backlogId + " "+ $scope.userEmail);
		BacklogDetailsService.SubmitComment($scope.backlogDComment,$scope.passBacklog.backlogId, function(response){
			switch(response.success){
				case 0:
				break;
				
				case 1:
					$scope.commentLists.push(response.comment[0]);
					console.log($scope.commentLists);
				break;
			}
		});
	}
	
}])

.directive('backlogDetails',function(){
	return{
		templateUrl : 'backlog-details/backlog-details.html',
		controller: 'BacklogDetailsController',
	};
})