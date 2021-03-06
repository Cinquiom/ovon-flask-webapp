'use strict';

// The main 'app' object
var OVONApp = angular.module('OVONApp', ['ui.router', 'ui.bootstrap', 'ngRoute', 'ngCookies', 'ngSQLite', 'jkAngularRatingStars']);

OVONApp.constant('api', {
	signIn: apiURL + '/auth/signin/',
    register: apiURL + '/auth/register/',
    whoAmI: apiURL + '/auth/whoami/',
    forgotPassword: apiURL + '/auth/forgotpassword/',
    resetPassword: apiURL + '/auth/resetpassword/',
    getProfileEmail: apiURL + '/auth/getProfileEmail/',
    getProfileFullName: apiURL + '/auth/getProfileFullName/',
    getProfileCreationDate: apiURL + '/auth/getProfileCreationDate/',
    updateProfile: apiURL + '/auth/updateProfile/',
    changePassword: apiURL + '/auth/changePassword/',
    getProfileBio: apiURL + '/auth/getProfileBio/',
    postVolunteerPool: apiURL + '/api/activity/',
    registerOrganization: apiURL + '/api/organizations/',
    postOpportunity: apiURL + '/api/organizations/opportunities/',
    getUserOrganizations: apiURL + '/api/currentuser/organizations/',
    volunteerRating: apiURL + '/api/users/ratings/',
    organizationRating: apiURL + '/api/organizations/ratings/',
    userFavourites: apiURL + '/api/users/favourites/',
    opportunityFavourites: apiURL + '/api/opportunities/favourites/',
    volunteerFavourited: apiURL + '/api/volunteers/favourites/',
    getOpportunitiesWithTag: apiURL + '/api/tags/opportunities/',
    getVolunteersWithTag: apiURL + '/api/tags/activities/',
    TagsForOpportunity: apiURL + '/api/opportunities/tags/',
    TagsForVolunteer: apiURL + '/api/activities/tags/',
    organizationFavourites: apiURL + '/api/organizations/favourites/',
    getUserInfo: apiURL + '/api/users/',
    upload: apiURL + '/api/upload/',
    getUserAvatar: apiURL + '/api/avatars/',
    getUserResume: apiURL + '/api/resumes/',
    getCurrentUser: apiURL + '/api/currentuser/'
    
    
});

OVONApp.controller("DefaultController", DefaultController);
OVONApp.controller("OpportunitiesController", OpportunitiesController);
OVONApp.controller("VolunteerPoolController", VolunteerPoolController);
OVONApp.controller("ProfileController", ProfileController);
OVONApp.controller("RegisterController", RegisterController);
OVONApp.controller("LoginController", LoginController);
OVONApp.controller("ForgotPasswordController", ForgotPasswordController);
OVONApp.controller("ResetPasswordController", ResetPasswordController);
OVONApp.controller("UpdateProfileController", UpdateProfileController);
OVONApp.controller("ChangePasswordController", ChangePasswordController);
OVONApp.controller("UploadProfilePictureController", UploadProfilePictureController);
OVONApp.controller("CreateVolunteerPostController", CreateVolunteerPostController);
OVONApp.controller("CreateOpportunityPostController", CreateOpportunityPostController);
OVONApp.controller("RegisterOrganizationController", RegisterOrganizationController);
OVONApp.controller("MyOrganizationsController", MyOrganizationsController);


