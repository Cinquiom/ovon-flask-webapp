'use strict';

var ForgotPasswordController = function($scope, $http) {
	
	var emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
	
	$scope.errors = {};
	
	$scope.validateEmail = function(userEmail) {
		var errors = {};
		
		if (!userEmail.email) {
			errors.email = "Email is blank";
		} else if (!emailRegex.test(userEmail.email.toString())) {
			errors.email = "Email is not valid";
		}
		
		if (!angular.equals(errors, {})) {
			console.log(errors);
			alert("Invalid submission, try again.");
		} else {
			
			var userEmailObject = JSON.stringify({email: userEmail.email});
			$http.post("http://localhost:8090/auth/forgotpassword/", userEmailObject)
			.then(
                  function (response) {
                      alert("Please check your email for a password reset code!");
                  },
                  function (errResponse) {
                  	 console.log(errResponse);
                  	 alert(errResponse.data.errorMessage);
                   }
			);
		}
	};
	
	$scope.submitEmail = function() {
		$scope.validateEmail($scope.userEmail)
	};
};
