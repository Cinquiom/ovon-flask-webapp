'use strict';

var LoginController = function($scope, $route, $location, $rootScope, $http, userPersistenceService, api) {
    $scope.submit = function() {
        $http.post(api.signIn, $scope.user)
        .then(function(response) {
        	$rootScope.loggedIn = true;
        	$rootScope.username = $scope.user.username;
        	userPersistenceService.clearCookieData;
        	userPersistenceService.setCookieData_userName($rootScope.username);
        	userPersistenceService.setCookieData_LoggedInAlready();
            $location.path('/opportunities');
            $route.reload();
        }, function(errResponse) {
        	alert(errResponse.data.errorMessage);
        })
    }
};
