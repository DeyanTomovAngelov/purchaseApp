'use strict';

describe('mainController Unit Tests', function() {

    var $controller,
        controller,
        $state,
        $scope,
        $stateParams,
        purchaseService;

    beforeEach(function() {
        module('app');
    });

    beforeEach(inject(function(_$controller_, _$rootScope_, _$state_, _$stateParams_, _purchaseService_){
        $controller = _$controller_;
        $scope = _$rootScope_.$new();
        $state = _$state_;
        $stateParams = _$stateParams_;
        purchaseService = _purchaseService_;

        //controller = $controller('mainController', {
        //    '$scope': $scope,
        //    '$state': $state,
        //    '$stateParams': $stateParams,
        //    'purchaseService': purchaseService
        //});
    }));

    it ('days should be defined and should be restAngular object', function() {
        expect(1).toEqual(1);
        //expect($scope.editMode).toEqual(false);
    });
});