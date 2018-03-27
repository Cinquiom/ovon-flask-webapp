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
		$scope.errors = {};
		
		if (!Organization.name) {
			$scope.errors.name = "Please provide your organization's name.";
		}
		
		if (!Organization.email) {
			$scope.errors.email = "Please provide an email address.";
		} else if (!emailRegex.test(Organization.email.toString())) {
			$scope.errors.email = "Please enter a valid email address.";
		}
		
		if (!Organization.phone) {
			$scope.errors.phoneNumber = "Please provide a phone number.";
		} else if ($scope.phoneNumberPattern === false) {
			$scope.errors.phoneNumber = "Please enter a valid phone number.";
		}
			
		
		if (angular.equals($scope.errors, {})) {
			 $http.post(api.registerOrganization, Organization)
			 	.then(
                  function (response) {
                      $scope.success = "Organization registered successfully!";
                      setTimeout(function() {
						  $location.path("/myorganizations");
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
		$scope.validateOrganization($scope.Organization)
	};
};
