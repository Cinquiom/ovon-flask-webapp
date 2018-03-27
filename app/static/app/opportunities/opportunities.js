'use strict';

var OpportunitiesController = function($scope, $http, $location, $route, $filter, api) {
	
	// Specifying simple JSON objects in the javascript itself
	$scope.filters = ["Manual Labour", "People", "Animals"];
	$scope.title = "Opportunities";
	$scope.filteredOps = [];
	$scope.textFilteredOps = [];
	var opsWithTag = [];
	
	$scope.linkToEnterVolunteerPool = function() {
		$location.path("/createvolunteerpost");
		$route.reload();
	}
	
	$scope.linkToPostOpportunity = function() {
		$location.path("/createopportunitypost");
		$route.reload();
	}
	
	$scope.addToDesiredOps = function(opp_id) {
		
		$http.post(api.opportunityFavourites + opp_id + '/')
	 	.then(
          function (response) {
              alert("Opportunity Added to Favourites!");
          });
	}
	
    function UniqueArraybyId(collection, keyname) {
        var output = [], 
            keys = [];

        angular.forEach(collection, function(item) {
            var key = item[keyname];
            if(keys.indexOf(key) === -1) {
                keys.push(key);
                output.push(item);
            }
        });
        return output;
    };
	
	$scope.$watch('searchOpportunities', function(searchText) {
		$scope.textFilteredOps = $filter('filter')($scope.filteredOps, searchText);
		$http.get(api.getOpportunitiesWithTag + searchText + '/').then(function(response) {
			opsWithTag = response.data;
			var mixedOps = $scope.textFilteredOps.concat(opsWithTag);
			$scope.ops = UniqueArraybyId(mixedOps, 'id');			
		})
		.catch(function (data) {
			if (searchText != undefined) {
				$scope.ops = $scope.textFilteredOps;
			}
			else {
				$scope.getOpportunityPosts();
			}
			
		});
		
	});
	
	$scope.onOrganizationRating = function(rating, op) {

		if (rating > 0) {
			var ratingObject = JSON.stringify({rating: rating});
			$http.post(api.organizationRating + op.org_id + '/', ratingObject)
		 	.then(
	          function (response) {
	              alert("Thank you for your rating!");
	              $scope.getOpportunityPosts();
	          });
		}
		else {
			$http.delete(api.organizationRating + op.org_id + '/')
			.then(
				function (response) {
					if (response.data != "noRating") {
						alert("Your rating has been removed");
					}
					else {
						alert("You have no rating to remove");
					}
					
				});
		}

	};
	
	// Typically how we will be pulling data, except
	// the URL will be a REST endpoint with a dynamically-generated
	// JSON object at that location
	$http.get('/static/json/navtop.json').then(function(response) {
		$scope.navtop = response.data;
	});
	
	$scope.getOpportunityPosts = function() {
		$http.get(api.postOpportunity).then(function(response) {
			$scope.ops = response.data;
			$scope.filteredOps = $scope.ops;
		});
		
	}
	
};
