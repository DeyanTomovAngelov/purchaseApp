'use strict';

angular.module('app').service('purchaseService', ['Restangular', function(Restangular) {
  var purchaseService = {},
  // Creating dayId as a private variable of the service function.
      dayId = null;

  // Getting all the data from the backend table days (sailsJS model) with RestAngular.
  purchaseService.days = Restangular.all('days');

  // Getting all the purchases in order to make the addPurchase function work, I may change it.
  purchaseService.allPurchases = Restangular.all('purchase');

  // Setting the individual day purchases to an empty array.
  purchaseService.currentDayPurchases = [];

  // Setting the day ID and calling the getPurchases function to update/refresh the table.
  purchaseService.setDayId = function (currentDayId) {
    dayId = currentDayId;
    purchaseService.getPurchases();
  };

  // Getting only the purchases for the current day with customGET restAngular, this function will be used for refreshing everywhere.
  purchaseService.getPurchases = function () {
    return Restangular.all('purchase').customGET('', {dayId: dayId}).then(function (data) {
      purchaseService.currentDayPurchases = data;
    });
  };

  // Adding new Purchase by using RestAngular post() method. I am setting the dayId here and using the getPurchases() to refresh the table
  // after creating a new purchase.
  purchaseService.addPurchase = function (dataObject) {
    dataObject.dayId = dayId;
    return purchaseService.allPurchases.post(dataObject).then(function () {
      purchaseService.getPurchases();
    });
  };

  // Deleting a purchase again I must see exactly how RestAngular.one() works. All this was needed because I did not have the
  // RestAngular methods (.remove() for example) when I was getting all the purchases.
  purchaseService.deletePurchase = function (purchase) {
    return Restangular.one('purchase', purchase.id).remove().then(function () {
      purchaseService.getPurchases();
    });
  };

  // Sets the form with the data from the currently clicked purchase.
  purchaseService.editPurchase = function (purchase) {
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

  // Editing the changes, for some reason the put() that was send to the backend was failing to get the dayId so I had to give it here.
  purchaseService.saveEditedPurchase = function (dataObject) {
    dataObject.dayId = dayId;
    return Restangular.one('purchase', dataObject.id).put(dataObject).then(function () {
      purchaseService.getPurchases();
    });
  };

  return purchaseService;

}]);
