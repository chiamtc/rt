'use strict';

angular.module('active-sprint')

.controller('ActiveSprintController',['$timeout','AnalyticsService','$scope','ProjectService','ActiveSprintService','$http', '$routeParams', '$cookies', function($timeout, AnalyticsService,$scope,ProjectService, ActiveSprintService,$http, $routeParams, $cookies){
	/** fancy starts **/
	NProgress.start();
	NProgress.done();
	
	/** UI bindings **/
	$scope.backlogActive = [];
	$scope.taskActive =[];
	$scope.activeSprint = [];
	$scope.userLists = [];
	$scope.colSize = false;
	$scope.emptyActiveSprintResponse = false;
	$scope.snackbarShow = false;
	$scope.droppable = true;
	
	
	/** UI function(s) **/
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
	
	$scope.labelling = function(tasksStatus){
		var labelStatus = tasksStatus;
		if(labelStatus =='To-do'){
			return 'label label-info';
			
		}else if(labelStatus == 'In-Progress'){
			return 'label label-warning';
		}else if(labelStatus == 'Done'){
			return 'label label-success';
		}
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
	
	$scope.completeSprint = function(){
		ActiveSprintService.CompleteSprint($routeParams.projectKey, function(response){
			$scope.backlogActive = [];
			$scope.taskActive =[];
			$scope.activeSprint = [];
			switch(response.success){
				case 1:
					ActiveSprintService.ListActiveBacklogsTasks(function(response){
						switch(response.success){
							case 0:
								$scope.emptyActiveSprintResponse = !$scope.emptyActiveSprintResponse;
								$scope.emptyActiveSprintResponseMessage ="You currently do not have any active sprint! Start a sprint from 'Sprint Backlog' by clicking 'Backlog' tab";
								$scope.snackbarShow = !$scope.snackbarShow;
								$scope.snackbarClass= "alert alert-success alert-dismissible snackbar";
								$scope.snackbarMessage = "Sprint Completed! ";
								
								$timeout(function(){
									$scope.snackbarShow = !$scope.snackbarShow;
								},3000);
							break;
						}
					});
				break;
			}
		});
	}
	
	$scope.startCallback4 = function(event, ui, sc2,bid){
		console.log('You started draggin: id' + bid);
		$scope.draggedId = bid;
		$scope.draggedTitle= sc2;
	};
	
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
		console.log("Tasks title: "  + $scope.draggedTitle.tasksTitle+ " status:" + $scope.draggedTitle.tasksStatus + " and "+ item.backlogId); 
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
			ActiveSprintService.UpdateInProgress($scope.draggedTitle.tasksId, item.backlogId, function(response){
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
		console.log("Tasks title: "  + $scope.draggedTitle.tasksTitle+ " status:" + $scope.draggedTitle.tasksStatus + " and "+ item.backlogId); 
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
			ActiveSprintService.UpdateDone($scope.draggedTitle.tasksId, item.backlogId, function(response){
				
				switch(response.success){
					case 1:
					console.log($scope.activeSprints);
						$scope.snackbarShow = !$scope.snackbarShow;
						$scope.draggedTitle.dateModified = response.dateModified;
						$scope.draggedTitle.tasksStatus = "Done";
						$scope.taskDStatus = "Done";
						$scope.snackbarClass= "alert alert-success alert-dismissible snackbar";
						$scope.snackbarMessage = "Task Progress Updated ! ";
						$scope.backlogDone = 0;
						angular.forEach(item.tasks, function(v,k){
							if(v.tasksStatus == 'Done'){
								$scope.backlogDone++;
							}
						});
						if(item.tasks.length == $scope.backlogDone){
							console.log($scope.activeSprints[0].sprintId);
							AnalyticsService.UpdateBurnDown($scope.activeSprints[0].sprintId, item.backlogBusinessValue, item.backlogStoryPoint);
						}
						
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
				var today = moment(moment().format('YYYY-MM-DD'));
				
				$scope.sprintStartDate = response.activeSprints[0].sprintStartDate;
				$scope.sprintEndDate = response.activeSprints[0].sprintEndDate;
				
				var duration = moment.duration(endDate.diff(today));
				var days = duration.asDays() + " Day(s) Remaining";
				$scope.numberDays = days;
				
				var plannedDuration = moment.duration(endDate.diff(startDate));
				var plannedDays = plannedDuration.asDays() + " Day(s) Planned";
				$scope.plannedNumberDays = plannedDays;
				
				var goneDuration = moment.duration(today.diff(startDate));
				if(goneDuration >0){
					var goneDays = goneDuration.asDays() + " Day(s) Gone";
				}else{
					var goneDays = Math.abs(goneDuration.asDays()) + " Day(s) Before Started";
				}
				
				$scope.goneNumberDays = goneDays;
				$scope.activeSprints = response.activeSprints;
				
				angular.forEach(response.activeSprints[0], function(value, key){
					$scope.backlogActive = value;
				});
				
				angular.forEach($scope.backlogActive, function(value,key){
					
					$scope.taskActive.push($scope.backlogActive[key].tasks);
				});
			break;
			
			case 0:
				$scope.emptyActiveSprintResponse = !$scope.emptyActiveSprintResponse;
				$scope.emptyActiveSprintResponseMessage ="You currently do not have any active sprint!";
			break;
		}
	});
	
	$scope.close = function(){
		$scope.colSize = false;
	}
}]);