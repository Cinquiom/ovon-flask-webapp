'use strict';

var DefaultController = function($scope, $route, $location, $http, api) {
	
	$http.get(api.getCurrentUser).then(function(response){
        if (response.status == 200) {
        	$location.path("/opportunities");
        }
        $route.reload();
    },
    function (errResponse) {
    	if (errResponse.status == 401) {
    		$location.path("/login");
    	}
    	$route.reload();
     });
};