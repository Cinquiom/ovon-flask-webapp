'use strict';

var UpdateProfileController = function($scope, $http, userPersistenceService, $route, $location) {
    
    $scope.linkToUpdateProfile = function() {
        $location.path("/updateprofile");
        $route.reload();
    }
    
    $scope.linkToChangePassword = function() {
        $location.path("/changepassword");
        $route.reload();
    }
    
    $scope.linkToUploadProfilePicture = function() {
        $location.path("/uploadprofilepicture");
        $route.reload();
    }
        
};
