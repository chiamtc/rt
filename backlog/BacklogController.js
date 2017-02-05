'use strict';
angular.module('backlog')

.controller('BacklogController', ['$scope', function($scope){
	$scope.list1 = [
	{title: 'AngularJS - Drag Me'},
	{title: 'AngularJS2 - Drag Me 2'}
	];
	
	$scope.list2 = [
	{title:'Js'},
	{title:'Js2'}
	];
	
}])

.directive('productBacklog',function(){
	return{
		templateUrl : 'backlog/backlog.html',
		controller: 'BacklogController',
	};
});