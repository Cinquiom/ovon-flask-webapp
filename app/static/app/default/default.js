'use strict';

/*
 * this controller pings the getCurrentUser endpoint to see if the user is currently logged in
 * if they are, a 200 response is returned and the user is redirected to the opportunities view
 * if they are not, a 401 response is returned and the user is redirected to the login view
 */
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