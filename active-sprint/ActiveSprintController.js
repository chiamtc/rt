'use strict';

angular.module('active-sprint')

.controller('ActiveSprintController',['$timeout','$scope','ActiveSprintService','$http', '$routeParams', '$cookies', function($timeout, $scope,ActiveSprintService,$http, $routeParams, $cookies){
	/** fancy starts **/
	NProgress.start();
	NProgress.done();
	$scope.backlogActive = [];
	$scope.taskActive =[];
	$scope.colSize = false;
	$scope.emptyActiveSprintResponse = false;
	$scope.snackbarShow = false;
	$scope.calculateStyle= function(retrieved){
		var bPVal = retrieved.backlogPriority;
		if(bPVal == "Highest"){
			return {
				'border-left':'5px solid red'
			}
		}else if(bPVal == "High"){
			return {
				'border-left':"5px solid #ff8000"
			}
		}else if(bPVal == "Medium"){
			return{
				'border-left':"5px solid #ffff1a"
			}
		}else if(bPVal == "Low"){
			return{
				'border-left':'5px solid green'
			}
		}
	}
	
	$scope.droppable = true;
	$scope.startCallback4 = function(event, ui, sc2,bid){
		console.log('You started draggin: id' + bid);
		$scope.draggedId = bid;
		$scope.draggedTitle= sc2;
	};
	
	$scope.onOverCallback = function(event,ui,bid){
		console.log(bid);
		if(bid != $scope.draggedId){
			$(".dropPlace2").css("cursor","no-drop");
		}
	}
	
	$scope.onDragCallback = function(event,ui,bid){
		console.log(bid);
		if(bid != $scope.draggedId){
			$(".dropPlace2").css("cursor","no-drop");
		}
	}
	
	
	$scope.dropCallback4 = function(event, ui, item) {
		console.log("Tasks title: " + $scope.draggedTitle.tasksTitle+ " status:" +$scope.draggedTitle.tasksStatus + " and "+ item.backlogId); 
		if($scope.draggedId != item.backlogId ){
			ActiveSprintService.ListActiveBacklogsTasks(function(response){
				switch(response.success){
					case 1:
						//$scope.backlogActive = response.activeSprints[0].backlogs;
						
						angular.forEach(response.activeSprints[0], function(value, key){
							$scope.backlogActive = value;
						});
						
						angular.forEach($scope.backlogActive, function(value,key){
							$scope.taskActive.push($scope.backlogActive[key].tasks);
						}); 
					break;
					
					case 0:
						$scope.emptyActiveSprintResponse = !$scope.emptyActiveSprintResponse;
						$scope.emptyActiveSprintResponseClass = "alert alert-warning";
						$scope.emptyActiveSprintResponseMessage ="You currently do not have any active sprint";
					break;
				}
			});
		}else{
		ActiveSprintService.UpdateToDo($scope.draggedTitle.tasksId, item.backlogId, function(response){
			switch(response.success){
				case 1:
					$scope.snackbarShow = !$scope.snackbarShow;
					$scope.draggedTitle.dateModified = response.dateModified;
					$scope.draggedTitle.tasksStatus = "To-do";
					$scope.taskDStatus = "To-do";
					$scope.snackbarClass= "alert alert-success alert-dismissible snackbar";
					$scope.snackbarMessage = "Task Progress Updated ! ";
					
					$timeout(function(){
						$scope.snackbarShow = !$scope.snackbarShow;
					},3000);
				break;
				
				case 0:
				break;
			}
		});
		}
	};
	
	$scope.dropCallback5 = function(event, ui, item) {
		console.log("Tasks title: "  + $scope.draggedTitle.tasksTitle+ " status:" + $scope.draggedTitle.tasksStatus + " and "+ item); 
		if($scope.draggedId != item ){
			ActiveSprintService.ListActiveBacklogsTasks(function(response){
				switch(response.success){
					case 1:
						//$scope.backlogActive = response.activeSprints[0].backlogs;
						
						angular.forEach(response.activeSprints[0], function(value, key){
							$scope.backlogActive = value;
						});
						
						angular.forEach($scope.backlogActive, function(value,key){
							$scope.taskActive.push($scope.backlogActive[key].tasks);
						}); 
					break;
					
					case 0:
						$scope.emptyActiveSprintResponse = !$scope.emptyActiveSprintResponse;
						$scope.emptyActiveSprintResponseClass = "alert alert-warning";
						$scope.emptyActiveSprintResponseMessage ="You currently do not have any active sprint";
					break;
				}
			});
		}else{
			ActiveSprintService.UpdateInProgress($scope.draggedTitle.tasksId, item, function(response){
				console.log(response);
				switch(response.success){
					case 1:
						$scope.snackbarShow = !$scope.snackbarShow;
						$scope.draggedTitle.dateModified = response.dateModified;
						$scope.draggedTitle.tasksStatus = "In-Progress";
						$scope.taskDStatus = "In-Progress";
						$scope.snackbarClass= "alert alert-success alert-dismissible snackbar";
						$scope.snackbarMessage = "Task Progress Updated ! ";
						
						$timeout(function(){
							$scope.snackbarShow = !$scope.snackbarShow;
						},3000);
					break;
					
					case 0:
					break;
				}
			});
		}
	};
	
	$scope.dropCallback6 = function(event, ui, item) {
		console.log("Tasks title: "  + $scope.draggedTitle.tasksTitle+ " status:" + $scope.draggedTitle.tasksStatus + " and "+ item); 
		if($scope.draggedId != item ){
			ActiveSprintService.ListActiveBacklogsTasks(function(response){
				switch(response.success){
					case 1:
						//$scope.backlogActive = response.activeSprints[0].backlogs;
						
						angular.forEach(response.activeSprints[0], function(value, key){
							$scope.backlogActive = value;
						});
						
						angular.forEach($scope.backlogActive, function(value,key){
							$scope.taskActive.push($scope.backlogActive[key].tasks);
						}); 
					break;
					
					case 0:
						$scope.emptyActiveSprintResponse = !$scope.emptyActiveSprintResponse;
						$scope.emptyActiveSprintResponseClass = "alert alert-warning";
						$scope.emptyActiveSprintResponseMessage ="You currently do not have any active sprint";
					break;
				}
			});
		}else{
			ActiveSprintService.UpdateDone($scope.draggedTitle.tasksId, item, function(response){
				console.log(response);
				switch(response.success){
					case 1:
						$scope.snackbarShow = !$scope.snackbarShow;
						$scope.draggedTitle.dateModified = response.dateModified;
						$scope.draggedTitle.tasksStatus = "Done";
						$scope.taskDStatus = "Done";
						$scope.snackbarClass= "alert alert-success alert-dismissible snackbar";
						$scope.snackbarMessage = "Task Progress Updated ! ";
						
						$timeout(function(){
							$scope.snackbarShow = !$scope.snackbarShow;
						},3000);
					break;
					
					case 0:
					break;
				}
			});
		}
	};
	
	ActiveSprintService.ListActiveBacklogsTasks(function(response){
		switch(response.success){
			case 1:
				
				$scope.sprintGoal = response.activeSprints[0].sprintGoal;
				var startDate = moment(response.activeSprints[0].sprintStartDate);
				var endDate = moment(response.activeSprints[0].sprintEndDate);
				var duration = moment.duration(endDate.diff(startDate));
				var days = duration.asDays();
				$scope.sprintStartDate = response.activeSprints[0].sprintStartDate;
				$scope.sprintEndDate = response.activeSprints[0].sprintEndDate;
				$scope.numberDays = days;
				angular.forEach(response.activeSprints[0], function(value, key){
					$scope.backlogActive = value;
				});
				
				angular.forEach($scope.backlogActive, function(value,key){
					$scope.taskActive.push($scope.backlogActive[key].tasks);
					
				}); 
			break;
			
			case 0:
				$scope.emptyActiveSprintResponse = !$scope.emptyActiveSprintResponse;
				$scope.emptyActiveSprintResponseClass = "alert alert-warning";
				$scope.emptyActiveSprintResponseMessage ="You currently do not have any active sprint";
			break;
		}
	});
	
	$scope.close = function(){
		$scope.colSize = false;
	}
}]);