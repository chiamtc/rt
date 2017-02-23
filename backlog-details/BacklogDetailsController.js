'use strict';
angular.module('backlog-details')

.controller('BacklogDetailsController', ['$scope','$timeout','BacklogDetailsService','SprintService','BacklogService', function($scope, $timeout,BacklogDetailsService, SprintService, BacklogService){
	
	/** fancy starts **/
	NProgress.start();
	NProgress.done();
	
	/** UI bindings **/
	$scope.passBacklog = [];
	$scope.commentLists = [];
	$scope.taskLists = [];
	$scope.snackbarShow = false;
	$scope.createTaskResponse= false;
	/** UI functions **/
	
	
	
	$scope.toggle = function(backlog){
		if(backlog.backlogId == null){
		
		}else{
			$scope.colSize = true;
			$scope.passBacklog = backlog;
			
			$scope.backlogDTitle = $scope.passBacklog.backlogTitle;
			$scope.backlogDDesc = $scope.passBacklog.backlogDesc;
			$scope.backlogDStoryPoint = parseInt($scope.passBacklog.backlogStoryPoint);
			
			BacklogDetailsService.ListComment($scope.passBacklog.backlogId,function(response){
				switch(response.success){
					case 0:
					
						$scope.commentLists =[];
					break;
					case 1:
						$scope.commentLists = response.comments;
					break;
					case 2:
					break;
				}
			});
			
			BacklogDetailsService.ListTasks($scope.passBacklog.backlogId,function(response){
				
				switch(response.success){
					case 0:
						$scope.taskLists =[];
					break;
					case 1:
					
						$scope.taskLists = response.tasks;
					break;
					case 2:
					break;
				}
			});
		}
		
	}
	
	$scope.passEditTask= function(editTask){
		$scope.taskEditId = editTask.tasksId;
		$scope.taskEditTitle = editTask.tasksTitle;
		$scope.taskEditDesc = editTask.tasksDesc;
		if(editTask.tasksDesc == ""){
			$scope.taskEditDesc = "No Description when this task was created";
		}else{
			$scope.taskEditDesc = editTask.tasksDesc;
		}
	}
	
	$scope.passDeleteTask = function(passTask){
		$scope.passTaskDelete = passTask;
	}
	
	$scope.deleteTask = function(){
		BacklogDetailsService.DeleteTask($scope.passTaskDelete.tasksId,$scope.passBacklog.backlogId, function(response){
			console.log(response);
			switch(response.success){
				case 1:
					BacklogDetailsService.ListTasks($scope.passBacklog.backlogId,function(response){
						switch(response.success){
							case 0:
								$scope.taskLists =[];
							break;
							case 1:
								$scope.taskLists = response.tasks;
							break;
							case 2:
							break;
						}
					});
					$scope.passBacklog.dateModified = response.date_modified;
					$timeout(function(){
						$('#taskDeleteModal').modal('toggle');
					},500);
				break;
				case 0:
				break;
			}
		});
	}
	
	$scope.createTask = function(){
		$scope.createTaskResponse = !$scope.createTaskResponse;
		BacklogDetailsService.CreateTask($scope.taskCreateTitle, $scope.taskCreateDesc, $scope.passBacklog.backlogId,function(response){
			console.log(response);
			switch(response.success){
				case 1:
					$scope.taskLists = response.tasks;
					$scope.createTaskResponseClass=  "alert alert-success alert-dismissible";
					$scope.createTaskResponseMessage = "Created a new task !"
					$scope.passBacklog.dateModified = response.date_modified;
					$timeout(function(){
						$('#taskCreateModal').modal('toggle');
						$('#createTaskForm').trigger("reset");
						$scope.createTaskResponse = !$scope.createTaskResponse;
					},500);
				break;
				case 3:
				
					$scope.createTaskResponseClass=  "alert alert-danger alert-dismissible";
					$scope.createTaskResponseMessage = "Task Title Required !"
					$timeout(function(){
						$scope.createTaskResponse = !$scope.createTaskResponse;
					},1000);
				break;
				
				case 0:
					$scope.createTaskResponseClass=  "alert alert-danger alert-dismissible";
					$scope.createTaskResponseMessage = "Server Error"
					$timeout(function(){
						$scope.createTaskResponse = !$scope.createTaskResponse;
					},1000);
				break;
			}
		});
	}
	
	$scope.editTask = function(){
		if($scope.taskEditTitle == null){
			$scope.editTaskResponse = !$scope.editTaskResponse;
			$scope.editTaskResponseClass=  "alert alert-danger alert-dismissible";
			$scope.editTaskResponseMessage = "Unable to update task with empty title !"
		}else{
			BacklogDetailsService.EditTask($scope.taskEditTitle, $scope.taskEditDesc, $scope.taskEditId, $scope.passBacklog.backlogId,function(response){
				switch(response.success){
					case 1:
					console.log(response.tasks);
						$scope.taskLists = response.tasks;
						$scope.editTaskResponse = !$scope.editTaskResponse;
						$scope.editTaskResponseClass=  "alert alert-success alert-dismissible";
						$scope.editTaskResponseMessage = "Task updated !"
						$scope.passBacklog.dateModified = response.date_modified;
						$timeout(function(){
							$('#taskEditModal').modal('toggle');
							$scope.editTaskResponse = !$scope.editTaskResponse;
						},500);
					break;
					case 0:
					break;
				}
			});
		}
	}
	
	$scope.deleteComment = function(comment){
		BacklogDetailsService.DeleteComment(comment.commentId, comment.backlogId, function(response){
			switch(response.success){
				case 1:
					BacklogDetailsService.ListComment($scope.passBacklog.backlogId,function(response){
						switch(response.success){
							case 0:
								$scope.commentLists =[];
							break;
							case 1:
								$scope.commentLists = response.comments;
							break;
							case 2:
							break;
						}
					});
				break;
				case 0:
					console.log(response);
				break;
			}
		});
	}
	
	$scope.retain = function(){
		$scope.backlogDTitle = $scope.passBacklog.backlogTitle;
		$scope.backlogDType = $scope.passBacklog.backlogType;
		$scope.backlogDStoryPoint = parseInt($scope.passBacklog.backlogStoryPoint);
		$scope.backlogDPriority = $scope.passBacklog.backlogPriority;
		$scope.backlogDDesc = $scope.passBacklog.backlogDesc;
	}
	
	$scope.updateTitle = function(){
		if(!$scope.backlogDTitle.length){
			$scope.snackbarShow = !$scope.snackbarShow;
			$scope.snackbarClass= "alert alert-danger alert-dismissible snackbar";
			$scope.snackbarMessage = "Backlog Title cannot be empty ! ";
		}else{
			BacklogDetailsService.UpdateTitle($scope.backlogDTitle, $scope.passBacklog.backlogId,function(response){
			switch(response.success){
				case 1:
					$scope.snackbarShow = !$scope.snackbarShow;
					$scope.snackbarClass= "alert alert-success alert-dismissible snackbar";
					$scope.snackbarMessage = "Backlog Title Updated ! ";
					$scope.passBacklog.backlogTitle = $scope.backlogDTitle; // two-way binding in parameter
					$scope.passBacklog.dateModified = moment().fromNow();
					console.log($scope.passBacklog);
					$timeout(function(){
						$scope.snackbarShow = !$scope.snackbarShow;
					},5000);
				break;
				
				case 0:
					$scope.snackbarShow = !$scope.snackbarShow;
					$scope.snackbarClass= "alert alert-danger alert-dismissible snackbar";
					$scope.snackbarMessage = "Sorry, Something is wrong ! ";
					$timeout(function(){
						$scope.snackbarShow = !$scope.snackbarShow;
					},5000);
				break;
			}
			
			});
		}
	}
	
	$scope.updateType = function(){
		BacklogDetailsService.UpdateType($scope.backlogDType, $scope.passBacklog.backlogId,function(response){
		switch(response.success){
			case 1:
				$scope.snackbarShow = !$scope.snackbarShow;
				$scope.snackbarClass= "alert alert-success alert-dismissible snackbar";
				$scope.snackbarMessage = "Backlog Type Updated ! ";
				$scope.passBacklog.backlogType = $scope.backlogDType; // two-way binding in parameter
				$scope.passBacklog.dateModified = moment().fromNow();
				$timeout(function(){
					$scope.snackbarShow = !$scope.snackbarShow;
				},5000);
			break;
			
			case 0:
				$scope.snackbarShow = !$scope.snackbarShow;
				$scope.snackbarClass= "alert alert-danger alert-dismissible snackbar";
				$scope.snackbarMessage = "Sorry, Something is wrong ! ";
				$timeout(function(){
					$scope.snackbarShow = !$scope.snackbarShow;
				},5000);
			break;
		}
		});
	}
	
	$scope.updateSP = function(){
		if(!$scope.backlogDStoryPoint){
			$scope.snackbarShow = !$scope.snackbarShow;
			$scope.snackbarClass= "alert alert-danger alert-dismissible snackbar";
			$scope.snackbarMessage = "Backlog Story Point cannot be empty ! ";
		}else{
			BacklogDetailsService.UpdateSP($scope.backlogDStoryPoint, $scope.passBacklog.backlogId,function(response){
			switch(response.success){
				case 1:
					$scope.snackbarShow = !$scope.snackbarShow;
					$scope.snackbarClass= "alert alert-success alert-dismissible snackbar";
					$scope.snackbarMessage = "Backlog Story Points Updated ! ";
					$scope.passBacklog.backlogStoryPoint = $scope.backlogDStoryPoint; // two-way binding in parameter
					$scope.passBacklog.dateModified = moment().fromNow();
					$timeout(function(){
						$scope.snackbarShow = !$scope.snackbarShow;
					},5000);
				break;
				
				case 0:
					$scope.snackbarShow = !$scope.snackbarShow;
					$scope.snackbarClass= "alert alert-danger alert-dismissible snackbar";
					$scope.snackbarMessage = "Sorry, Something is wrong ! ";
					$timeout(function(){
						$scope.snackbarShow = !$scope.snackbarShow;
					},5000);
				break;
			}
			});
		}
	}
	
	$scope.updatePriority = function(){
		BacklogDetailsService.UpdatePriority($scope.backlogDPriority, $scope.passBacklog.backlogId,function(response){
		switch(response.success){
			case 1:
				$scope.snackbarShow = !$scope.snackbarShow;
				$scope.snackbarClass= "alert alert-success alert-dismissible snackbar";
				$scope.snackbarMessage = "Backlog Priority Updated ! ";
				$scope.passBacklog.backlogPriority = $scope.backlogDPriority; // two-way binding in parameter
				$scope.passBacklog.dateModified = moment().fromNow();
				$timeout(function(){
					$scope.snackbarShow = !$scope.snackbarShow;
				},5000);
			break;
			
			case 0:
				$scope.snackbarShow = !$scope.snackbarShow;
				$scope.snackbarClass= "alert alert-danger alert-dismissible snackbar";
				$scope.snackbarMessage = "Sorry, Something is wrong ! ";
				$timeout(function(){
					$scope.snackbarShow = !$scope.snackbarShow;
				},5000);
			break;
		}
		});
	}
	
	$scope.updateDesc = function(){
		BacklogDetailsService.UpdateDesc($scope.backlogDDesc, $scope.passBacklog.backlogId,function(response){
		switch(response.success){
			case 1:
				$scope.snackbarShow = !$scope.snackbarShow;
				$scope.snackbarClass= "alert alert-success alert-dismissible snackbar";
				$scope.snackbarMessage = "Backlog Priority Updated ! ";
				$scope.passBacklog.backlogDesc = $scope.backlogDDesc; // two-way binding in parameter
				$scope.passBacklog.dateModified = moment().fromNow();
				$timeout(function(){
					$scope.snackbarShow = !$scope.snackbarShow;
				},5000);
			break;
			
			case 0:
				$scope.snackbarShow = !$scope.snackbarShow;
				$scope.snackbarClass= "alert alert-danger alert-dismissible snackbar";
				$scope.snackbarMessage = "Sorry, Something is wrong ! ";
				$timeout(function(){
					$scope.snackbarShow = !$scope.snackbarShow;
				},5000);
			break;
		}
		});
	}
	
	$scope.comment= function(){
		BacklogDetailsService.SubmitComment($scope.backlogDComment,$scope.passBacklog.backlogId, function(response){
			switch(response.success){
				case 0:
				break;
				case 1:
					console.log(response.comments);
					$scope.commentLists = response.comments;
					
				break;
			}
		});
		$scope.backlogDComment = "";
	}
	
}])

.directive('backlogDetails',function(){
	return{
		templateUrl : 'backlog-details/backlog-details.html',
		controller: 'BacklogDetailsController',
	};
})