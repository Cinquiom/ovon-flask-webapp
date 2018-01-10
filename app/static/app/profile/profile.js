'use strict';

var ProfileController = function($scope, $http) {
	
	$scope.profileImage = "person.png"
	$scope.title = "Profile"
		
	$http.get('/static/json/navtop.json').then(function(response) {
		$scope.navtop = response.data;
	});
};
