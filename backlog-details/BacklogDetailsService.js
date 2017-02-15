'use strict';

angular.module('backlog-details')

.factory('BacklogDetailsService', ['$http','$cookies','$routeParams',function($http,$cookies, $routeParams){
	var factory = {};
	
	factory.ListComment = function(backlogId, callback){
		$http({
			method : 'POST',
			url : 'php/backlog-details/getComments.php',
			data:{
				
				backlogId: backlogId,
			},
			headers: {'Content-Type':'application/json'}
		}).then(function(response){
			angular.forEach(response.data.comments, function(value, key){
				value.dateComment = moment(value.dateComment).fromNow();
			});
			callback(response.data);
		});
	}
	
	factory.SubmitComment = function(comment, backlogId,callback){
		$http({
			method : 'POST',
			url : 'php/backlog-details/submitComment.php',
			data:{
				comment : comment,
				email:$cookies.get('email'),
				dateComment : moment().format(),
				backlogId: backlogId,
			},
			headers: {'Content-Type':'application/json'}
		}).then(function(response){
			console.log(response.data.comment);
			angular.forEach(response.data.comment, function(value, key){
				
				value.dateComment = moment(value.dateComment).fromNow();
				
			});
			callback(response.data);
		});
	}
	
	return factory;
}])