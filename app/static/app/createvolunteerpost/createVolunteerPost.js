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
			
			$http.put(api.TagsForVolunteer + vols[vols.length - 1].id + '/', $scope.Tags)
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
	
	$scope.validateVolunteerPost = function(ActivityPost) {
		var errors = {};
		
		if (!ActivityPost.availability) {
			errors.availability = "Please provide your availability.";
		}
		
		if (!ActivityPost.description) {
			errors.description = "Please describe yourself.";
		}
			
		
		if (!angular.equals(errors, {})) {
			console.log(errors);
			alert("Invalid entry submission, please try again.");
		}	else {
			 $http.post(api.postVolunteerPool, ActivityPost)
			 	.then(
                  function (response) {
                      //alert("Volunteer Pool Entry succeeded!");
                      $scope.addTags();
                      $location.path("/volunteers");
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
		$scope.validateVolunteerPost($scope.ActivityPost)
	};
};