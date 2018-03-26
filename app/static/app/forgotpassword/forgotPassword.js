'use strict';

var ForgotPasswordController = function($scope, $http, api) {
	
	$scope.errors = {}
	
	var emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
	
	$scope.errors = {};
	
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
	
	$scope.submitEmail = function() {
		$scope.validateEmail($scope.userEmail)
	};
};
