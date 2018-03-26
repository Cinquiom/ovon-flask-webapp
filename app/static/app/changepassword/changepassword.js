'use strict';

var ChangePasswordController = function($scope, $http, userPersistenceService, $route, $location, api) {
    
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
    
    $scope.changePassword = function() {
        
        $scope.errors = {};
        
        //Error checking for empty fields
        if(!$scope.oldPassword) {
            $scope.errors.oldPassword = "Old password is blank";
        }
        if(!$scope.newPassword1) {
            $scope.errors.newPassword1 = "New password is blank";
        }
        if(!$scope.newPassword2) {
            $scope.errors.newPassword2 = "Confirm password is blank";
        } else if (!angular.equals($scope.newPassword1, $scope.newPassword2)) {
			$scope.errors.newPassword2 = "Passwords do not match";
		}
        
        //Checking if the error list is not empty
        if(angular.equals($scope.errors, {})) {
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
                    $scope.errors.oldPassword = errResponse.data.errorMessage;
                });
        }
        
    };
        
};