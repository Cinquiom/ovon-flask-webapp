'use strict';

var ProfileController = function($scope, $http, userPersistenceService) {
	
	$scope.profileImage = "person.png"
	$scope.title = userPersistenceService.getCookieData("userName");
		
	$http.get('/static/json/navtop.json').then(function(response) {
		$scope.navtop = response.data;
	});
	
	//GET requests to retrieve user data from the SQLite database
	$http.get("http://localhost:8090/auth/getProfileEmail/")
	.then(function (response) {
		$scope.profileEmail = response.data;
	});
	
	$http.get("http://localhost:8090/auth/getProfileFullName/")
	.then(function (response) {
		$scope.profileFullName = response.data;
	});
	
	$http.get("http://localhost:8090/auth/getProfileCreationDate/")
	.then(function (response) {
		$scope.profileCreationDate = response.data;
	});
};
