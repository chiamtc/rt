'use strict';

angular.module('active-sprint')

.controller('ActiveSprintController',['$scope','ActiveSprintService','$http', '$routeParams', '$cookies', function($scope,ActiveSprintService,$http, $routeParams, $cookies){
	/** fancy starts **/
	NProgress.start();
	NProgress.done();
	$scope.backlogActive = [];
	$scope.taskActive =[];
	$scope.colSize = false;
	$scope.emptyActiveSprintResponse = false;
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
		console.log("bid of drop" + bid +  " and draggedi d" + $scope.draggedId);
		if(bid == $scope.draggedId){
			$scope.droppable = true;
			console.log($scope.droppable);
		}else{
			$scope.droppable = false;
			console.log($scope.droppable);
		}
	}
	
	$scope.dropCallback4 = function(event, ui, item) {
		console.log("Tasks title: " + $scope.draggedTitle.tasksTitle+ " status:" +$scope.draggedTitle.tasksStatus + " and "+ item); 
		$scope.draggedTitle.tasksStatus = "To-do";
	};
	
	$scope.dropCallback5 = function(event, ui, item) {
		console.log("Tasks title: "  + $scope.draggedTitle.tasksTitle+ " status:" + $scope.draggedTitle.tasksStatus + " and "+ item); 
		$scope.draggedTitle.tasksStatus = "In-Progress";
		
	};
	
	$scope.dropCallback6 = function(event, ui, item) {
		console.log("Tasks title: "  + $scope.draggedTitle.tasksTitle+ " status:" + $scope.draggedTitle.tasksStatus + " and "+ item); 
		$scope.draggedTitle.tasksStatus = "Done";
		
	};
	
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
	
	$scope.close = function(){
		$scope.colSize = false;
	}
}]);