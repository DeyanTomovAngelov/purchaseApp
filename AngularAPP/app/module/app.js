'use strict';

angular.module('app', ['ui.router', 'restangular', 'ngMessages']).
    config(function($stateProvider, $urlRouterProvider, RestangularProvider){
        // Set the base Object for RestAngular
        RestangularProvider.setBaseUrl('http://localhost:1337/');

        // For any unmatched url, send to /home/index
        $urlRouterProvider.otherwise("/home/index");

        $stateProvider
            .state('home', {
                url: "/home",
                templateUrl: "../views/home.html",
                abstract: true
            })
          .state('home.index', {
            url: "/index",
            template: ""
          })
            .state('home.purchasesByDay', {
                url: "/purchases-by-day/:dayId",
                templateUrl: "../views/purchasesByDay.html",
                controller: 'purchaseController'
            })
            .state('home.purchasesByDay.addPurchase', {
                url: "/add-purchase",
                views: {
                  "add": {
                        templateUrl: "../views/addPurchase.html"
                  }
                }
            });
    });
