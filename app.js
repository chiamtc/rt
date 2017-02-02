'use strict';

angular.module('login',[]);
angular.module('header',[]);
angular.module('home',[]);
angular.module('register',[]);



angular.module('reApp',['header','login','home','register','ngRoute','ngCookies', 'ngMessages'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/',{
		controller:'LoginController',
		templateUrl:'login/login.html'
	})
	.when('/home',{
		controller:'HomeController',
		templateUrl:'home/home.html'
	})
	
	.when('/register',{
		controller:'RegisterController',
		templateUrl:'register/register.html'
	})
	.otherwise({
		redirectTo: '/'
	});
}])
.run(['$location', '$cookies',
    function ($location, $cookies) {
        // keep user logged in after page refresh
		var uid = $cookies.get('uid');
		
        if($location.path() !== '/' && uid==null) {
            $location.path('/');
		}
    }]);