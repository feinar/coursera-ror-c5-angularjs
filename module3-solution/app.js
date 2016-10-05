(function() {
	'use strict';

	angular.module('NarrowItDownApp', [])
	.controller('NarrowItDownController', NarrowItDownController)
	.service('MenuSearchService', MenuSearchService)
	.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
	.directive('foundItems', FoundItems);

	function FoundItems() {
      var ddo = {
        restrict: 'A',
        scope: {
          foundItems: '<',
          onRemove: '&'
        },
        templateUrl: 'foundItems.html',
      };

      return ddo;
    }


	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController(MenuSearchService) {
		var ctrl = this;

		ctrl.search = function () {

			if (! ctrl.searchTerm ) {
      	ctrl.found = [];
      }
      else {
				var promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);
				promise.then(function (response) {
				  ctrl.found = response;
				})
				.catch(function (error) {
					console.log(error);
				})

			}

		}

		ctrl.removeItem = function(index) {
     	ctrl.found.splice(index, 1);
   	}

	}


	MenuSearchService.$inject = ['$http', 'ApiBasePath']
	function MenuSearchService($http, ApiBasePath) {
		var service = this;

		var items = [];

		service.getMatchedMenuItems = function (searchTerm) {

			var re = new RegExp(searchTerm, 'gi');

			return $http({
				method: "GET",
				url: (ApiBasePath + "/menu_items.json")
			})
			.then(function (result) {
		    	// process result and only keep items that match
		    	return items = result.data.menu_items.filter(function(value) {
            //return value.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
		    	  return value.description.match(re);
          });

			});

		}

	}

})();