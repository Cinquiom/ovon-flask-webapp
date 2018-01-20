'use strict';

var ProfileController = function($scope, $http, userPersistenceService) {
	
	$scope.profileImage = "person.png"
	$scope.title = userPersistenceService.getCookieData("userName");
		
	$http.get('/static/json/navtop.json').then(function(response) {
		$scope.navtop = response.data;
	});
	
	$http.get("http://localhost:8090/auth/getProfileEmail/", $scope.title)
	.then(function (response) {
		$scope.profileEmail = response.data;
	});
	
	$http.get("http://localhost:8090/auth/getProfileFullName/", $scope.title)
	.then(function (response) {
		$scope.profileFullName = response.data;
	});
	
	$http.get("http://localhost:8090/auth/getProfileCreationDate/", $scope.title)
	.then(function (response) {
		$scope.profileCreationDate = response.data;
	});
};
