'use strict';

var LoginController = function($scope, $location, $rootScope, $http) {
    $scope.submit = function() {
        $http.post("https://ovon.club/api/v1/login/", $scope.user)
        .then(function(response) {
        	$rootScope.loggedIn = true;
        	$rootScope.username = $scope.user.username;
            $location.path('/opportunities');
        }, function(errResponse) {
        	alert(errResponse.data.errorMessage);
        })
    }
};