'use strict';

var CreatePostController = function($scope, $http, api) {
	
	$http.get('/static/json/navtop.json').then(function(response) {
		$scope.navtop = response.data;
	});
	
	$scope.errors = {};
	$scope.ActivityPost = {};
	
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
                      alert("Volunteer Pool Entry succeeded!");
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