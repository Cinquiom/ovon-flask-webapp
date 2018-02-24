'use strict';

var ResetPasswordController = function($scope, $http, $location, $stateParams, $state, api) {
	
	$scope.errors = {};
	
	$scope.validateNewPassword = function(userPassword) {
		var errors = {};
		
		if (!userPassword.password) {
			errors.password = "Password is blank";
		} else if (!userPassword.password2) {
			errors.password2 = "Please confirm your new password";
		}
		
		if (!angular.equals(errors, {})) {
			console.log(errors);
			alert("Invalid submission, try again.");
		} else {
			
			var userPasswordObject = JSON.stringify({password: userPassword.password, password2: userPassword.password2});
			$http.post(api.resetPassword + $stateParams.param1, userPasswordObject)
			.then(
                  function (response) {
                	  alert("Your Password has been reset!");
                	  $location.path("/login");
                      $route.reload();                      
                  },
                  function (errResponse) {
                  	 console.log(errResponse);
                  	 alert(errResponse.data.errorMessage);
                   }
			);
		}
	};
	
	$scope.submitNewPassword = function() {
		$scope.validateNewPassword($scope.userPassword)
	};
	
};