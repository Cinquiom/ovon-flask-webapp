'use strict';

var ResetPasswordController = function($scope, $http, $location, $stateParams, $state, api) {
	
	$scope.errors = {};
	
	/*
	 * method to check the user's new password entry for validity.
	 * if there is an error with the entry, an error message is shown to the user,
	 * otherwise the user's entry is posted to the resetPassword endpoint
	 */
	$scope.validateNewPassword = function(userPassword) {
		$scope.errors = {};
		
		if (!userPassword.password || !userPassword.password2) {
			$scope.errors.password = "Please fill in the password fields.";
		} else if (!angular.equals(userPassword.password, userPassword.password2)) {
			$scope.errors.password = "Passwords do not match.";
		}
		
		if (angular.equals($scope.errors, {})) {
			var userPasswordObject = JSON.stringify({password: userPassword.password, password2: userPassword.password2});
			$http.post(api.resetPassword + $stateParams.param1, userPasswordObject)
			.then(
                  function (response) {
                	  $scope.errors = {};
                	  //on a successful password reset the user is redirected to login
                      $scope.success = "Your password has been reset!  Redirecting to login...";
					  setTimeout(function() {
						  $location.path("/login");
						  $route.reload();
					  }, 3000);                 
                  },
                  function (errResponse) {
                  	 $scope.errors.password = errResponse.data.errorMessage;
                   }
			);
		}
	};
	
	$scope.submitNewPassword = function() {
		$scope.validateNewPassword($scope.userPassword)
	};
	
};