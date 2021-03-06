'use strict';
angular.module('sprint')

.controller('SprintController', ['$scope', '$timeout', 'BacklogService','SprintService', function($scope, $timeout,BacklogService, SprintService){

	/** fancy starts **/
	NProgress.start();
	NProgress.done();
	
	/** UI bindings **/
	$scope.sprintLists = [];
	$scope.sprintListsActive=[];
	$scope.createSprintResponse= false;
	$scope.editSprintResponse= false;
	
	/** date format **/
	//var a = new Date(Date.parse("2017-02-08T14:00:00.000Z"));
	
	$scope.startCallback2 = function(event, ui, sc2,activeSprintId){
		console.log('You started draggin: ' + sc2.backlogId + sc2.backlogStatus);
		$scope.draggedActiveSprintId = activeSprintId;
		$scope.draggedBacklog = sc2;
	};

	$scope.dropCallback2 = function(event, ui, item) {
		if($scope.backlogLists.length == 0){
			$scope.backlogListsClass = "backlogListsEmpty";
		}
		
		if($scope.sprintLists.length == 0){
			$scope.sprintListsClass= "sprintListsEmpty";
		}else{
			$scope.sprintListsClass = "sprintLists";
			console.log('sprintId' , item,' backlogId',$scope.draggedTitle, $scope.draggedStatus);
			SprintService.UpdateSprint(item, $scope.draggedBacklog, $scope.draggedActiveSprintId,function(response){
				NProgress.start();
				NProgress.set(0.7);
				NProgress.done();
				$scope.sprintLists = response.sprints;
			});
		}
	};
	
	$scope.dropCallback3 = function(event, ui, item) {
		if($scope.backlogLists.length == 0){
			$scope.backlogListsClass = "backlogListsEmpty";
		}
		
		if($scope.sprintListsActive.length == 0){
			$scope.sprintListsClass= "sprintListsEmpty";
		}else{
			if($scope.draggedActiveSprintId == item){
				console.log($scope.draggedActiveSprintId == item);
			}else{
				$scope.sprintListsClass = "sprintLists";
				console.log('sprintId ACTIVE?' + $scope.draggedActiveSprintId);
				SprintService.UpdateActiveSprint(item, $scope.draggedBacklog,$scope.draggedActiveSprintId, function(response){
					NProgress.start();
					NProgress.set(0.7);
					NProgress.done();
					console.log(response.activeSprints);
					$scope.sprintListsActive = response.activeSprints;
					
					
				});
			}
		}
	};
	
	$scope.startSprint = function(sprint){
		console.log(sprint);
		console.log(moment(sprint.sprintStartDate).format('YYYY-MM-DD'));
		SprintService.StartSprint(sprint,function(response){
			switch(response.success){
				case 0:
					console.log(response);
				break;
				case 1:
					SprintService.ListSprints(function(response){
					
						switch(response.success){
							case 1:
								$scope.sprintListsClass="sprintLists";
								$scope.sprintLists = response.sprints;
							break;
							
							case 0:
								$scope.sprintListsClass = "sprintLists";
								$scope.sprintLists = [];
							break;
						}
					});

					SprintService.ListActiveSprints(function(response){
					
						switch(response.success){
							case 1:
								$scope.sprintListsClass="sprintLists";
								$scope.sprintListsActive = response.activeSprints;
								console.log(response);
								$scope.backlogTotalPoint = response.activeSprints.backlogTotalPoint;
								$scope.backlogTotalBV = response.activeSprints.backlogTotalBV;
							break;
							
							case 0:
								$scope.sprintListsClass = "sprintLists";
								$scope.sprintListsActive = [];
							break;
						}
					});
				
				$scope.snackbarShow = !$scope.snackbarShow;
				$scope.snackbarClass= "alert alert-success alert-dismissible snackbar";
				$scope.snackbarMessage = "Sprint has activated ! ";
				
				$timeout(function(){
					$scope.snackbarShow = !$scope.snackbarShow;
				},3000);
				break;
			}
		});
	}
	
	$scope.passEdit = function(sprint){
		$scope.sprint = sprint;
		$scope.sprintEditId = sprint.sprintId;
		$scope.sprintEditGoal = sprint.sprintGoal;
		$scope.sprintEditStartDate = new Date(Date.parse(sprint.sprintStartDate));
		$scope.sprintEditEndDate = new Date(Date.parse(sprint.sprintEndDate));
	}
	
	$scope.updateSprintDetails = function(){
		var startDate = moment($scope.sprintEditStartDate).format('YYYY-MM-DD');
		var endDate = moment($scope.sprintEditEndDate).format('YYYY-MM-DD');
		
		SprintService.UpdateSprintDetails($scope.sprintEditId, $scope.sprintEditGoal,startDate, endDate, function(response){
			NProgress.start();
			$scope.editSprintResponse = !$scope.editSprintResponse;
			switch(response.success){
				case 0:
					$scope.editSprintResponseClass = "alert alert-danger";
					$scope.editSprintResponseMessage = "Failed to update";
				break;
				
				case 1:
					$scope.editSprintResponseClass = "alert alert-success";
					$scope.editSprintResponseMessage = "Details are updated! :)";
					$scope.sprint.sprintGoal = $scope.sprintEditGoal;
					console.log($scope.sprint.sprintEditEndDate);
					$scope.sprint.sprintEndDate = $scope.sprintEditEndDate;
					$scope.sprint.sprintStartDate = $scope.sprintEditStartDate;
					$timeout(function(){
						$('#sprintEditModal').modal('toggle');
						$scope.editSprintResponse = !$scope.editSprintResponse;
					},1000);
				break;
			}
			NProgress.set(0.7);
			NProgress.done();
		});
	}
	
	$scope.passDelete = function(sprint){
		$scope.sprintDeletePassed= sprint;

	}
	
	$scope.deleteSprint = function(){
		SprintService.DeleteSprint($scope.sprintDeletePassed.sprintId, function(response){
			NProgress.start();
			console.log(response);
			switch(response.success){
				case 0:
				break;
				
				case 1:
					 SprintService.ListSprints(function(response){
					
						switch(response.success){
							case 1:
								$scope.sprintListsClass="sprintLists";
								$scope.sprintLists = response.sprints;
							break;
							
							case 0:
								$scope.sprintListsClass = "sprintLists";
								$scope.sprintLists = [];
							break;
						}
					});

					SprintService.ListActiveSprints(function(response){
					
						switch(response.success){
							case 1:
								$scope.sprintListsClass="sprintLists";
								$scope.sprintListsActive = response.activeSprints;
								console.log(response);
							break;
							
							case 0:
								$scope.sprintListsClass = "sprintLists";
								$scope.sprintListsActive = [];
							break;
						}
					}); 
					BacklogService.ListBacklogs(function(response){
						if(response.backlogs == null){
							$scope.backlogLists = [];
							$scope.backlogListsClass = "backlogListsEmpty";
						}else{
							$scope.backlogListsClass ="backlogLists";
							$scope.backlogLists= response.backlogs;
						}
					});
					$timeout(function(){
						$('#sprintDeleteModal').modal('toggle');
					},250);
				
				NProgress.set(0.7);
				NProgress.done();
				break;
			}
		});

	}
	
	SprintService.ListSprints(function(response){
		switch(response.success){
			case 1:
				$scope.sprintListsClass="sprintLists";
				$scope.sprintLists = response.sprints;
				
			break;
			case 0:
				$scope.sprintListsClass = "sprintLists";
				$scope.sprintLists = [];
			break;
		}
	});
	
	SprintService.ListActiveSprints(function(response){
		switch(response.success){
			case 1:
				$scope.sprintListsClass="sprintLists";
				$scope.sprintListsActive = response.activeSprints;
				$scope.backlogTotalPoint = response.activeSprints.backlogTotalPoint;
				$scope.backlogTotalBV = response.activeSprints.backlogTotalBV;
			break;
			
			case 0:
				$scope.sprintListsClass="sprintLists";
				$scope.sprintListsActive=[];
			break;
		}
	});
	
	$scope.createSprint = function(){
		$scope.createSprintResponse = !$scope.createSprintResponse;
		if($scope.sprintStartDate== null ||  $scope.sprintEndDate == null){
			$scope.createSprintResponseClass ="alert alert-danger";
			$scope.createSprintResponseMessage = "Dates are empty";
			
			
		}else if($scope.sprintStartDate.getTime() == $scope.sprintEndDate.getTime()){
			$scope.createSprintResponseClass ="alert alert-danger";
			$scope.createSprintResponseMessage = "Both dates shouldn't be the same!";
			
		}else if($scope.sprintStartDate.getTime() > $scope.sprintEndDate.getTime()){
			$scope.createSprintResponseClass ="alert alert-danger";
			$scope.createSprintResponseMessage = "Start date is later than end date 2";
		}else{
			console.log($scope.sprintStartDate);
			var startDate = moment($scope.sprintStartDate).format('YYYY-MM-DD');
			var endDate = moment($scope.sprintEndDate).format('YYYY-MM-DD');
			
			//var endDate = moment($scope.sprintEndDate).format('DD/MM/YYYY');
			//console.log((moment.duration($scope.sprintEndDate - $scope.sprintStartDate)).humanize());
			SprintService.CreateSprint($scope.sprintGoal, startDate, endDate, function(response){
				switch(response.success){
				case 0:
					$scope.createSprintResponseClass ="alert alert-danger";
					$scope.createSprintResponseMessage = "Server Error";
				break;
				
				case 1:
					$scope.createSprintResponseClass ="alert alert-success";
					$scope.createSprintResponseMessage = "Sprint Created.";
					//console.log('/project/' + response.project[0].projectKey +'/'+ response.project[0].projectName);
					$scope.sprintLists.push(response.sprints[0]);
					$scope.sprintListsClass = "sprintLists";
					$timeout(function(){
						$('#sprintCreateModal').modal('toggle');
						
						$('#createSprintForm').trigger("reset");
					},500);
				break;
				
				case 2:
					$scope.createSprintResponseClass ="alert alert-danger";
					$scope.createSprintResponseMessage = "Server error 2";
				break;
				
				case 3:
					$scope.createSprintResponseClass ="alert alert-danger";
					$scope.createSprintResponseMessage = "Empty field(s) detected";
				break;
				
			}
			});
		} 
		$timeout(function(){
			$scope.createSprintResponse = !$scope.createSprintResponse;
		},1000);
	}
}])

.directive('productSprint',function(){
	return{
		templateUrl : 'sprint/sprint.html',
		controller: 'SprintController',
	};
});