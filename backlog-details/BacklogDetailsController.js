'use strict';
angular.module('backlog-details')

.controller('BacklogDetailsController', ['$scope','$timeout','BacklogDetailsService','SprintService','BacklogService', function($scope, $timeout,BacklogDetailsService, SprintService, BacklogService){
	
	/** fancy starts **/
	NProgress.start();
	NProgress.done();
	
	/** UI bindings **/
	$scope.passBacklog = [];
	$scope.copyBacklog = [];
	$scope.commentLists = [];
	$scope.snackbarShow = false;
	/** UI functions **/
	
	$scope.toggle = function(backlog){
		if(backlog.backlogId == null){
		
		}else{
			$scope.colSize = true;
			$scope.passBacklog = backlog;
			$scope.copyBacklog = angular.copy($scope.passBacklog);
			$scope.backlogDDesc = $scope.passBacklog.backlogDesc;
			
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
		}
	}
	
	$scope.retain = function(){
		$scope.backlogDTitle = $scope.passBacklog.backlogTitle;
		$scope.backlogDType = $scope.passBacklog.backlogType;
		$scope.backlogDStoryPoint = $scope.passBacklog.backlogStoryPoint;
		$scope.backlogDPriority = $scope.passBacklog.backlogPriority;
		$scope.backlogDDesc = $scope.passBacklog.backlogDesc;
	}
	
	$scope.updateTitle = function(){
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
					
					$scope.commentLists.push(response.comment[0]);
					$scope.backlogDComment = "";
					console.log($scope.commentLists);
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