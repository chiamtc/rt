'use strict';

angular.module('releases')

.controller('ReleasesController',['$scope','$filter','$routeParams','$timeout','ReleasesService',function($scope,$filter,$routeParams,$timeout,ReleasesService){

	$scope.createReleaseResponse=false;
	$scope.releaseList = [];
	NProgress.start();
	NProgress.done();
	ReleasesService.GetReleases(function(response){
		switch(response.success){
			case 1:
				$scope.releaseList = response.releases;
				console.log($scope.releaseList);
			break;
		}
	});

	$scope.createRelease= function(){
		var startDate = moment($scope.releaseStartDate).format('YYYY-MM-DD');
		var endDate = moment($scope.releaseEndDate).format('YYYY-MM-DD');
		$scope.createReleaseResponse = !$scope.createReleaseResponse;
		ReleasesService.CreateRelease($scope.releaseName, $scope.releaseDesc, startDate, endDate,function(response){
			NProgress.start();
			
			switch(response.success){
				case 1:
					$scope.createReleaseResponseClass ="alert alert-success";
					$scope.createReleaseResponseMessage = "Release Created.";
					$scope.releaseList.push(response.releases[0]);
					console.log($scope.releaseList);
					NProgress.set(0.5);
					NProgress.done();
					$timeout(function(){
						$('#releaseCreateModal').modal('toggle');
						
						$('#releaseSprintForm').trigger("reset");
					},500);
					
					
				break;
			}
		});	
		$timeout(function(){
			$scope.createReleaseResponse = !$scope.createReleaseResponse;
		},1000);
	}
	
	$scope.deleteVersion = function(releaseId){
		
		ReleasesService.DeleteRelease(releaseId,function(response){
			NProgress.start();
		switch(response.success){
			case 1:
				ReleasesService.GetReleases(function(response){
					switch(response.success){
						case 1:
							$scope.releaseList = response.releases;
							console.log($scope.releaseList);
							NProgress.set(0.5);
							NProgres.done();
							
							
						break;
						}
					});
			break;
		}
	});
	}

}]);