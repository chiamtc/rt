'use strict';
angular.module('project')

.controller('ProjectController', ['$scope','$cookies','$routeParams',function($scope,$cookies, $routeParams){
	$scope.colSize = false;
	

	$scope.close = function(){
		$scope.colSize = false;
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