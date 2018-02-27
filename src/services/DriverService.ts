import { Inject, Singleton } from "typescript-ioc";
import EntityNotFoundError from "../exceptions/EntityNotFoundError";
import BadRequestEntity from "../exceptions/BadRequestEntity";
import NotAuthenticateError from "../exceptions/NotAuthenticateError";

import { IVehicleAccept, IDriverService, IDriver } from "./IDriverService";
import VehicleDispatchRepository from "../repositories/VehicleDispatchRepository";

import { VehicleDispatch } from "../models/VehicleDispatch";

@Singleton
export default class DriverService implements IDriverService {

    constructor(@Inject private vehicleDispatchRepository: VehicleDispatchRepository) {
    }

    public async acceptTaxiOrder(accept: IVehicleAccept): Promise<VehicleDispatch> {
        const vehicleDispatch = await this.vehicleDispatchRepository.findById(accept.id);
        if(!vehicleDispatch) {
            throw new EntityNotFoundError("id not found");
        }
        vehicleDispatch.driverId = accept.driver.userId;
        vehicleDispatch.acceptedAt = accept.when;
        const result = await this.vehicleDispatchRepository.acceptRequest(vehicleDispatch);
        return result;
    }

    public async canAcceptTaxiOrder(driver: IDriver): Promise<boolean> {
        const numOfAcceptedOrder: number = await this.vehicleDispatchRepository.countAcceptByDriverId(driver.userId);
        // console.log('numOfAcceptedOrder',numOfAcceptedOrder);
        return numOfAcceptedOrder === 0;
    }
}