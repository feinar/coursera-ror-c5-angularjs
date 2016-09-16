(function(){
    'use strict';

    angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);
    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
        $scope.dishes = '';
        $scope.message = '';
        $scope.state = '';

        $scope.checkDishes = function () {

            var dishes = filterLunch($scope.dishes);
            var dishesNumber = dishes.length;

            if(dishesNumber === 0) {
                $scope.message = "Please enter data first";
                $scope.state = 'fail';
            } else if( dishesNumber > 0 && dishesNumber <= 3) {
                $scope.message = "Enjoy!";
                $scope.state = 'success';
            } else {
                $scope.message = "Too much!";
                $scope.state = 'success';
            }
        }
    }

    function filterLunch(dishes) {
        var dishesArr = dishes.split(',');
        dishesArr = dishesArr.map(function(e){return e.trim();});
        return dishesArr.filter(filterNotEmpty);
    }

    function filterNotEmpty(dish) {
        return dish;
    }

})();