'use strict';

angular.module('myApp').service('purchaseService', ['Restangular', function(Restangular) {
  var purchaseService = {};

  // Getting all the data from the backend table days (sailsJS model) with RestAngular.
  purchaseService.days = Restangular.all('days');

  // Getting all the purchases in order to make the addPurchase function still work, I may change it.
  purchaseService.allPurchases = Restangular.all('purchase');

  // Getting only the purchases for the current day with customGET restAngular, Toshko showed me that.
  purchaseService.purchases = function ($stateParams) {
    return Restangular.all('purchase').customGET('', {dayId: $stateParams.dayId});
  };

  // Adding new Purchase by using RestAngular post() method. I am setting the dayId of the dataObject to be equal to the
  // $stateParams.dayId, the rest of the input fields are taken with ng-model in the view. Also making sure that the price is correct.
  purchaseService.addPurchase = function (dataObject, $stateParams) {
    dataObject.dayId = $stateParams.dayId;
    return purchaseService.allPurchases.post(dataObject);
  };

  // Deleting a purchase again I must see exactly how RestAngular.one() works. All this was needed because I did not have the
  // RestAngular methods (.remove() for example) when I was getting all the purchases.
  purchaseService.deletePurchase = function (purchase) {
    return Restangular.one('purchase', purchase.id).remove();
  };

  // Sets the route to the adding/editing dialog and updates the form with the data from the currently clicked purchase
  purchaseService.editPurchase = function (purchase, $state) {
    $state.go('home.purchasesByDay.addPurchase');
    var editObject = {
      description: purchase.description,
      price: purchase.price,
      dayId: purchase.dayId,
      id: purchase.id,
      purchaseName: purchase.purchaseName,
      storeName: purchase.storeName
    };

    return editObject;
  };


  // Editing the changes for some reason the put that was send to the backend was failing because of the dayId so I needed to send it in this format.
  purchaseService.saveEditedPurchase = function (dataObject) {
    dataObject.dayId = dataObject.dayId.dayId;
    return Restangular.one('purchase', dataObject.id).put(dataObject);
  };

  return purchaseService;

}]);
