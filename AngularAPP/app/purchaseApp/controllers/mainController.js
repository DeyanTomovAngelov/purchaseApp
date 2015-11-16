'use strict';

angular.module('myApp')
  .controller('mainController', ['$scope', '$state', '$stateParams', 'purchaseService',
    function($scope, $state, $stateParams, purchaseService) {

      // Setting the $scope.data object.
      $scope.data = {
        currentDay : {},
        templateObject : {
          description: '',
          price: '',
          dayId: '',
          purchaseName: '',
          storeName: ''
        },
        editMode: false
      };

      // Adding the days data to the $scope from the purchaseService.
      purchaseService.days.getList().then(function(days) {
        $scope.days = days;
      });

    }]);
