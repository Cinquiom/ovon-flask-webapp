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
        
};