import { expect } from "chai";
import "mocha";
import * as sinon from "sinon";
import "sinon-chai";
import { instance, mock, verify, when } from "ts-mockito";

import { VehicleDispatch }  from "../../src/models/VehicleDispatch";
import VehicleDispatchService from "../../src/services/VehicleDispatchService";
import VehicleDispatchRepository from "../../src/repositories/VehicleDispatchRepository";
import VehicleDispatchBuilder from "../../src/models/builders/VehicleDispatchBuilder";

describe("VehicleDispatchService", () => {

    let vehicleDispatchService: VehicleDispatchService;
    let vehicleDispatchRepository: VehicleDispatchRepository;
    let defaultVehicleDispatchs = VehicleDispatchBuilder.getListOfDefaultVehicleDispatchByLength();
    let waitingStatusVehicleDispatch = VehicleDispatchBuilder.defaultVehicleDispatch().withDriverId(0).withAcceptedAt(null).build();
     
    beforeEach(() => {
        vehicleDispatchRepository = mock(VehicleDispatchRepository);
        vehicleDispatchService = new VehicleDispatchService(instance(vehicleDispatchRepository));
    });

    describe("getAllVehicleDispatch", () => {
        it('should find all VehicleDispatch', async () => {
            when(vehicleDispatchRepository.getAllVehicleDispatch()).thenReturn(Promise.resolve(defaultVehicleDispatchs));
            const result = await vehicleDispatchService.getAllVehicleDispatch();
            expect(result).to.equal(defaultVehicleDispatchs);
        });
    });

    describe("checkStatusOfVehicleDispatch", () => {
        it('should find all VehicleDispatch', async () => {
            when(vehicleDispatchRepository.getAllVehicleDispatch()).thenReturn(Promise.resolve(defaultVehicleDispatchs));
            const result = await vehicleDispatchService.getAllVehicleDispatch();
            expect(result[0].isWating).to.equal(false);
            expect(result[0].isAccepted).to.equal(true);
            let temp = result[1];
            expect(result[1].isWating).to.equal(true);
            expect(result[1].isAccepted).to.equal(false);
        });
    });
});