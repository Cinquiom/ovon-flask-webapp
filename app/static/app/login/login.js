'use strict';

var LoginController = function($scope, $route, $location, $window, $rootScope, $http, userPersistenceService, api) {
	$scope.errorMessage = "";
	
	/*
	 * sends the user's entered credentials to the signIn endpoint
	 * a successful sign in causes the username and user session cookie to be reset for the newly logged in user
	 * in which case the user is also redirected to the opportunities view
	 * if login was unsuccessful, an error message is displayed to the user  
	 */
    $scope.submit = function() {
		$scope.errorMessage = "";
        $http.post(api.signIn, $scope.user)
        .then(function(response) {
        	$rootScope.loggedIn = true;
        	$rootScope.username = $scope.user.username;
        	userPersistenceService.clearCookieData;
        	userPersistenceService.setCookieData_userName($rootScope.username);
        	userPersistenceService.setCookieData_LoggedInAlready();
            $location.path('/opportunities');
            $route.reload();
            $window.location.href = "/#/opportunities";
            $window.location.reload();
        }, function(errResponse) {
        	$scope.errorMessage = errResponse.data.errorMessage;
        })
    }
};
