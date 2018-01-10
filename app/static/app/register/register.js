'use strict';

var RegisterController = function($scope, $http) {
	
	var emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
	
	$scope.errors = {};
	
	$scope.validateUser = function(user) {
		var errors = {};
		
		if (!user.username) 
			errors.username = "Username is blank";
		if (!user.password) 
			errors.password = "Password is blank";
		
		if (!user.email) {
			errors.email = "Email is blank";
		} else if (!emailRegex.test(user.email.toString())) {
			errors.email = "Email is not valid";
		}
			
		if (!user.fullname) 
			errors.fullname = "Full name is blank";
		if (user.password != user.passwordconfirm) 
			errors.passwordconfirm = "Passwords do not match";
		
		if (!angular.equals(errors, {})) {
			console.log(errors);
			alert("Invalid submission, try again.");
		}	else {
			 $http.post("http://localhost:8090/auth/register/", user)
			 	.then(
                  function (response) {
                      alert("Account created successfully!");
                      $state.go('/login');
                  },
                  function (errResponse) {
                 	 console.log(errResponse);
                 	 alert(errResponse.data.errorMessage);
                  }
              );
		}
	};
	
	$scope.submit = function() {
		$scope.validateUser($scope.user)
	};
};
