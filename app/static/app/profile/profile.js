'use strict';

var ProfileController = function($scope, $http, userPersistenceService, $route, $location, api) {
	
	$scope.profileImage = "person.png"
	$scope.title = userPersistenceService.getCookieData("userName");
	
	$scope.logout = function() {
		userPersistenceService.clearCookieData();
		$route.reload();
	}
	
	$scope.linkToUpdateProfile = function() {
		$location.path("/updateprofile");
		$route.reload();
	}
	
	$scope.linkToRegisterOrganization = function() {
		$location.path("/registerorganization");
		$route.reload();
	}
		
	$http.get('/static/json/navtop.json').then(function(response) {
		$scope.navtop = response.data;
	});
	
	//GET requests to retrieve user data from the SQLite database
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
	
	$http.get(api.userFavourites).then(function(response) {
		$scope.desiredOps = response.data;
	});
	
	$scope.removeFromDesiredOps = function(opp_id) {
		$http.delete(api.opportunityFavourites + opp_id + '/')
	 	.then(
          function (response) {
        	  if (response.data != "noOpp") {
					alert("Desired Opportunity has been removed");
				}
				else {
					alert("Opportunity not found.");
				}
          });
	}
	
	//for the tabs at the bottom of the profile page
	$scope.data = {desiredOps: true}

};
