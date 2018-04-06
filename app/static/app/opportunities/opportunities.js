'use strict';

var OpportunitiesController = function($scope, $http, $location, $route, $filter, api) {
	
	$scope.title = "Opportunities";
	$scope.filteredOps = [];
	$scope.textFilteredOps = [];
	$scope.userOrgs = [];
	$scope.ops = [];
	var opsWithTag = [];
	var tagsForOp = [];
	
	$scope.linkToEnterVolunteerPool = function() {
		$location.path("/createvolunteerpost");
		$route.reload();
	}
	
	$scope.linkToPostOpportunity = function() {
		$location.path("/createopportunitypost");
		$route.reload();
	}
	
	//method for user to add a chosen opportunity post to their favourites
	$scope.addToDesiredOps = function(opp_id) {
		
		$http.post(api.opportunityFavourites + opp_id + '/')
	 	.then(
          function (response) {
              alert("Opportunity Added to Favourites!");
          });
	}
	
	//method to remove entries in a list with duplicate keys.
	//used to remove opportunities in the list of opportunities which have identical id to another opportunity in the list
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
	
    /*
     * watches for changes in the opportunities search input field.
     * when the content of the search input changes, the opportunities list is filtered by the entered content.
     * the opportunities with a tag identical to or text like the entered content are shown in the feed.
     * if the entered content does not match a tag in the database, only text filtering is performed,
     * if the entered content is blank all opportunities are shown
     */
	$scope.$watch('searchOpportunities', function(searchText) {
		$scope.textFilteredOps = $filter('filter')($scope.filteredOps, searchText);
		$http.get(api.getOpportunitiesWithTag + searchText + '/').then(function(response) {
			opsWithTag = response.data;
			var mixedOps = $scope.textFilteredOps.concat(opsWithTag);
			$scope.ops = UniqueArraybyId(mixedOps, 'id');			
		},
        function (errResponse) {
        	 if ((errResponse.status == 401 || errResponse.status == 404) && searchText != undefined) {
        		 $scope.ops = $scope.textFilteredOps;
        	 }
        	 else {
        		 $scope.getOpportunityPosts();
        	 }
         });		
	});
	
	/*
	 * method to add user's rating of an opportunity to its organization's list of ratings.
	 * if the user selects the minus button beside the rating stars, their existing rating of that opportunity is removed
	 */
	$scope.onOrganizationRating = function(rating, op) {

		if (rating > 0) {
			var ratingObject = JSON.stringify({rating: rating});
			$http.post(api.organizationRating + op.org_id + '/', ratingObject)
		 	.then(
	          function (response) {
	              alert("Thank you for your rating!");
	              //$scope.getOpportunityPosts();
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
	
	/*
	 * method to ascertain which opportunities in the feed were created by the current user
	 */
	$scope.isOwnOpportunity = function() {
		$http.get(api.getUserOrganizations).then(function(response) {
			$scope.userOrgs = response.data;
			for (var i = 0; i < $scope.userOrgs.length; i++) {
				for (var j = 0; j < $scope.ops.length; j++) {
					if ($scope.userOrgs[i].id == $scope.ops[j].org_id) {
						$scope.ops[j].isCurrentUsersOp = true;
					}
				}
			}
		});
	}
	
	/*
	 * method to remove one of the current user's opportunity posts when they select the remove opportunity button
	 */
	$scope.removeOpportunity = function(opp_id) {
		
		$http.get(api.TagsForOpportunity + opp_id + '/').then(function(response) {
			tagsForOp = response.data;
			for (var i = 0; i < tagsForOp.length; i ++) {
				$http.delete(api.TagsForOpportunity + opp_id + '/' + tagsForOp[i].id + '/').then(function(response) {
					
				});
			}
			$http.delete(api.postOpportunity + opp_id + '/').then(function(response) {
				$scope.getOpportunityPosts();
			});
			
		});
		
	}
	
	//gets the main side menu options
	$http.get('/static/json/navtop.json').then(function(response) {
		$scope.navtop = response.data;
	});
	
	//method to get all the opportunity posts from the server.
	//also checks which of them belong to the current user so those posts can have a remove opportunity button
	//and can't be rated and/or favourited by the current user
	$scope.getOpportunityPosts = function() {
		$http.get(api.postOpportunity).then(function(response) {
			$scope.ops = response.data;
			$scope.filteredOps = $scope.ops;
			$scope.isOwnOpportunity();
		});
	}
	
};
