'use strict';

var CreateVolunteerPostController = function($scope, $http, $route, $location, VolunteerService, api) {
	
	$http.get('/static/json/navtop.json').then(function(response) {
		$scope.navtop = response.data;
	});
	
	$scope.errors = {};
	$scope.ActivityPost = {};
	$scope.tagEntries = "";
	$scope.Tags = [];
	
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
		
		var vols = []; 
		VolunteerService.getVolunteerPosts().then(function(data) {
			angular.copy(data, vols);
			
			$http.put(api.TagsForVolunteer + vols[0].id + '/', $scope.Tags)
		 	.then(
	       function (response) {
	       },
	       function (errResponse) {
	      	 $scope.errors.response = errResponse.data.errorMessage;
	       });
		});
	}
	
	$scope.validateVolunteerPost = function(ActivityPost) {
		$scope.errors = {};
		
		if (!ActivityPost.availability) {
			$scope.errors.availability = "Please provide your availability.";
		}
		
		if (!ActivityPost.description) {
			$scope.errors.description = "Please describe yourself.";
		}
			
		
		if (angular.equals($scope.errors, {})) {
			 $http.post(api.postVolunteerPool, ActivityPost)
			 	.then(
                  function (response) {
                      $scope.success = "Volunteer Pool Entry succeeded!";
                      $scope.addTags();
					  setTimeout(function() {
						  $location.path("/volunteers");
						  $route.reload();
					  }, 2000);
                  },
                  function (errResponse) {
                 	 $scope.errors.response = errResponse.data.errorMessage;
                  }
              );
		}
	};
	
	$scope.submit = function() {
		$scope.validateVolunteerPost($scope.ActivityPost)
	};
};
