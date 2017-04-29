'use strict';

angular.module('main-issues')

.controller('MainIssuesController', ['$scope','$timeout', '$routeParams','ProjectService', '$cookies','MainIssuesService','BacklogService','SprintService','BacklogDetailsService',function($scope, $timeout,$routeParams, ProjectService,$cookies,MainIssuesService,BacklogService,SprintService,BacklogDetailsService){
	$scope.selectedBacklog = [];
	$scope.taskLists = [];
	$scope.commentLists =[];
	$scope.snackbarShow = false;
	$scope.toggle= function(backlog){
		$scope.selectedBacklog = backlog;
		$scope.backlogDTitle = $scope.selectedBacklog.backlogTitle;
		$scope.backlogDType = $scope.selectedBacklog.backlogType;
		$scope.backlogDStoryPoint = parseFloat($scope.selectedBacklog.backlogStoryPoint);
		$scope.backlogDBusinessValue = parseFloat($scope.selectedBacklog.backlogBusinessValue);
		$scope.backlogDDesc = $scope.selectedBacklog.backlogDesc;
		
		BacklogDetailsService.ListTasks($scope.selectedBacklog.backlogId,function(response){
			switch(response.success){
				case 0:
					$scope.taskLists =[];
				break;
				case 1:		
					$scope.taskLists = response.tasks;
					console.log($scope.taskLists);
				break;
				case 2:
				break;
			}
		});
		
		BacklogDetailsService.ListComment($scope.selectedBacklog.backlogId,function(response){
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
		
		BacklogDetailsService.ListAssignees($scope.selectedBacklog.backlogId, function(response){
				var assignees = "";
				angular.forEach(response.assignees,function(v,k){
					//console.log(v);
					if(response.assignees.length == k+1){
						assignees += v + " (" + response.assignees.length + ")";
					}else{
						assignees += v + ", ";
					}
				});
				$scope.backlogAssignee = assignees;
			});
	}
	
	$scope.passEditTask= function(editTask){
		$scope.taskEditId = editTask.tasksId;
		$scope.taskEditTitle = editTask.tasksTitle;
		$scope.taskEditDesc = editTask.tasksDesc;
		$scope.taskEditAssignee = editTask.assignee;
		console.log($scope.taskEditAssignee);
		if(editTask.tasksDesc == ""){
			$scope.taskEditDesc = "No Description when this task was created";
		}else{
			$scope.taskEditDesc = editTask.tasksDesc;
		}
	}
	
	$scope.editTask = function(){
		if(!$scope.taskEditTitle.length){
			$scope.editTaskResponse = !$scope.editTaskResponse;
			$scope.editTaskResponseClass=  "alert alert-danger alert-dismissible";
			$scope.editTaskResponseMessage = "Unable to update task with empty title !"
		}else{
			var assignee = $scope.taskEditAssignee? $scope.taskEditAssignee:'Unassigned';
			BacklogDetailsService.EditTask($scope.taskEditTitle, $scope.taskEditDesc, $scope.taskEditId,assignee ,$scope.selectedBacklog.backlogId,function(response){
				switch(response.success){
					case 1:
					console.log(response.tasks);
						$scope.taskLists = response.tasks;
						$scope.editTaskResponse = !$scope.editTaskResponse;
						$scope.editTaskResponseClass=  "alert alert-success alert-dismissible";
						$scope.editTaskResponseMessage = "Task updated !"
						$scope.selectedBacklog.dateModified = moment(response.dateModified).fromNow();
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
	
	$scope.passDeleteTask = function(passTask){
		$scope.passTaskDelete = passTask;
	}
	
	$scope.deleteTask = function(){
		BacklogDetailsService.DeleteTask($scope.passTaskDelete.tasksId,$scope.selectedBacklog.backlogId, function(response){
			console.log(response);
			switch(response.success){
				case 1:
					BacklogDetailsService.ListTasks($scope.selectedBacklog.backlogId,function(response){
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
					$scope.selectedBacklog.dateModified = response.date_modified;
					$timeout(function(){
						$('#taskDeleteModal').modal('toggle');
					},500);
				break;
				case 0:
				break;
			}
		});
	}
	
	$scope.updateTitle = function(){
		NProgress.start();
		if(!$scope.backlogDTitle.length){
			$scope.snackbarShow = !$scope.snackbarShow;
			$scope.snackbarClass= "alert alert-danger alert-dismissible snackbar";
			$scope.snackbarMessage = "Backlog Title cannot be empty ! ";
		}else{
			BacklogDetailsService.UpdateTitle($scope.backlogDTitle, $scope.selectedBacklog.backlogId,function(response){
			
			switch(response.success){
				case 1:
					NProgress.set(0.5);
					$scope.snackbarShow = !$scope.snackbarShow;
					$scope.snackbarClass= "alert alert-success alert-dismissible snackbar";
					$scope.snackbarMessage = "Backlog Title Updated ! ";
					$scope.selectedBacklog.backlogTitle = $scope.backlogDTitle; // two-way binding in parameter
					$scope.selectedBacklog.dateModified = moment().fromNow();
					
					$timeout(function(){
						
						$scope.snackbarShow = !$scope.snackbarShow;
					},5000);
					NProgress.done();
				break;
				
				case 0:
					NProgress.set(0.5);
					$scope.snackbarShow = !$scope.snackbarShow;
					$scope.snackbarClass= "alert alert-danger alert-dismissible snackbar";
					$scope.snackbarMessage = "Sorry, Something is wrong ! ";
					NProgress.done();
					$timeout(function(){
						$scope.snackbarShow = !$scope.snackbarShow;
					},5000);
					NProgress.done();
				break;
			}
			
			});
		}
		
	}
	
	$scope.updateBV = function(){
		NProgress.start();
		if(!$scope.backlogDBusinessValue){
			$scope.snackbarShow = !$scope.snackbarShow;
			$scope.snackbarClass= "alert alert-danger alert-dismissible snackbar";
			$scope.snackbarMessage = "Business Value cannot be empty ! ";
		}else{
			BacklogDetailsService.UpdateBV($scope.backlogDBusinessValue, $scope.selectedBacklog.backlogId,function(response){
			switch(response.success){
				case 1:
					NProgress.set(0.5);
					$scope.snackbarShow = !$scope.snackbarShow;
					$scope.snackbarClass= "alert alert-success alert-dismissible snackbar";
					$scope.snackbarMessage = "Business Value Updated ! ";
					$scope.selectedBacklog.backlogBusinessValue = $scope.backlogDBusinessValue; // two-way binding in parameter
					$scope.selectedBacklog.dateModified = moment().fromNow();
					$timeout(function(){
						$scope.snackbarShow = !$scope.snackbarShow;
					},5000);
					NProgress.done();
				break;
				
				case 0:
					NProgress.set(0.5);
					$scope.snackbarShow = !$scope.snackbarShow;
					$scope.snackbarClass= "alert alert-danger alert-dismissible snackbar";
					$scope.snackbarMessage = "Sorry, Something is wrong ! ";
					$timeout(function(){
						$scope.snackbarShow = !$scope.snackbarShow;
					},5000);
					NProgress.done();
				break;
			}
			});
		}
	}
	
	$scope.updateType = function(){
		NProgress.start();
		BacklogDetailsService.UpdateType($scope.backlogDType, $scope.selectedBacklog.backlogId,function(response){
		switch(response.success){
			case 1:
				NProgress.set(0.5);
				$scope.snackbarShow = !$scope.snackbarShow;
				$scope.snackbarClass= "alert alert-success alert-dismissible snackbar";
				$scope.snackbarMessage = "Backlog Type Updated ! ";
				$scope.selectedBacklog.backlogType = $scope.backlogDType; // two-way binding in parameter
				$scope.selectedBacklog.dateModified = moment().fromNow();
				$timeout(function(){
					$scope.snackbarShow = !$scope.snackbarShow;
				},5000);
			break;
			
			case 0:
				NProgress.set(0.5);
				$scope.snackbarShow = !$scope.snackbarShow;
				$scope.snackbarClass= "alert alert-danger alert-dismissible snackbar";
				$scope.snackbarMessage = "Sorry, Something is wrong ! ";
				$timeout(function(){
					$scope.snackbarShow = !$scope.snackbarShow;
				},5000);
				NProgress.done();
			break;
		}
		});
	}
	
	$scope.updateSP = function(){
		NProgress.start();
		if(!$scope.backlogDStoryPoint){
			$scope.snackbarShow = !$scope.snackbarShow;
			$scope.snackbarClass= "alert alert-danger alert-dismissible snackbar";
			$scope.snackbarMessage = "Backlog Story Point cannot be empty ! ";
		}else{
			BacklogDetailsService.UpdateSP($scope.backlogDStoryPoint, $scope.selectedBacklog.backlogId,function(response){
			switch(response.success){
				case 1:
					NProgress.set(0.5);
					$scope.snackbarShow = !$scope.snackbarShow;
					$scope.snackbarClass= "alert alert-success alert-dismissible snackbar";
					$scope.snackbarMessage = "Backlog Story Points Updated ! ";
					$scope.selectedBacklog.backlogStoryPoint = $scope.backlogDStoryPoint; // two-way binding in parameter
					$scope.selectedBacklog.dateModified = moment().fromNow();
					$timeout(function(){
						$scope.snackbarShow = !$scope.snackbarShow;
					},5000);
					NProgress.done();
				break;
				
				case 0:
					NProgress.set(0.5);
					$scope.snackbarShow = !$scope.snackbarShow;
					$scope.snackbarClass= "alert alert-danger alert-dismissible snackbar";
					$scope.snackbarMessage = "Sorry, Something is wrong ! ";
					$timeout(function(){
						$scope.snackbarShow = !$scope.snackbarShow;
					},5000);
					NProgress.done();
				break;
			}
			});
		}
	}
	
	$scope.updatePriority = function(){
		NProgress.start();
		BacklogDetailsService.UpdatePriority($scope.backlogDPriority, $scope.selectedBacklog.backlogId,function(response){
		switch(response.success){
			case 1:
				NProgress.set(0.5);
				$scope.snackbarShow = !$scope.snackbarShow;
				$scope.snackbarClass= "alert alert-success alert-dismissible snackbar";
				$scope.snackbarMessage = "Backlog Priority Updated ! ";
				$scope.selectedBacklog.backlogPriority = $scope.backlogDPriority; // two-way binding in parameter
				$scope.selectedBacklog.dateModified = moment().fromNow();
				$timeout(function(){
					$scope.snackbarShow = !$scope.snackbarShow;
				},5000);
				NProgress.done();
			break;
			
			case 0:
				NProgress.set(0.5);
				$scope.snackbarShow = !$scope.snackbarShow;
				$scope.snackbarClass= "alert alert-danger alert-dismissible snackbar";
				$scope.snackbarMessage = "Sorry, Something is wrong ! ";
				$timeout(function(){
					$scope.snackbarShow = !$scope.snackbarShow;
				},5000);
				NProgress.done();
			break;
		}
		});
	}
	
	$scope.updateDesc = function(){
		NProgress.start();
		BacklogDetailsService.UpdateDesc($scope.backlogDDesc, $scope.selectedBacklog.backlogId,function(response){
		switch(response.success){
			case 1:
				NProgress.set(0.5);
				$scope.snackbarShow = !$scope.snackbarShow;
				$scope.snackbarClass= "alert alert-success alert-dismissible snackbar";
				$scope.snackbarMessage = "Backlog Priority Updated ! ";
				$scope.selectedBacklog.backlogDesc = $scope.backlogDDesc; // two-way binding in parameter
				$scope.selectedBacklog.dateModified = moment().fromNow();
				$timeout(function(){
					$scope.snackbarShow = !$scope.snackbarShow;
				},5000);
				NProgress.done();
			break;
			
			case 0:
				NProgress.set(0.5);
				$scope.snackbarShow = !$scope.snackbarShow;
				$scope.snackbarClass= "alert alert-danger alert-dismissible snackbar";
				$scope.snackbarMessage = "Sorry, Something is wrong ! ";
				$timeout(function(){
					$scope.snackbarShow = !$scope.snackbarShow;
				},5000);
				NProgress.done();
			break;
		}
		});
	}
	
	$scope.comment= function(){
		BacklogDetailsService.SubmitComment($scope.backlogDComment,$scope.selectedBacklog.backlogId, function(response){
			NProgress.start();
			switch(response.success){
				case 0:
				break;
				case 1:
					NProgress.set(0.5);
					console.log(response.comments);
					$scope.commentLists = response.comments;
					NProgress.done();
				break;
			}
		});
		$scope.backlogDComment = "";
	}
	
	ProjectService.ListUsers($routeParams.projectKey, function(response){
		switch(response.success){
			case 0:
				$scope.userLists = [];
			break;
			
			case 1:
				$scope.userLists = response.users;
			break;
		}
	});
	
	$scope.deleteComment = function(comment){
		BacklogDetailsService.DeleteComment(comment.commentId, comment.backlogId, function(response){
			switch(response.success){
				case 1:
					BacklogDetailsService.ListComment($scope.selectedBacklog.backlogId,function(response){
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
	
	$scope.createTask = function(){
		
		if(!$scope.taskCreateTitle){
			$scope.createTaskResponse = !$scope.createTaskResponse;
			$scope.createTaskResponseClass=  "alert alert-danger alert-dismissible";
			$scope.createTaskResponseMessage = "Task Title Required !"
				$timeout(function(){
					$scope.createTaskResponse = !$scope.createTaskResponse;
				},1000);
		}else{
		$scope.createTaskResponse = !$scope.createTaskResponse;
		var assignee = $scope.taskCreateAssignees? $scope.taskCreateAssignees:'Unassigned';
		BacklogDetailsService.CreateTask($scope.taskCreateTitle, $scope.taskCreateDesc, assignee,$scope.selectedBacklog.backlogId,function(response){
			console.log(response);
			switch(response.success){
				case 1:
					$scope.taskLists = response.tasks;
					$scope.createTaskResponseClass=  "alert alert-success alert-dismissible";
					$scope.createTaskResponseMessage = "Created a new task !"
					$scope.selectedBacklog.dateModified = response.date_modified;
					$timeout(function(){
						$('#taskCreateModal').modal('toggle');
						$scope.taskCreateAssignees = "";
						$scope.createTaskResponse = !$scope.createTaskResponse;
					},1000);
					$('#createTaskForm').trigger("reset");
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
	}
	
	$scope.retain = function(){
		$scope.backlogDTitle = $scope.selectedBacklog.backlogTitle;
		$scope.backlogDType = $scope.selectedBacklog.backlogType;
		$scope.backlogDStoryPoint = parseInt($scope.selectedBacklog.backlogStoryPoint);
		$scope.backlogDPriority = $scope.selectedBacklog.backlogPriority;
		$scope.backlogDDesc = $scope.selectedBacklog.backlogDesc;
	}
}]);