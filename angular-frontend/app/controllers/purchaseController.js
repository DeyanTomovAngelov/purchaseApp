'use strict';

angular.module('app')
  .controller('purchaseController', ['$scope', 'Restangular', '$state', '$stateParams', 'purchaseService',
    function($scope, Restangular, $state, $stateParams, purchaseService) {

      $scope.purchaseService = purchaseService;

      // Returning to the current day purchases after completing some action, used in addPurchase, cancelPurchase and saveEditedPurchase.
      var returnToCurrentDayPurchase = function () {
        $scope.data.templateObject = {};    // Resetting the ng-model of the form inputs.
        $scope.data.editMode = false;
        return $state.go('home.purchasesByDay');
      };

      // Making sure that we are at the right state for displaying the purchase data in our view and that we have $scope.days.
      // This is the moment when I give the service the dayId in order for it to start working and also using it to display the current day name.
      if ($state.current.name === 'home.purchasesByDay' && $scope.days) {
        $scope.data.currentDay = _.cloneDeep($scope.days[$stateParams.dayId - 1]);
        purchaseService.setDayId($stateParams.dayId);
      }

      // Calling purchaseService.addPurchase in the controller and passing the templateObject here and not in the view, achieved this with the help of Toshko.
      $scope.addPurchase = function () {
        purchaseService.addPurchase($scope.data.templateObject);
        returnToCurrentDayPurchase();
      };

      // Removed the cancel function from purchaseService, it was redundant to keep it there.
      $scope.cancelPurchase = function () {
        returnToCurrentDayPurchase();
      };

      // Attaching purchaseService.deletePurchase to the controller. The purchase argument is the row for deleting and
      // it is been given to the function in the view(purchaseByDay.html).
      $scope.deletePurchase = function (purchase) {
        purchaseService.deletePurchase(purchase)
      };

      // Attaching the edit function from the purchaseService to the scope, going to the dialog for editing setting the editMode to true and
      // updating the templateObject with the current clicked table row data.
      $scope.editPurchase = function (purchase) {
        $state.go('home.purchasesByDay.addPurchase');
        $scope.data.editMode = true;
        $scope.data.templateObject = purchaseService.editPurchase(purchase, $state);
      };

      // Attaching the saveEditedPurchase function to the controller and saving the edited changes
      $scope.saveEditedPurchase = function () {
        purchaseService.saveEditedPurchase($scope.data.templateObject);
        returnToCurrentDayPurchase();
      };

    }]);
