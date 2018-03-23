'use strict';

var CreateOpportunityPostController = function($scope, $http, api, $log) {
	
	$http.get('/static/json/navtop.json').then(function(response) {
		$scope.navtop = response.data;
	});
	
	$scope.errors = {};
	$scope.OpportunityPost = {};
	$scope.chosenOrganizationName = {};
	$scope.userOrganizationNames = [];
	
	$http.get(api.getUserOrganizations).then(function(response) {
		$scope.organizations = response.data;
		for (var i = 0; i < $scope.organizations.length; i++) {
			$scope.userOrganizationNames.push($scope.organizations[i].name);
		}
	});
	
	$scope.validateOpportunityPost = function(OpportunityPost) {
		var errors = {};
		
		if (!OpportunityPost.location) {
			errors.location = "Please provide a location.";
		}
		
		if (!OpportunityPost.description) {
			errors.description = "Please describe the opportunity.";
		}
		
		if (!OpportunityPost.when) {
			errors.when = "Please say when the opportunity is occurring.";
		}
		
		if (!$scope.chosenOrganizationName) {
			errors.organization = "Please choose an organization.";
		}
		else {
			for (var i = 0; i < $scope.organizations.length; i++) {
				if ($scope.organizations[i].name == $scope.chosenOrganizationName) {
					$scope.chosenOrganization = $scope.organizations[i];
				}
			}
		}
		
		
			
		
		if (!angular.equals(errors, {})) {
			console.log(errors);
			alert("Invalid post submission, please try again.");
		}	else {			
			 $http.post(api.postOpportunity + $scope.chosenOrganization.id + '/', OpportunityPost)
			 	.then(
                  function (response) {
                      alert("The opportunity has been posted!");
                  },
                  function (errResponse) {
                 	 console.log(errResponse);
                 	 alert(errResponse.data.errorMessage);
                  }
              );
		}
	};
	
	$scope.submit = function() {
		$scope.validateOpportunityPost($scope.OpportunityPost)
	};
};