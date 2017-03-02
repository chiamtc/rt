'use strict';
angular.module('analytics')

.controller('AnalyticsController', ['$scope', '$routeParams','$timeout', 'BacklogService','SprintService', function($scope, $routeParams,$timeout,BacklogService, SprintService){

	/** fancy starts **/
    NProgress.start();
	NProgress.done();

    $scope.labels = ["12/11", "13/11", "14/11", "15/11", "16/11", "17/11", "18/11"];
    $scope.series = ['Series A'];
    $scope.data = [[65, 59, 80, 81, 56, 55, 40]];
    $scope.onClick = function (points, evt) {
        console.log(points, evt);
    };
}]);