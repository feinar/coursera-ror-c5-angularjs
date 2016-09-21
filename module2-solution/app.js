(function() {
	'use strict';

	angular.module('ShoppingListCheckOff', [])
	.controller('ToBuyShoppingController', ToBuyShoppingController)
	.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
	.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

	ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
	function ToBuyShoppingController(ShoppingListCheckOffService) {
		var toBuyer = this;

		toBuyer.items = ShoppingListCheckOffService.getToBuyItems();

		toBuyer.buyItem = function (itemIdex) {
			ShoppingListCheckOffService.buyItem(itemIdex);
		}
	}

	AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
	function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
		var alreadyBought = this;

		alreadyBought.items = ShoppingListCheckOffService.getAlreadyBoughtItems();
	}

	function ShoppingListCheckOffService() {
		var service = this;

		// List of shopping items
		var toBuyItems = [
		{ name: "cookies", quantity: 10 },
		{ name: "pumpkin", quantity: 1 },
		{ name: "sugar", quantity: 1 },
		{ name: "bread", quantity: 1 },
		{ name: "tomatoes", quantity: 8 },
		{ name: "potatoes", quantity: 15 },
		{ name: "apple pie", quantity: 1}
		];

		// List of already bought shopping items
		var boughtItems = [];

		service.buyItem = function (itemIdex) {
			boughtItems.push(toBuyItems[itemIdex]);
			toBuyItems.splice(itemIdex, 1);
		}

		service.getToBuyItems = function () {
			return toBuyItems;
		}

		service.getAlreadyBoughtItems = function () {
			return boughtItems;
		}
	}

})();