'use strict';

var ProfileController = function($scope, $http, userPersistenceService) {
	
	$scope.profileImage = "person.png"
	$scope.title = userPersistenceService.getCookieData("userName");
		
	$http.get('/static/json/navtop.json').then(function(response) {
		$scope.navtop = response.data;
	});
};
