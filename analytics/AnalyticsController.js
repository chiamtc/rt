'use strict';
angular.module('analytics')

.controller('AnalyticsController', ['$scope', '$routeParams','$timeout', 'AnalyticsService', function($scope, $routeParams,$timeout,AnalyticsService){

	/** fancy starts **/
    NProgress.start();
	NProgress.done();
	$scope.reportData = [];
    $scope.series = ['Series A'];
   
    $scope.onClick = function (points, evt) {
        console.log(points, evt);
    };
	
	
	AnalyticsService.GetBurnDown(function(response){
		$scope.reportData = response.burndown;
		switch(response.success){
			case 1:
			$scope.labels = response.burndown[0];
			$scope.data = $scope.reportData[1];
			break;
		}
		
	});
	$scope.hasChanged = function(){
		if($scope.reportType=='Story Point'){
			$scope.data = $scope.reportData[1];
		}else if($scope.reportType=='Business Value'){
			$scope.data = $scope.reportData[2];
		}
	}
}]);