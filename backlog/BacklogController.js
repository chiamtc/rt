'use strict';
angular.module('backlog')

.controller('BacklogController', ['$scope', function($scope){
	
}])

.directive('productBacklog',function(){
	return{
		templateUrl : 'backlog/backlog.html',
		controller: 'BacklogController',
	};
});