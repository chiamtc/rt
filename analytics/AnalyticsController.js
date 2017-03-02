'use strict';
angular.module('analytics')

.controller('AnalyticsController', ['$scope', '$routeParams','$timeout', 'BacklogService','SprintService', function($scope, $routeParams,$timeout,BacklogService, SprintService){

	/** fancy starts **/
	NProgress.start();
	NProgress.done();
	  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Series A'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
  $scope.options = {
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        }
      ]
    }
  };
}]);