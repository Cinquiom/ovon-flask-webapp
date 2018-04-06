'use strict';

var UpdateProfileController = function($scope, $http, $route, $location, api) {
	
	$scope.errors = {};
	
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
    
    $http.get(api.getProfileEmail)
    .then(function (response) {
        $scope.profileEmail = response.data;
    });
    
    $http.get(api.getProfileFullName)
    .then(function (response) {
        $scope.profileFullName = response.data;
    });
    
    $http.get(api.getProfileBio)
    .then(function (response) {
        $scope.profileBio = response.data;
    });
    
    /*
     * method to update the user's profile with the information entered in the input fields.
     * if there are no errors with the user's input, the inputted information is posted to the updateProfile endpoint
     */
    $scope.updateInfo = function() {
    
        $scope.errors = {};
        
        //Error checking for empty fields
        if(!$scope.profileFullName) {
            $scope.errors.profileFullName = "Full name is blank";
        }
        else if(!$scope.profileEmail) {
            $scope.errors.profileEmail = "Email is blank";
        }        
        
        //Checking if the error list is not empty
        if(angular.equals($scope.errors, {})) {
            var profileInfoObject = JSON.stringify({
            profileFullName: $scope.profileFullName,
            profileEmail: $scope.profileEmail,
            profileBio: $scope.profileBio});
            
            $http.post(api.updateProfile, profileInfoObject)
            .then(
                function(response){
                    $scope.errors = {};
                    $scope.success = "Update successful! Redirecting to profile...";
                    setTimeout(function() {
                        $location.path("/profile");
                        $route.reload();
                    }, 3000);
                },
                function(errResponse){
                    $scope.errors.profileEmail = errResponse.data.errorMessage;
                });
        }
    };
    
};
