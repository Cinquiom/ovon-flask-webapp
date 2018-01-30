'use strict';

// The main 'app' object
var OVONApp = angular.module('OVONApp', ['ui.router', 'ngRoute', 'ngCookies', 'ngSQLite']);

OVONApp.controller("OpportunitiesController", OpportunitiesController);
OVONApp.controller("VolunteerPoolController", VolunteerPoolController);
OVONApp.controller("ProfileController", ProfileController);
OVONApp.controller("RegisterController", RegisterController);
OVONApp.controller("LoginController", LoginController);


OVONApp.config(function ($stateProvider, $urlRouterProvider, $routeProvider, $locationProvider) {

    $routeProvider.
        when('/opportunities', {
                      resolve: {
                          "check": function($location, $rootScope, userPersistenceService, $cookies) {
                              if(!($cookies.get('loggedInAlready') || userPersistenceService.getCookieData("loggedInAlready") == false)) {
                                  $location.path('/login')
                              }
                          }
                      },
                  }).
        when('/volunteers', {
                    resolve: {
                    	"check": function($location, $rootScope, userPersistenceService, $cookies) {
                            if(!($cookies.get('loggedInAlready') || userPersistenceService.getCookieData("loggedInAlready") == false)) {
                                $location.path('/login')
                            }
                        }
                    },
                })
                .
        when('/profile', {
                    resolve: {
                    	"check": function($location, $rootScope, userPersistenceService, $cookies) {
                            if(!($cookies.get('loggedInAlready') || userPersistenceService.getCookieData("loggedInAlready") == false)) {
                                $location.path('/login')
                            }
                        }
                    },
                })
                .
                when('/updateprofile', {
                resolve: {
                	"check": function($location, $rootScope, userPersistenceService, $cookies) {
                        if(!($cookies.get('loggedInAlready') || userPersistenceService.getCookieData("loggedInAlready") == false)) {
                            $location.path('/login')
                        }
                    }
                },
            })
                ;

    $urlRouterProvider.otherwise("/opportunities");

    $stateProvider.
        state("/opportunities", {
            url: "/opportunities",
            templateUrl: "static/app/opportunities/opportunities.html",
            controller: "OpportunitiesController"
        }).
        state("/volunteers", {
            url: "/volunteers",
            templateUrl: "static/app/volunteerpool/volunteerpool.html",
            controller: "VolunteerPoolController"
        }).
        state("/profile", {
            url: "/profile",
            templateUrl: "static/app/profile/profile.html",
            controller: "ProfileController"
        }).
        state("/updateprofile", {
            url: "/updateprofile",
            templateUrl: "static/app/updateprofile/updateProfile.html"
        }).
        state("/changepassword", {
            url: "/changepassword",
            templateUrl: "static/app/changepassword/changepassword.html"
        }).
        state("/login", {
            url: "/login",
            templateUrl: "static/app/login/login.html"
        }).
        state("/register", {
            url: "/register",
            templateUrl: "static/app/register/register.html",
            controller: "RegisterController"
        }).
        state("/forgotpassword", {
            url: "/forgotpassword",
            templateUrl: "static/app/forgotpassword/forgotpassword.html"
        })
        .state("/loginTest", {
            url: "/loginTest",
            templateUrl: "static/app/login/loginTest.html"
        });

    $locationProvider.hashPrefix('');
    
});


OVONApp.directive('footer', function () {
    return {
        restrict: 'A',
        replace: true,
        templateUrl: "static/app/core/footer.html",
        controller: ['$scope', '$filter', function ($scope, $filter) {
            // Your behaviour goes here :)
        }]
    }
});

OVONApp.directive('header', [ '$rootScope', function ($rootScope) {
    return {
        restrict: 'A', 
        replace: true,
        scope: {username: '='}, // This is one of the cool things :). Will be explained in post.
        templateUrl: "static/app/core/header.html",
        controller: ['$scope', '$filter', function ($scope, $filter) {
        }]
    }
}]);

//service to handle cookie data for user logged in status
OVONApp.factory('userPersistenceService', ['$cookies', function($cookies) {
	var loggedInAlready = false;
	var cookieData;
	var userName = "";
	
	return {
			setCookieData_LoggedInAlready: function() {
				
				loggedInAlready = true;
				$cookies.put("loggedInAlready", loggedInAlready);
			},
			
			setCookieData_userName: function(username) {
				
				userName = username;
				$cookies.put("userName", userName);
			},
			
			getCookieData: function(desiredCookie) {
				
				if (desiredCookie == "loggedInAlready") {
					cookieData = $cookies.get("loggedInAlready");
					
				}
				else if (desiredCookie == "userName") {
					cookieData = $cookies.get("userName");
					
				}
				
				return cookieData;				
				
			},
			
			clearCookieData: function() {
				
				loggedInAlready = false;
				userName = "";
				$cookies.remove("loggedInAlready");
				$cookies.remove("userName");
			}
		}
	}
]);