OVONApp.config(function ($stateProvider, $urlRouterProvider, $routeProvider, $locationProvider) {

    $routeProvider.
        when('/opportunities', {
                      resolve: {
                          "check": function($location, $rootScope, userPersistenceService, $cookies, $window) {
                              if(!($cookies.get('loggedInAlready') || userPersistenceService.getCookieData("loggedInAlready") == false)) {
                            	  $location.path('/login')
                            	  $window.location.href = "/#/login"
                            	  $window.location.reload()
                                                                    
                              }
                          }
                      },
                  }).
        when('/volunteers', {
                    resolve: {
                    	"check": function($location, $rootScope, userPersistenceService, $cookies, $route, $window) {
                            if(!($cookies.get('loggedInAlready') || userPersistenceService.getCookieData("loggedInAlready") == false)) {
                                $location.path('/login')
                                $window.location.href = "/#/login"
                            	$window.location.reload()
                                
                            }
                        }
                    },
                })
                .
        when('/profile', {
                    resolve: {
                    	"check": function($location, $rootScope, userPersistenceService, $cookies, $route, $window) {
                            if(!($cookies.get('loggedInAlready') || userPersistenceService.getCookieData("loggedInAlready") == false)) {
                                $location.path('/login')
                                $window.location.href = "/#/login"
                            	$window.location.reload()
                            }
                        }
                    },
                }).
        when('/createvolunteerpost', {
                    resolve: {
                    	"check": function($location, $rootScope, userPersistenceService, $cookies, $route, $window) {
                            if(!($cookies.get('loggedInAlready') || userPersistenceService.getCookieData("loggedInAlready") == false)) {
                                $location.path('/login')
                                $window.location.href = "/#/login"
                            	$window.location.reload()
                            }
                        }
                    },
                })
                .
        when('/createopportunitypost', {
                    resolve: {
                    	"check": function($location, $rootScope, userPersistenceService, $cookies, $route, $window) {
                            if(!($cookies.get('loggedInAlready') || userPersistenceService.getCookieData("loggedInAlready") == false)) {
                                $location.path('/login')
                                $window.location.href = "/#/login"
                            	$window.location.reload()
                            }
                        }
                    },
                })
                .             
        when('/registerorganization', {
                    resolve: {
                    	"check": function($location, $rootScope, userPersistenceService, $cookies, $route, $window) {
                            if(!($cookies.get('loggedInAlready') || userPersistenceService.getCookieData("loggedInAlready") == false)) {
                                $location.path('/login')
                                $window.location.href = "/#/login"
                            	$window.location.reload()
                            }
                        }
                    },
                })
                .                
                when('/updateprofile', {
                resolve: {
                	"check": function($location, $rootScope, userPersistenceService, $cookies, $route, $window) {
                        if(!($cookies.get('loggedInAlready') || userPersistenceService.getCookieData("loggedInAlready") == false)) {
                            $location.path('/login')
                            $window.location.href = "/#/login"
                            $window.location.reload()
                        }
                    }
                },
            });

    $urlRouterProvider.otherwise("/default");

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
            templateUrl: "static/app/updateprofile/updateProfile.html",
            controller: "UpdateProfileController"
        }).
        state("/changepassword", {
            url: "/changepassword",
            templateUrl: "static/app/changepassword/changepassword.html",
            controller: "ChangePasswordController"
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
            templateUrl: "static/app/forgotpassword/forgotPassword.html",
            controller:	"ForgotPasswordController"
        }).
        state("/uploadprofilepicture", {
            url: "/uploadprofilepicture",
            templateUrl: "static/app/uploadprofilepicture/uploadprofilepicture.html",
            controller: "UploadProfilePictureController"
        }).
        state("/resetpassword/:param1", {
            url: "/resetpassword/:param1",
            templateUrl: "static/app/resetpassword/resetPassword.html",
            controller:	"ResetPasswordController"
        }).
        state("/createvolunteerpost", {
            url: "/createvolunteerpost",
            templateUrl: "static/app/createvolunteerpost/createVolunteerPost.html",
            controller:	"CreateVolunteerPostController"
        }).
        state("/createopportunitypost", {
            url: "/createopportunitypost",
            templateUrl: "static/app/createopportunitypost/createOpportunityPost.html",
            controller:	"CreateOpportunityPostController"
        }).
        state("/registerorganization", {
            url: "/registerorganization",
            templateUrl: "static/app/registerorganization/registerOrganization.html",
            controller:	"RegisterOrganizationController"
        }).
        state("/default", {
            url: "/default",
            templateUrl: "static/app/default/default.html"
        }).
        state("/loginTest", {
            url: "/loginTest",
            templateUrl: "static/app/login/loginTest.html"
        }).
        state("/myorganizations", {
            url: "/myorganizations",
            templateUrl: "static/app/myorganizations/myOrganizations.html",
            controller: "MyOrganizationsController"
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
        templateUrl: "/static/app/core/header.html",
        controller: ['$scope', '$filter', '$http', '$route', 'userPersistenceService', '$location', '$window', function ($scope, $filter, $http, $route, userPersistenceService, $location, $window) {
        	$scope.notLoggedIn = true;
        	$scope.loggedInUser = "";
        	
        	$scope.logout = function() {
        		$http.get(apiURL + '/auth/signout/').then(function(response){
        		});
        		userPersistenceService.clearCookieData();
        		$route.reload();
        		$location.path('/login')
                $window.location.href = "/#/login"
            	$window.location.reload()
        	}
        	
        	$http.get(apiURL + '/api/currentuser/').then(function(response){
                if (response.status == 200) {
                	$scope.notLoggedIn = false;
                	$scope.loggedInUser = response.data.username;
                }
            },
            function (errResponse) {
            	if (errResponse.status == 401) {
            		$scope.notLoggedIn = true;
            	}
             });
        }]
    }
}]);

//service to get opportunity posts dynamically
OVONApp.factory("OpportunitiesService", function($http) {
	return {
		getOpportunityPosts: function() {
			return $http.get(apiURL + '/api/organizations/opportunities/').then(function(response) {
				return angular.fromJson(response.data);
			});
		}
	}
})

//service to get volunteer posts dynamically
OVONApp.factory("VolunteerService", function($http) {
	return {
		getVolunteerPosts: function() {
			return $http.get(apiURL + '/api/activity/').then(function(response) {
				return angular.fromJson(response.data);
			});
		}
	}
})

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

OVONApp.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);
