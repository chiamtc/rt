'use strict';

angular.module('register')

.factory('RegisterService', [ '$http',function($http){
	 
	var factory = {};
	
	factory.Register = function(email, password, confPassword,callback){
		$http({
			method:"POST",
			url:"php/register/registerUser.php",
			data:{
				email: email,
				password:password,
				confPassword:confPassword
			},
			headers: { 'Content-Type': 'application/json' }
		}).then(function(response){
			console.log(response.data.success);
			callback(response.data);
		});
	};
	return factory;
}])

.directive('confirmPwd', function($interpolate, $parse) {
  return {
    require: 'ngModel',
    link: function(scope, elem, attr, ngModelCtrl) {

      var pwdToMatch = $parse(attr.confirmPwd);
      var pwdFn = $interpolate(attr.confirmPwd)(scope);

      scope.$watch(pwdFn, function(newVal) {
          ngModelCtrl.$setValidity('password', ngModelCtrl.$viewValue == newVal);
      })

      ngModelCtrl.$validators.password = function(modelValue, viewValue) {
        var value = modelValue || viewValue;
        return value == pwdToMatch(scope);
      };

    }
  }
});