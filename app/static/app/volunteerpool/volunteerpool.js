'use strict';

var VolunteerPoolController = function($scope, $http, $location, $filter, api) {
	
	// Specifying simple JSON objects in the javascript itself
	$scope.filters = ["Manual Labour", "People", "Animals"];
	$scope.title = "Volunteers";
	$scope.filteredVols = [];
	$scope.textFilteredVols = [];
	$scope.currentUser = [];
	var volsWithTag = [];
	var tagsForVol = [];
	
	$scope.chosenOrganization = {};
	$scope.chosenOrganizationName = {};
	$scope.userOrganizationNames = [];
	$scope.viewingAsOrg = false;
	
	$scope.linkToEnterVolunteerPool = function() {
		$location.path("/createvolunteerpost");
		$route.reload();
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
    
    $scope.$watch('searchVolunteers', function(searchText) {
		$scope.textFilteredVols = $filter('filter')($scope.filteredVols, searchText);
		$http.get(api.getVolunteersWithTag + searchText + '/').then(function(response) {
			volsWithTag = response.data;
			var mixedVols = $scope.textFilteredVols.concat(volsWithTag);
			$scope.volunteers = UniqueArraybyId(mixedVols, 'id');			
		},
        function (errResponse) {
       	 if (errResponse.status == 401 && searchText != undefined) {
       		 $scope.volunteers = $scope.textFilteredVols;
       	 }
       	 else {
       		$scope.getVolunteerPosts();
       	 }
        });	
	});
	
	//function to get user organization data for 'Browse As' dropdown
	$http.get(api.getUserOrganizations).then(function(response) {
		$scope.organizations = response.data;
		$scope.userOrganizationNames.push("volunteer");
		for (var i = 0; i < $scope.organizations.length; i++) {
			$scope.userOrganizationNames.push($scope.organizations[i].name);
		}
		
		$scope.chosenOrganizationName = $scope.userOrganizationNames[0];
	});
	
	$scope.$watch('chosenOrganizationName', function() {
		if ($scope.chosenOrganizationName != "volunteer") {
			$scope.viewingAsOrg = true;
		}
		else {
			$scope.viewingAsOrg = false;
		}
	});
	
	$scope.getChosenOrganization = function() {
		for (var i = 0; i < $scope.organizations.length; i++) {
			if ($scope.organizations[i].name == $scope.chosenOrganizationName) {
				$scope.chosenOrganization = $scope.organizations[i];
			}
		}
	}
	
	$scope.isOwnVolunteerPost = function() {
		$http.get(api.getCurrentUser).then(function(response) {
			$scope.currentUser = response.data;
			for (var i = 0; i < $scope.volunteers.length; i++) {
				if ($scope.currentUser.id == $scope.volunteers[i].user_id) {
					$scope.volunteers[i].isCurrentUsersVolunteerPost = true;
				}
			}
		});
	}
	
	$scope.removeVolunteerPost = function(post_id) {
		
		$http.get(api.TagsForVolunteer + post_id + '/').then(function(response) {
			tagsForVol = response.data;
			for (var i = 0; i < tagsForVol.length; i ++) {
				$http.delete(api.TagsForVolunteer + post_id + '/' + tagsForVol[i].id + '/').then(function(response) {
					
				});
			}
			$http.delete(api.postVolunteerPool + post_id + '/').then(function(response) {
				$scope.getVolunteerPosts();
			});
			
		});
		
	}
	
	$scope.onVolunteerRating = function(rating, volunteer_id) {
		//get the user's currently selected organization
		
		if ($scope.chosenOrganizationName == "volunteer") {
			
		}
		else {
			$scope.getChosenOrganization();
			
			if (rating > 0) {
				var ratingObject = JSON.stringify({rating: rating});
				$http.put(api.volunteerRating + $scope.chosenOrganization.id + '/' + volunteer_id + '/', ratingObject)
			 	.then(
		          function (response) {
		              alert("Thank you for your rating!");
		              $scope.getVolunteerPosts();
		          });
			}
			else {
				$http.delete(api.volunteerRating + $scope.chosenOrganization.id + '/' + volunteer_id + '/')
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
		}
	}
	
	$scope.addToDesiredVolunteers = function(volunteer_id) {
		if ($scope.chosenOrganizationName == "volunteer") {
			
		}
		else {
			$scope.getChosenOrganization();
			$http.post(api.volunteerFavourited + volunteer_id + '/' +$scope.chosenOrganization.id + '/')
		 	.then(
	          function (response) {
	              alert("Volunteer added to " + $scope.chosenOrganizationName + " Favourites!");
	          });
		}
		
	}
	
	// Typically how we will be pulling data, except
	// the URL will be a REST endpoint with a dynamically-generated
	// JSON object at that location
	$http.get('/static/json/navtop.json').then(function(response) {
		$scope.navtop = response.data;
	});
	
	$scope.getVolunteerPosts = function() {
		$http.get(api.postVolunteerPool).then(function(response) {
			$scope.volunteers = response.data;
			$scope.filteredVols = $scope.volunteers;
			
			$scope.isOwnVolunteerPost();
		});
	}
	
	
};
