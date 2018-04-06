'use strict';

var ForgotPasswordController = function($scope, $http, api) {
	
	$scope.errors = {}
	
	var emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
	
	$scope.errors = {};
	
	/*
	 * method to check for errors with user email entry and pass the entered email address to the forgotPassword endpoint
	 * if errors are found, a message revealing the errors to the user is displayed instead
	 */
	$scope.validateEmail = function(userEmail) {
		$scope.errors = {};
		
		if (!userEmail) { userEmail = {}; }
		
		if (!userEmail.email) {
			$scope.errors.email = "Please enter an email address.";
		} else if (!emailRegex.test(userEmail.email.toString())) {
			$scope.errors.email = "Please enter a valid email address.";
		}
		
		if (angular.equals($scope.errors, {})) {
			
			var userEmailObject = JSON.stringify({email: userEmail.email});
			$http.post(api.forgotPassword, userEmailObject)
			.then(
                  function (response) {
                      $scope.success = "Please check your email for a password reset code!";
                  },
                  function (errResponse) {
                  	 $scope.errors.email = errResponse.data.errorMessage;
                   }
			);
		}
	};
	
	//runs the validateEmail method with the entered email address as the parameter
	$scope.submitEmail = function() {
		$scope.validateEmail($scope.userEmail)
	};
};
