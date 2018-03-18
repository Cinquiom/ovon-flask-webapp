'use strict';

var RegisterOrganizationController = function($scope, $http, $route, $location, api) {
	
	$http.get('/static/json/navtop.json').then(function(response) {
		$scope.navtop = response.data;
	});
	
	var emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
	
	$scope.errors = {};
	$scope.Organization = {};
	
	$scope.phoneNumberPattern = (function() {
	    var regexPhone = /^\(?(\d{3})\)?[ .-]?(\d{3})[ .-]?(\d{4})$/;
	    return {
	        test: function(value) {
	            if( $scope.phoneRequirement === false ) {
	                return true;
	            }
	            return regexPhone.test(value);
	        }
	    };
	})();
	
	$scope.validateOrganization = function(Organization) {
		var errors = {};
		
		if (!Organization.name) {
			errors.name = "Please provide your organization's name.";
		}
		
		if (!Organization.email) {
			errors.email = "Please provide an email address.";
		} else if (!emailRegex.test(Organization.email.toString())) {
			errors.email = "Email is not valid";
		}
		
		if (!Organization.phone) {
			errors.phone = "Please provide a phone number.";
		} else if ($scope.phoneNumberPattern === false) {
			errors.phone = "Invalid Phone Number";
		}
			
		
		if (!angular.equals(errors, {})) {
			console.log(errors);
			alert("Invalid entry submission, please try again.");
		}	else {
			 $http.post(api.registerOrganization, Organization)
			 	.then(
                  function (response) {
                      alert("Organization Registered!");
                      $location.path("/profile");
              		  $route.reload();
                  },
                  function (errResponse) {
                 	 console.log(errResponse);
                 	 alert(errResponse.data.errorMessage);
                  }
              );
		}
	};
	
	$scope.submit = function() {
		$scope.validateOrganization($scope.Organization)
	};
};