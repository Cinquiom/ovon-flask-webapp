'use strict';

var VolunteerPoolController = function($scope, $http, $location, $filter, api) {
	
	$scope.title = "Volunteers";
	$scope.filteredVols = [];
	$scope.volunteers = [];
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
	
	/*
     * watches for changes in the volunteers search input field.
     * when the content of the search input changes, the volunteer pool is filtered by the entered content.
     * the entries with a tag identical to or text like the entered content are shown in the feed.
     * if the entered content does not match a tag in the database, only text filtering is performed,
     * if the entered content is blank all entries are shown
     */
    $scope.$watch('searchVolunteers', function(searchText) {
		$scope.textFilteredVols = $filter('filter')($scope.filteredVols, searchText);
		$http.get(api.getVolunteersWithTag + searchText + '/').then(function(response) {
			volsWithTag = response.data;
			var mixedVols = $scope.textFilteredVols.concat(volsWithTag);
			$scope.volunteers = UniqueArraybyId(mixedVols, 'id');			
		},
        function (errResponse) {
       	 if ((errResponse.status == 401) && searchText != undefined) {
       		 $scope.volunteers = $scope.textFilteredVols;
       	 }
       	 else {
       		$scope.getVolunteerPosts();
       	 }
        });	
	});
	
	//function to get user organization data for 'View As' dropdown
	$http.get(api.getUserOrganizations).then(function(response) {
		$scope.organizations = response.data;
		$scope.userOrganizationNames.push("volunteer");
		for (var i = 0; i < $scope.organizations.length; i++) {
			$scope.userOrganizationNames.push($scope.organizations[i].name);
		}
		
		$scope.chosenOrganizationName = $scope.userOrganizationNames[0];
	});
	
	/*
	 * watches for a change of selected organization in the 'View As' dropdown.
	 * reloads the list of volunteer pool entries to include the ability to rate and/or favourite them in the event
	 * the selected organization is not 'volunteer'
	 */
	$scope.$watch('chosenOrganizationName', function() {
		if ($scope.chosenOrganizationName != "volunteer" && $scope.chosenOrganizationName != undefined) {
			$scope.viewingAsOrg = true;
		}
		else {
			$scope.viewingAsOrg = false;
		}
		//$scope.getVolunteerPosts();
	});
	
	//method to remove entries in a list with duplicate keys.
	//used to remove volunteer pool entries in the list of entries which have identical id to another entry in the list
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
    }
    
    
	
	//method to get the data associated with the selected organization from the 'view as' dropdown
	$scope.getChosenOrganization = function() {
		for (var i = 0; i < $scope.organizations.length; i++) {
			if ($scope.organizations[i].name == $scope.chosenOrganizationName) {
				$scope.chosenOrganization = $scope.organizations[i];
			}
		}
	}
	
	/*
	 * method to ascertain which entries in the feed were created by the current user
	 */
	$scope.isOwnVolunteerPost = function() {
		$http.get(api.getCurrentUser).then(function(response) {
			$scope.currentUser = response.data;
			for (var i = 0; i < $scope.volunteers.length; i++) {
				if ($scope.currentUser.id == $scope.volunteers[i].user_id) {
					$scope.volunteers[i].isCurrentUsersVolunteerPost = true;
					if ($scope.viewingAsOrg == true) {
					}
				}
			}
		});
	}
	
	/*
	 * method to remove one of the current user's entries when they select the remove entry button
	 */
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
	
	/*
	 * method to add organization's rating of a volunteer to that volunteer's list of ratings.
	 * if the user selects the minus button beside the rating stars, their existing rating of that volunteer is removed
	 */
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
		              //$scope.getVolunteerPosts();
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
	
	//method for user to add a chosen volunteer to the browsing organization's favourites
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
	
	//gets the main side menu options
	$http.get('/static/json/navtop.json').then(function(response) {
		$scope.navtop = response.data;
	});
	
	//method to get all the volunteer pool entries from the server.
	//also checks which of them belong to the current user so those posts can have a remove entry button
	//and can't be rated and/or favourited by the current user
	$scope.getVolunteerPosts = function() {
		$http.get(api.postVolunteerPool).then(function(response) {
			$scope.volunteers = response.data;
			$scope.filteredVols = $scope.volunteers;
			$scope.isOwnVolunteerPost();
		});
	}
	
	
};
