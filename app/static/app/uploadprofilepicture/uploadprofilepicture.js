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
    
    /*
     * method to upload the user's chosen image file to the uploadURL endpoint.
     * if the chosen file is not of an image type, an error message is displayed instead.
     */
    $scope.uploadPicture = function() {
        $scope.errors = {};
        var avatar = $scope.avatar;
        var uploadURL = '/api/upload/';
        
        if(document.getElementById("avatar").files.length == 0) {
            $scope.errors.avatar = "Please select an image";
        }
        else {        
            var fd = new FormData();
            fd.append('avatar', avatar);
            $http.post(uploadURL, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
            .then(function(response){
                $scope.errors = {};
                $scope.successImage = "Upload successful! Redirecting to profile...";
                setTimeout(function() {
                    $location.path("/profile");
                    $route.reload();
                }, 3000);
            },
            function(errResponse){
                if(errResponse.status == 400){
                    $scope.errors.invalidImage = "Invalid file type";
                }
            });
        }
    };
    
    /*
     * method to upload the user's chosen file to the uploadURL endpoint as their resume.
     * if the chosen file is not a valid type to display, an error message is displayed instead
     */
    $scope.uploadResume = function() {
        $scope.errors = {};
        var resume = $scope.resume;
        var uploadURL = '/api/upload/';
        
        if(document.getElementById("resume").files.length == 0){
            $scope.errors.resume = "Please select a file";
        }
        else{
            var fd = new FormData();
            fd.append('resume', resume);
            $http.post(uploadURL, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
            .then(function(response){
                $scope.errors = {};
                $scope.successFile = "Upload successful! Redirecting to profile...";
                setTimeout(function() {
                    $location.path("/profile");
                    $route.reload();
                }, 3000);
            },
            function(errResponse){
                if(errResponse.status == 400){
                    $scope.errors.invalidFile = "Invalid file type";
                }
            });
        }
    };
        
};