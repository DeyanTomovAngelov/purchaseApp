 describe('purchaseService Unit Tests', function () {

     var purchaseService,
         $httpBackend,
         Restangular,
         q,
         $scope;

     beforeEach(function() {
         module('app');
     });

     beforeEach(inject(function (_purchaseService_, _Restangular_, _$httpBackend_, $q, $rootScope) {
         purchaseService = _purchaseService_;
         Restangular = _Restangular_;
         q = $q;
         $scope = $rootScope.$new();
         $httpBackend = _$httpBackend_;
     }));

     it ('days should be defined', function() {
         expect(purchaseService.days).toBeDefined();
     });

     it ('allPurchases should be defined', function() {
         expect(purchaseService.allPurchases).toBeDefined();
     });

     it ('currentDayPurchases should be defined and to equal initially an empty array', function() {
         expect(purchaseService.currentDayPurchases).toBeDefined();
         expect(purchaseService.currentDayPurchases).toEqual([]);
     });

     it ('setDayId should be a function that sets the dayId', function() {
         expect(purchaseService.setDayId).toBeDefined();
         expect(typeof purchaseService.setDayId).toEqual('function');
         purchaseService.setDayId(1);
         expect(purchaseService.dayId).toEqual(1);
     });

     it ('getPurchases should be a function that updates the currentDayPurchases', function() {
         spyOn(Restangular, 'all').and.callThrough();
         var mockToReturn = {
             someProp: 'someValue',
             someOtherProp: 'someOtherValue'
             };

         $httpBackend.expectGET('http://localhost:1337/purchase', {
             Accept: 'application/json, text/plain, */*'
         }).respond(mockToReturn);

         purchaseService.getPurchases();
         expect(Restangular.all).toHaveBeenCalledWith('purchase');
         $httpBackend.flush();

         expect(purchaseService.getPurchases).toBeDefined();
         expect(typeof purchaseService.setDayId).toEqual('function');
         expect(purchaseService.currentDayPurchases.someProp).toEqual('someValue');
         expect(purchaseService.currentDayPurchases.someOtherProp).toEqual('someOtherValue');
     });
 });