import { Inject, Singleton } from "typescript-ioc";
import EntityNotFoundError from "../exceptions/EntityNotFoundError";
import BadRequestEntity from "../exceptions/BadRequestEntity";
import NotAuthenticateError from "../exceptions/NotAuthenticateError";

import { IVehicleOrder, IClientService } from "./IClientService";
import VehicleDispatchRepository from "../repositories/VehicleDispatchRepository";

import { VehicleDispatch } from "../models/VehicleDispatch";

@Singleton
export default class ClientService implements IClientService {

    constructor(@Inject private vehicleDispatchRepository: VehicleDispatchRepository) {
    }

    public async requestVehicleOrder(order: IVehicleOrder): Promise<VehicleDispatch> {
        const vehicleDispatch: VehicleDispatch = VehicleDispatch.newCustomerRequest(order);
        const result = await this.vehicleDispatchRepository.saveRequest(vehicleDispatch);
        return result;
    }

}