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
	
	factory.UpdateTitle= function(backlogTitle, backlogId,callback){
		$http({
			method : 'POST',
			url : 'php/backlog-details/updateTitle.php',
			data:{
				backlogTitle : backlogTitle,
				backlogId: backlogId,
			},
			headers: {'Content-Type':'application/json'}
		}).then(function(response){
			callback(response.data);
		});
	}
	
	factory.UpdateType= function(backlogType, backlogId,callback){
		$http({
			method : 'POST',
			url : 'php/backlog-details/updateType.php',
			data:{
				backlogType : backlogType,
				backlogId: backlogId,
			},
			headers: {'Content-Type':'application/json'}
		}).then(function(response){
			callback(response.data);
		});
	}
	
	factory.UpdateSP= function(backlogSP, backlogId,callback){
		$http({
			method : 'POST',
			url : 'php/backlog-details/updateSP.php',
			data:{
				backlogSP : backlogSP,
				backlogId: backlogId,
			},
			headers: {'Content-Type':'application/json'}
		}).then(function(response){
			callback(response.data);
		});
	}
	
	factory.UpdatePriority= function(backlogPriority, backlogId,callback){
		$http({
			method : 'POST',
			url : 'php/backlog-details/updatePriority.php',
			data:{
				backlogPriority : backlogPriority,
				backlogId: backlogId,
			},
			headers: {'Content-Type':'application/json'}
		}).then(function(response){
			console.log(response.data);
			callback(response.data);
		});
	}
	
	factory.UpdateDesc= function(backlogDesc, backlogId,callback){
		$http({
			method : 'POST',
			url : 'php/backlog-details/updateDesc.php',
			data:{
				backlogDesc : backlogDesc,
				backlogId: backlogId,
			},
			headers: {'Content-Type':'application/json'}
		}).then(function(response){
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
			
			angular.forEach(response.data.comment, function(value, key){
				
				value.dateComment = moment(value.dateComment).fromNow();
				
			});
			callback(response.data);
		});
	}
	
	return factory;
}])