'use strict';

angular.module('myApp')
  .controller('purchaseController', ['$scope', 'Restangular', '$state', '$stateParams', 'purchaseService',
    function($scope, Restangular, $state, $stateParams, purchaseService) {

      // Adding only the purchases for the current day using the $stateParams, Toshko showed me that and it was needed because when I was getting
      // all of the purchases, I could not use the RestAngular methods (.remove() for example) and I could not delete. Wrapping it in a function so
      // that I can reused it else where (after deleting and creating a purchase).
      $scope.purchases = [];
      var tableRefresh = function () {
        return purchaseService.purchases($stateParams)
          .then(function (updatedPurchases) {
            $scope.purchases = updatedPurchases;
          });
      };
      tableRefresh();   // Calling the tableRefresh in order to get the initial purchase table data.

      // Returning to the current day purchases after completing some action, cancelPurchase and in addPurchase.
      var returnToCurrentDayPurchase = function () {
        return $state.go('home.purchasesByDay');
      };

      // Making sure that we are at the right state for displaying the purchase data in our view and that we have $scope.days.
      // This is used now only for setting the day in the table header view. I am getting only the purchases for the current day and not all from the above code.
      if ($state.current.name === 'home.purchasesByDay' && $scope.days) {
        $scope.data.currentDay = _.cloneDeep($scope.days[$stateParams.dayId - 1]);
      }

      // Calling purchaseService.addPurchase in the controller and passing its arguments here and not in the view, achieved the calling here with the help of Toshko.
      $scope.addPurchase = function () {
        purchaseService.addPurchase($scope.data.templateObject, $stateParams).then(function () {
          tableRefresh();
        });
        $scope.data.templateObject = {};    // Resetting the ng-model of the form inputs.
        returnToCurrentDayPurchase();
      };

      // Removed the cancel function from purchaseService, because of the optimization of the code achieved with the help of Teo, it was redundant to keep it there.
      $scope.cancelPurchase = function () {
        $scope.data.templateObject = {};    // Resetting the ng-model of the form inputs.
        $scope.data.editMode = false;
        returnToCurrentDayPurchase();
      };

      // Attaching purchaseService.deletePurchase to the controller. The purchase argument is the row for deleting and it is been given to the function in the view(purchaseByDat.html).
      $scope.deletePurchase = function (purchase) {
        purchaseService.deletePurchase(purchase)
          .then(function () {
            tableRefresh();
          });
      };

      // Attaching the edit function from the purchaseService to the scope, setting the editMode to true and updating the templateObject with the current clicked table row data.
      $scope.editPurchase = function (purchase) {
        $scope.data.editMode = true;
        $scope.data.templateObject = purchaseService.editPurchase(purchase, $state);
      };

      // Attaching the saveEditedPurchase function to the controller and saving the edited changes
      $scope.saveEditedPurchase = function () {
        purchaseService.saveEditedPurchase($scope.data.templateObject).then(function () {
          tableRefresh();
        });
        $scope.data.templateObject = {};    // Resetting the ng-model of the form inputs.
        $scope.data.editMode = false;
        returnToCurrentDayPurchase();
      };

    }]);
