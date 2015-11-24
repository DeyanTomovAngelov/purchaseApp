 describe('purchaseService Unit Tests', function () {

     var purchaseService,
         $httpBackend,
         Restangular;

     beforeEach(function() {
         module('app');
     });

     beforeEach(inject(function (_purchaseService_, _Restangular_, _$httpBackend_) {
         purchaseService = _purchaseService_;
         Restangular = _Restangular_;
         $httpBackend = _$httpBackend_;
     }));

     it ('days should be defined and should be restAngular object', function() {
         expect(purchaseService.days).toBeDefined();
         expect(typeof purchaseService.days).toEqual('object');
         expect(purchaseService.days.route).toEqual('days');
     });

     it ('allPurchases should be defined and should be restAngular object', function() {
         expect(purchaseService.allPurchases).toBeDefined();
         expect(typeof purchaseService.allPurchases).toEqual('object');
         expect(purchaseService.allPurchases.route).toEqual('purchase');
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
         purchaseService.setDayId(11);
         expect(purchaseService.currentDayPurchases).toEqual('ERROR, INVALID dayId!');
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

     it ('addPurchase should be a function that posts a purchase object but sets/overwrites its dayId property to the one given by the setDayId function', function() {
         spyOn(purchaseService.allPurchases, 'post').and.callThrough();
         var testObj = {
             dayId: 22,
             testName: 'Ala-Bala',
             testDescription: 'Huba-Buba'
         };

         purchaseService.setDayId(1);
         purchaseService.addPurchase(testObj);
         expect(purchaseService.allPurchases.post).toHaveBeenCalledWith(testObj);

         expect(testObj.dayId).toEqual(1);
         expect(purchaseService.addPurchase).toBeDefined();
         expect(typeof purchaseService.addPurchase).toEqual('function');
     });

     it ('deletePurchase should be a function that removes a purchase by selecting it with its ID', function() {
         spyOn(Restangular, 'one').and.callThrough();
         var testObj = {
             id: 5
         };

         purchaseService.deletePurchase(testObj);
         expect(Restangular.one).toHaveBeenCalledWith('purchase', testObj.id);

         expect(purchaseService.deletePurchase).toBeDefined();
         expect(typeof purchaseService.deletePurchase).toEqual('function');
     });

     it ('editPurchase should be a function that sets a purchase object for editing in the form by getting that object as a parameter', function() {
         spyOn(purchaseService, 'editPurchase').and.callThrough();
         var objForEditing = {
             description: 'Test description',
             price: 666,
             dayId: 5,
             id: 111,
             purchaseName: 'Ala-Bala',
             storeName: 'Huba-Buba'
         };

         purchaseService.editPurchase(objForEditing);
         expect(purchaseService.editPurchase).toHaveBeenCalledWith(objForEditing);
         expect(purchaseService.editPurchase(objForEditing)).toEqual(objForEditing);

         expect(purchaseService.editPurchase).toBeDefined();
         expect(typeof purchaseService.editPurchase).toEqual('function');
     });

     it ('saveEditedPurchase should be a function that does the actual update of the selected purchase object for editing using its ID.', function() {
         spyOn(Restangular, 'one').and.returnValue();
         var mockToReturn = {
             someProp: 'someValue',
             someOtherProp: 'someOtherValue',
             id: 1
         };

         $httpBackend.expectPUT('http://localhost:1337/purchase', {
             Accept: 'application/json, text/plain, */*'
         }).respond(mockToReturn);

         purchaseService.saveEditedPurchase(mockToReturn);
         expect(Restangular.one).toHaveBeenCalledWith('purchase', mockToReturn.id);


         expect(purchaseService.saveEditedPurchase).toBeDefined();
         expect(typeof purchaseService.saveEditedPurchase).toEqual('function');
     });
 });