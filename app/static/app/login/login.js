'use strict';

var LoginController = function($scope, $location, $rootScope, $http, userPersistenceService) {
    $scope.submit = function() {
        $http.post("http://localhost:8090/auth/signin/", $scope.user)
        .then(function(response) {
        	$rootScope.loggedIn = true;
        	$rootScope.username = $scope.user.username;
        	userPersistenceService.clearCookieData;
        	userPersistenceService.setCookieData_userName($rootScope.username);
        	userPersistenceService.setCookieData_LoggedInAlready();
            $location.path('/opportunities');
        }, function(errResponse) {
        	alert(errResponse.data.errorMessage);
        })
    }
};
