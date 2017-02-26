'use strict';

angular.module('review')

.factory('ReviewService',['$routeParams','$http', '$cookies', function( $routeParams,$http, $cookies){
	var factory={};
	
	factory.ListDoneSprints = function(callback){
		$http({
			method : "POST",
			url:"php/review/getDoneSprints.php",
			data:{
				projectKey : $routeParams.projectKey,
			},
			headers :{ 'Content-Type' : 'application/json' }
		}).then(function(response){
			
			angular.forEach(response.data.doneSprints, function(value, key){
				var backlogTPoint = 0;
				
				value.sprintStartDate = moment(value.sprintStartDate).format('YYYY-MM-DD');
				value.sprintEndDate = moment(value.sprintEndDate).format('YYYY-MM-DD');
				angular.forEach(value.doneBacklogs, function(v,k){
					v.dateCreated = moment(v.dateCreated).fromNow();
					v.dateModified = moment(v.dateModified).fromNow();
					backlogTPoint = backlogTPoint + parseInt(v.backlogStoryPoint);
				});
				value.backlogLength = value.doneBacklogs.length;
				value.doneBacklogs.backlogTotalPoint = backlogTPoint;
			});
			console.log(response.data);
			callback(response.data);
		});
	}
	
	factory.AcceptBacklog= function(backlogId,sprintId,callback){
		$http({
			method : "POST",
			url:"php/review/acceptBacklog.php",
			data:{
				backlogId: backlogId,
				sprintId:sprintId,
				projectKey : $routeParams.projectKey,
			},
			headers :{ 'Content-Type' : 'application/json' }
		}).then(function(response){
			console.log(response.data);
			callback(response.data);
		});
	}
	
	factory.RejectBacklog= function(backlogId,sprintId,callback){
		$http({
			method : "POST",
			url:"php/review/rejectBacklog.php",
			data:{
				backlogId: backlogId,
				sprintId:sprintId,
				projectKey : $routeParams.projectKey,
			},
			headers :{ 'Content-Type' : 'application/json' }
		}).then(function(response){
			console.log(response.data);
			callback(response.data);
		});
	}
	
	return factory;
}]);