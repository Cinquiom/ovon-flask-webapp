'use strict';

var ProfileController = function($scope, $http, userPersistenceService, $route, $location, $cookies, api) {
	
	$scope.profileImage = "person.png"
	$scope.title = userPersistenceService.getCookieData("userName");
	
	$scope.linkToUpdateProfile = function() {
		$location.path("/updateprofile");
		$route.reload();
	}
	
	$scope.linkToRegisterOrganization = function() {
		$location.path("/registerorganization");
		$route.reload();
	}
	
	$scope.linkToMyOrganizations = function() {
	    $location.path("/myorganizations");
	    $route.reload();
	}
	
	//gets the main side menu options
	$http.get('/static/json/navtop.json').then(function(response) {
		$scope.navtop = response.data;
	});
	
	//GET requests to retrieve user data from the server
	$http.get(api.getProfileEmail)
	.then(function (response) {
		$scope.profileEmail = response.data;
	});
	
	$http.get(api.getProfileFullName)
	.then(function (response) {
		$scope.profileFullName = response.data;
	});
	
	$http.get(api.getProfileCreationDate)
	.then(function (response) {
		$scope.profileCreationDate = response.data;
	});
	
	$http.get(api.getProfileBio)
	.then(function (response) {
		$scope.profileBio = response.data;
	});
	
	//gets the user's favourited opportunities
	$http.get(api.userFavourites).then(function(response) {
		$scope.desiredOps = response.data;
	});
	
	//gets the organizations interested in the user
	$http.get(api.volunteerFavourited).then(function(response) {
		$scope.interestedOrgs = response.data;
		console.log(response.data);
	});
	
	//gets the user's id, avatar image, and resume
	$http.get(api.getCurrentUser).then(function(response) {
	    $scope.userID = response.data.id;
	    $scope.avatar = response.data.avatar;
	    $scope.resume = response.data.resume;
	});
	
	//method to remove a favourited opportunity from the list of favourites
	//noOpp is returned from the delete request if the desired opportunity to remove is not found on the server
	$scope.removeFromDesiredOps = function(opp_id) {
		$http.delete(api.opportunityFavourites + opp_id + '/')
	 	.then(
          function (response) {
        	  if (response.data != "noOpp") {
					alert("Desired Opportunity has been removed");
					$http.get(api.userFavourites).then(function(response) {
						$scope.desiredOps = response.data;
					});
				}
				else {
					alert("Opportunity not found.");
				}
          });
	}
	
	//for the tabs at the bottom of the profile page
	$scope.data = {desiredOps: true}
	$scope.panes = [
		{title:"Interested Organizations"}
	];

};
