'use strict';

var UploadProfilePictureController = function($scope, $http, userPersistenceService, $route, $location, api) {
    
	$http.get('/static/json/navtop.json').then(function(response) {
		$scope.navtop = response.data;
	});
	
	$scope.linkToUpdateProfile = function() {
        $location.path("/updateprofile");
        $route.reload();
    };
    
    $scope.linkToChangePassword = function() {
        $location.path("/changepassword");
        $route.reload();
    };
    
    $scope.linkToUploadProfilePicture = function() {
        $location.path("/uploadprofilepicture");
        $route.reload();
    };
    
    $scope.routeToProfile = function() {
        $location.path("/profile");
        $route.reload();
    };
    
    $scope.uploadPicture = function() {
        $scope.errors = {};
        
        if(document.getElementById("avatar").files.length == 0) {
            $scope.errors.avatar = "Please select an image";
        }
        
        
        if(angular.equals($scope.errors, {})) {
            $http.post(api.upload, $scope.avatar)
            .then(function(response) {               
                    $location.path("/profile");
                    $route.reload();
                });
        }
    };
    
    $scope.uploadResume = function() {
        $scope.errors = {};
        
        if(document.getElementById("resume").files.length == 0) {
            $scope.errors.resume = "Please select a file";
        }
        
        
        if(angular.equals($scope.errors, {})) {
            $http.post(api.upload, $scope.resume)
            .then(function(response) {               
                    $location.path("/profile");
                    $route.reload();
                });
        }
    };
        
};