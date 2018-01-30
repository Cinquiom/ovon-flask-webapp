'use strict';

var ResetPasswordController = function($scope, $http) {
	
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
			$http.post("http://localhost:8090/auth/resetpassword/", userPassword)
			.then(
                  function (response) {
                      alert("Your Password has been reset!");
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