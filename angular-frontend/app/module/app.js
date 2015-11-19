'use strict';

angular.module('app', ['ui.router', 'restangular', 'ngMessages'])
    .constant('baseUrl', {'url': 'http://localhost:1337/'})
    .config(['$stateProvider', '$urlRouterProvider', 'RestangularProvider', 'baseUrl',
        function($stateProvider, $urlRouterProvider, RestangularProvider, baseUrl){
        // Set the base Object for RestAngular
        RestangularProvider.setBaseUrl(baseUrl.url);

        // For any unmatched url, send to /home/index
        $urlRouterProvider.otherwise("/home/index");

        $stateProvider
            .state('home', {
                url: "/home",
                templateUrl: "views/home.html",
                abstract: true
            })
            .state('home.index', {
                url: "/index",
                template: ""
            })
            .state('home.purchasesByDay', {
                url: "/purchases-by-day/:dayId",
                templateUrl: "views/purchasesByDay.html",
                controller: 'purchaseController'
            })
            .state('home.purchasesByDay.addPurchase', {
                url: "/add-purchase",
                views: {
                  "add": {
                        templateUrl: "views/addPurchase.html"
                  }
                }
            });
    }]);
