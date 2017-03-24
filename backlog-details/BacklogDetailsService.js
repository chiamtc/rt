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
	
	factory.GetBacklogVersion = function(backlogId,callback){
		$http({
			method : 'POST',
			url : 'php/backlog-details/getBacklogVersion.php',
			data:{
				backlogId: backlogId,
			},
			headers: {'Content-Type':'application/json'}
		}).then(function(response){
			callback(response.data);
		});
	}
	
	factory.ListReview = function(backlogId,callback){
		$http({
			method : 'POST',
			url : 'php/backlog-details/getReview.php',
			data:{
				backlogId: backlogId,
			},
			headers: {'Content-Type':'application/json'}
		}).then(function(response){
			
			callback(response.data);
		});
	}
	
	factory.ListAssignees = function(backlogId,callback){
		$http({
			method : 'POST',
			url : 'php/backlog-details/getAssignees.php',
			data:{
				backlogId: backlogId,
			},
			headers: {'Content-Type':'application/json'}
		}).then(function(response){
			
			callback(response.data);
		});
	}
	
	factory.DeleteTask = function(taskId,backlogId,callback){
		$http({
			method : 'POST',
			url : 'php/backlog-details/deleteTask.php',
			data:{
				
				taskId : taskId,
				backlogId:backlogId,
				date_modified : moment().format('YYYY-MM-DD HH:mm:ss'),
			},
			headers: {'Content-Type':'application/json'}
		}).then(function(response){
			response.data.date_modified = moment(response.data.date_modified).fromNow();
			callback(response.data);
		});
	}
	
	factory.EditTask= function(taskTitle, taskDesc, taskId, assignee,backlogId,callback){
		$http({
			method : 'POST',
			url : 'php/backlog-details/editTask.php',
			data:{
				taskTitle:taskTitle,
				taskDesc : taskDesc,
				taskId : taskId,
				assignee:assignee,
				backlogId: backlogId,
				date_modified : moment().format('YYYY-MM-DD HH:mm:ss'),
			},
			headers: {'Content-Type':'application/json'}
		}).then(function(response){
			response.data.date_modified = moment(response.data.date_modified).fromNow();
			callback(response.data);
		});
	}
	
	factory.ListTasks = function(backlogId, callback){
		$http({
			method : 'POST',
			url : 'php/backlog-details/getTasks.php',
			data:{
				backlogId: backlogId,
			},
			headers: {'Content-Type':'application/json'}
		}).then(function(response){
			console.log(response.data);
			angular.forEach(response.data.tasks,function(value,key){
				value.dateCreated = moment(value.dateCreated).fromNow();
				value.dateModified = moment(value.dateModified).fromNow();
			});
			callback(response.data);
		});
	}
	
	factory.CreateTask = function(taskTitle, taskDesc, assignee,backlogId,callback){
		$http({
			method : 'POST',
			url : 'php/backlog-details/createTask.php',
			data:{
				taskTitle:taskTitle,
				taskDesc:taskDesc,
				assignee: assignee,
				backlogId : backlogId,
				date_created : moment().format('YYYY-MM-DD HH:mm:ss'),
				date_modified : moment().format('YYYY-MM-DD HH:mm:ss'),
			},
			headers: {'Content-Type':'application/json'}
		}).then(function(response){
			response.data.date_created = moment(response.data.date_created).fromNow();
			response.data.date_modified = moment(response.data.date_modified).fromNow();
			callback(response.data);
		});
	}
	
	factory.DeleteComment = function(commentId, backlogId,callback){
		$http({
			method : 'POST',
			url : 'php/backlog-details/deleteComment.php',
			data:{
				commentId : commentId,
				backlogId : backlogId
			},
			headers: {'Content-Type':'application/json'}
		}).then(function(response){
			callback(response.data);
		});
	}
	
	factory.UpdateTitle= function(backlogTitle, backlogId,callback){
		$http({
			method : 'POST',
			url : 'php/backlog-details/updateTitle.php',
			data:{
				backlogTitle : backlogTitle,
				dateModified : moment().format('YYYY-MM-DD HH:mm:ss'),
				backlogId: backlogId,
			},
			headers: {'Content-Type':'application/json'}
		}).then(function(response){
			callback(response.data);
		});
	}
	
	factory.UpdateBV = function(backlogBusinessValue, backlogId,callback){
		$http({
			method : 'POST',
			url : 'php/backlog-details/updateBV.php',
			data:{
				backlogBusinessValue : backlogBusinessValue,
				dateModified : moment().format('YYYY-MM-DD HH:mm:ss'),
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
				dateModified : moment().format('YYYY-MM-DD HH:mm:ss'),
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
				dateModified : moment().format('YYYY-MM-DD HH:mm:ss'),
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
				dateModified : moment().format('YYYY-MM-DD HH:mm:ss'),
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
				dateModified : moment().format('YYYY-MM-DD HH:mm:ss'),
				backlogId: backlogId,
			},
			headers: {'Content-Type':'application/json'}
		}).then(function(response){
			callback(response.data);
		});
	}
	
	factory.UpdateVersion= function(releaseId, backlogId,callback){
		$http({
			method : 'POST',
			url : 'php/backlog-details/updateVersion.php',
			data:{
				releaseId : releaseId,
				dateModified : moment().format('YYYY-MM-DD HH:mm:ss'),
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
				dateComment : moment().format('YYYY-MM-DD HH:mm:ss'),
				backlogId: backlogId,
			},
			headers: {'Content-Type':'application/json'}
		}).then(function(response){
			console.log(response.data);
			angular.forEach(response.data.comments, function(value, key){
				
				value.dateComment = moment(value.dateComment).fromNow();
				
			});
			callback(response.data);
		});
	}
	
	return factory;
}])