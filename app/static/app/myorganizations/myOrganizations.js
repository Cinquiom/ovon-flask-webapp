'use strict';

var MyOrganizationsController = function($scope, $http, $route, $location, api) {

    $scope.interestedUsers = [];

    $http.get('/static/json/navtop.json').then(function(response) {
        $scope.navtop = response.data;
    });
    
    $http.get(api.getUserOrganizations).then(function(response){
        $scope.orgs = response.data;
        
        $http.get(api.organizationFavourites + $scope.orgs[0].id).then(function(response){
            $scope.favouritedUsers = response.data;
            //console.log(response.data);
        });
        
        $http.get(api.postOpportunity + $scope.orgs[0].id).then(function(response){
            var ops = response.data;
            for (var op in ops) {
                $http.get(api.opportunityFavourites + ops[op].id).then(function(response){
                    var interestedUser = response.data;
                    
                    for (var user in interestedUser) {
                        $http.get(api.getUserInfo + interestedUser[user].user_id).then(function(response){
                            $scope.interestedUsers.push(response.data);
                            console.log(response.data);
                        });
                    }
                });
            }
        });
        
    });
};