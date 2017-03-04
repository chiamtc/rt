'use strict';

angular.module('login',[]);
angular.module('header',[]);
angular.module('home',[]);
angular.module('register',[]);
angular.module('project',[]);
angular.module('sidebar',[]);
angular.module('backlog',[]);
angular.module('sprint',[]);
angular.module('backlog-details',[]);
angular.module('active-sprint',[]);
<<<<<<< HEAD
angular.module('task-details',[]);
angular.module('review',[]);
angular.module('analytics',[]);
angular.module('issues',[]);
angular.module('side-issues',[]);
angular.module('main-issues',[]);
=======
angular.module('task-details',[]),
angular.module('review',[]),
angular.module('analytics',[]),
angular.module('issues',[]),
angular.module('side-issues',[]),
angular.module('main-issues',[]),
>>>>>>> 63b08976d6018f6431705f547af9a9a690221b69

angular.module('reApp',['header','login','home','register','project','sidebar','backlog','sprint','backlog-details','active-sprint','task-details','review','analytics','issues','side-issues','main-issues','ngDragDrop','ngRoute','ngCookies', 'ngMessages','chart.js'])

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
	
	.when('/analytics/:projectKey/:projectSeo',{
		controller:'AnalyticsController',
		templateUrl:'analytics/analytics.html'
	})
	
	.when('/issues/:projectKey/:projectSeo',{
		controller:'IssuesController',
		templateUrl:'issues/issues.html'
	})
	
	.when('/register',{
		controller:'RegisterController',
		templateUrl:'register/register.html'
	})
	
	.when('/project/:projectKey/:projectSeo',{
		controller : 'ProjectController',
		templateUrl:'project/project.html'
	})
	
	.when('/active-sprint/:projectKey/:projectSeo',{
		controller : 'ActiveSprintController',
		templateUrl:'active-sprint/active-sprint.html'
	})
	
	.when('/review/:projectKey/:projectSeo',{
		controller:'ReviewController',
		templateUrl:'review/review.html'
	})
	
	.otherwise({
		redirectTo: 'error/404.html',
		templateUrl: 'error/404.html'
	});
}])
.run(['$location', '$cookies',
    function ($location, $cookies) {
        // keep user logged in after page refresh
		var uid = $cookies.get('uid');
		
        if($location.path() !== '/' && uid==null) {
            $location.path('error/404.html');
		}
    }]);