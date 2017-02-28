'use strict';

angular.module('review')

.controller('ReviewController',['$scope', '$timeout','$routeParams', '$cookies','ReviewService', function($scope, $timeout,$routeParams, $cookies,ReviewService){
	
	/** fancy starts **/
	NProgress.start();
	NProgress.done();
	
	/** UI binding(s)**/
	$scope.emptySprintReviewResponse = false;
	$scope.sprintListsDone = [];	
	
	/** UI function(s) **/
	
	ReviewService.ListDoneSprints(function(response){
		switch(response.success){
			case 1:
				if(response.doneSprints.length == 0){
					$scope.emptySprintReviewResponse = !$scope.emptySprintReviewResponse;
					$scope.emptySprintReviewResponseMessage = "undone backlogs";
				}else{
					$scope.sprintListsDone = response.doneSprints;
				}
				
			break;
			
			case 0:
				$scope.emptySprintReviewResponse = !$scope.emptySprintReviewResponse;
				$scope.emptySprintReviewResponseMessage = "You currently do not have any active sprint to review or completed sprint has undone backlogs.";
			break;
		}
	});
	
	$scope.acceptBacklog = function(backlogId,sprintId,reviewComment){
		console.log(reviewComment);
		
		ReviewService.AcceptBacklog(backlogId, sprintId, reviewComment,function(response){
			
			switch(response.success){
				case 1:
				
				ReviewService.ListDoneSprints(function(response){
					switch(response.success){
						case 1:
							console.log(response.doneSprints);
							$scope.sprintListsDone = response.doneSprints;
							$scope.snackbarShow = !$scope.snackbarShow;
							$scope.snackbarClass= "alert alert-success alert-dismissible snackbar";
							$scope.snackbarMessage = "Reviewed ! ";
							
							$timeout(function(){
								$scope.snackbarShow = !$scope.snackbarShow;
							},3000);
						break;
					}
				});
				break;
				
				case 2:
					$scope.sprintListsDone = [];
					$scope.snackbarShow = !$scope.snackbarShow;
					$scope.snackbarClass= "alert alert-success alert-dismissible snackbar";
					$scope.snackbarMessage = "Sprint reviewed successfully! ";
					$timeout(function(){
						$scope.snackbarShow = !$scope.snackbarShow;
					},3000);
				break;
				
				case 0:
					
				break;
			}
		});
	}
	
	$scope.rejectBacklog = function(backlogId,sprintId){
		ReviewService.RejectBacklog(backlogId, sprintId,function(response){
			switch(response.success){
				case 1:
				ReviewService.ListDoneSprints(function(response){
					switch(response.success){
						case 1:
							console.log(response.doneSprints);
							$scope.sprintListsDone = response.doneSprints;
							$scope.snackbarShow = !$scope.snackbarShow;
							$scope.snackbarClass= "alert alert-success alert-dismissible snackbar";
							$scope.snackbarMessage = "Backlog Rejected :( ";
							$timeout(function(){
								$scope.snackbarShow = !$scope.snackbarShow;
							},3000);
						break;
					}
				});
				break;
				
				case 2:
					$scope.sprintListsDone = [];
					$scope.snackbarShow = !$scope.snackbarShow;
					$scope.snackbarClass= "alert alert-success alert-dismissible snackbar";
					$scope.snackbarMessage = "Sprint reviewed successfully! ";
					$timeout(function(){
						$scope.snackbarShow = !$scope.snackbarShow;
					},3000);
				break;
				
				case 0:
					
				break;
			}
		});
	}
	
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
}]);