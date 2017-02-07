'use strict';
angular.module('sprint')

.controller('SprintController', ['$scope', '$timeout', 'SprintService', function($scope, $timeout,SprintService){

	/** fancy starts **/
	NProgress.start();
	NProgress.done();
	
	/** UI bindings **/
	$scope.sprintLists = [];
	$scope.sprintCounts = 0;
	
	$scope.startCallback = function(event, ui, title){
		console.log('You started draggin: ' + title.backlogTitle);
		$scope.draggedTitle = title.backlogTitle;
	};

	$scope.dropCallback = function(event, ui) {
		console.log('hey, you dumped me :-(' , $scope.draggedTitle);
		console.log($scope.sprintLists);
		$scope.sprintCounts = $scope.sprintLists.length;
		$scope.backlogCounts = $scope.backlogLists.length;
		
	};
}])

.directive('productSprint',function(){
	return{
		templateUrl : 'sprint/sprint.html',
		controller: 'SprintController',
	};
});