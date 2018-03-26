'use strict';

var ResetPasswordController = function($scope, $http, $location, $stateParams, $state, api) {
	
	$scope.errors = {};
	
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