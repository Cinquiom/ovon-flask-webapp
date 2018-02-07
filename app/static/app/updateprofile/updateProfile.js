'use strict';

var UpdateProfileController = function($scope, $http, $route, $location) {
    
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
    
    $http.get("http://localhost:8090/auth/getProfileEmail/")
    .then(function (response) {
        $scope.profileEmail = response.data;
    });
    
    $http.get("http://localhost:8090/auth/getProfileFullName/")
    .then(function (response) {
        $scope.profileFullName = response.data;
    });
    
    $scope.updateInfo = function() {
    
        var errors = {};
        
        //Error checking for empty fields
        if(!$scope.profileFullName) {
            errors.profileFullName = "Full name is blank";
        }
        else if(!$scope.profileEmail) {
            errors.profileEmail = "Email is blank";
        }
        
        
        //Checking if the error list is not empty
        if(!angular.equals(errors, {})) {
            console.log(errors);
            alert("Ensure no fields are empty");
        }
        else{
            var profileInfoObject = JSON.stringify({
            profileFullName: $scope.profileFullName,
            profileEmail: $scope.profileEmail});
            
            $http.post("http://localhost:8090/auth/updateProfile", profileInfoObject)
            .then(
                function(response){
                    $location.path("/profile");
                    $route.reload();
                },
                function(errResponse){
                    console.log(errResponse);
                });
        }
    };
    
};
