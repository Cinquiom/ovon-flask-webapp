'use strict';

var ResetPasswordController = function($scope, $http, $location) {
	
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
			$http.post("http://localhost:8090/auth/resetpassword/<code>", userPasswordObject)
			.then(
                  function (response) {
                	  $location.path("/login");
                      $route.reload();
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