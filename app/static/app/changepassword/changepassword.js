'use strict';

var ChangePasswordController = function($scope, $http, userPersistenceService, $route, $location, api) {
    
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
    
    $scope.changePassword = function() {
        
        var errors = {};
        
        //Error checking for empty fields
        if(!$scope.oldPassword) {
            errors.oldPassword = "Old password is blank";
        }
        else if(!$scope.newPassword1) {
            errors.newPassword1 = "New password is blank";
        }
        else if(!$scope.newPassword2) {
            errors.newPassword2 = "Confirm password is blank";
        }
        
        //Checking if the error list is not empty
        if(!angular.equals(errors, {})) {
            console.log(errors);
            alert("Ensure no fields are empty"); //Eventually change this from being an alert
        }
        else {
            var passwordObject = JSON.stringify({
            oldPassword: $scope.oldPassword,
            newPassword1: $scope.newPassword1,
            newPassword2: $scope.newPassword2});
            
            $http.post(api.changePassword, passwordObject)
            .then(
                function(response){
                    userPersistenceService.clearCookieData();
                    $location.path("/login");
                    $route.reload();
                },
                function(errResponse){
                    console.log(errResponse);
                });
        }
        
    };
        
};