'use strict';

var CreateOpportunityPostController = function($scope, $http, api, OpportunitiesService, $log) {
	
	$http.get('/static/json/navtop.json').then(function(response) {
		$scope.navtop = response.data;
	});
	
	$scope.errors = {};
	$scope.OpportunityPost = {};
	$scope.chosenOrganizationName = {};
	$scope.userOrganizationNames = [];
	$scope.tagEntries = "";
	$scope.Tags = [];
	
	$http.get(api.getUserOrganizations).then(function(response) {
		$scope.organizations = response.data;
		for (var i = 0; i < $scope.organizations.length; i++) {
			$scope.userOrganizationNames.push($scope.organizations[i].name);
		}
	});
	
	$scope.addTags = function() {
		//loop to identify tags in the tagEntries string and make them into a list of JSON objects
		var tagName = "";
		for (var i = 0; i < $scope.tagEntries.length; i++) {
			if ($scope.tagEntries[i] != ' ') {
				tagName += $scope.tagEntries[i];
				if(i == ($scope.tagEntries.length) - 1) {
					$scope.Tags = $scope.Tags.concat([{name: tagName}]);
					tagName = "";
				}
			}
			else {
				$scope.Tags = $scope.Tags.concat([{name: tagName}]);
				tagName = "";
			}
		}
		
		var ops = []; 
		OpportunitiesService.getOpportunityPosts().then(function(data) {
			angular.copy(data, ops);
			
			$http.put(api.TagsForOpportunity + ops[ops.length - 1].id + '/', $scope.Tags)
		 	.then(
	       function (response) {
	           alert("Tags added!");
	       },
	       function (errResponse) {
	      	 console.log(errResponse);
	      	 alert(errResponse.data.errorMessage);
	       });
		});
		
		
	}
	
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
                      //alert("The opportunity has been posted!");
                	  $scope.addTags();
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