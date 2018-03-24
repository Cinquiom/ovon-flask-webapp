'use strict';

var RegisterController = function($scope, $http, api, $route, $location) {
	
	var emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
	
	$scope.errors = {};
	
	$scope.validateUser = function(user) {
		$scope.errors = {};
		$scope.success = ""
		
		if (!user) { user = {}; }
		
		if (!user.username) 
			$scope.errors.username = "Please enter a username.";
		if (!user.password) 
			$scope.errors.password = "Please enter a password.";
		
		if (!user.email) {
			$scope.errors.email = "Please enter an email.";
		} else if (!emailRegex.test(user.email.toString())) {
			$scope.errors.email = "Email is not valid.";
		}
			
		if (!user.fullname) 
			$scope.errors.fullname = "Please enter your name.";
		
		if (user.password != user.passwordconfirm) 
			$scope.errors.passwordconfirm = "Passwords do not match.";
		
		if (user.gender == null) 
			$scope.errors.gender = "Please select a gender.";
		
		if (angular.equals($scope.errors, {})) {
			 $http.post(api.register, user)
			 	.then(
                  function (response) {
					  $scope.errors = {}
                      $scope.success = "Account created successfully!  Redirecting to login...";
					  setTimeout(function() {
						  $location.path("/login");
						  $route.reload();
					  }, 3000);
                  },
                  function (errResponse) {
                 	 $scope.errors.response = errResponse.data.errorMessage;
                  }
              );
		}
	};
	
	$scope.submit = function() {
		$scope.validateUser($scope.user)
	};
};
