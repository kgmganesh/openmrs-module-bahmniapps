describe("BedManagementService", function() {
    var bedLayouts = [
            {bedId: 1,
             bedNumber: "I1",
             bedType: {description: "This is the ICU bed type",
                       displayName: "ICU Bed",
                       id: 102,
                       name: "ICU Bed"},
             columnNumber: 1, 
             rowNumber: 1, 
             status: "OCCUPIED"
            },
            {bedId: 2,
             bedNumber: "I2",
             bedType: {description: "This is another bed type",
                       displayName: "ICU Bed",
                       id: 103,
                       name: "ICU Bed"},
             columnNumber: 2, 
             rowNumber: 2, 
             status: "AVAILABLE"
            }];

    beforeEach(module('bahmni.ipd'));

    beforeEach(inject(['BedManagementService', function (bedManagementServiceInjected) {
    	BedManagementService = bedManagementServiceInjected
    }]));

	describe("createLayoutGrid", function(){
		it("should create grid layout", function(){
            var expectedBedLayout = [
                [
                    {
                        empty : false,
                        available : false,
                        bed : {
                            bedId: 1,
                            bedNumber: 'I1',
                            bedType: 'ICU Bed',
                            bedTags: undefined,
                            status: 'OCCUPIED'
                        }
                    },
                    {
                        empty : true,
                        available : false,
                        bed : {
                            bedId: false,
                            bedNumber: false,
                            bedType: false,
                            bedTags: false,
                            status: false
                        }
                    }
                ],
                [
                    {
                        empty : true,
                        available : false,
                        bed : {
                            bedId: false,
                            bedNumber: false,
                            bedType: false,
                            bedTags: false,
                            status: false
                        }
                    },
                    {
                        empty : false,
                        available : true,
                        bed : {
                            bedId: 2,
                            bedNumber: 'I2',
                            bedType: 'ICU Bed',
                            bedTags: undefined,
                            status: 'AVAILABLE'
                        }
                    }
                ]
            ];
            var actualLayout = BedManagementService.createLayoutGrid(bedLayouts);
            expect(actualLayout).toEqual(expectedBedLayout);
        });
    });
});