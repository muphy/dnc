import { Inject, Singleton } from "typescript-ioc";
import EntityNotFoundError from "../exceptions/EntityNotFoundError";
import BadRequestEntity from "../exceptions/BadRequestEntity";
import NotAuthenticateError from "../exceptions/NotAuthenticateError";
import VehicleDispatchRepository from "../repositories/VehicleDispatchRepository";
import { VehicleDispatch } from "../models/VehicleDispatch";
import VehicleDispatchBuilder from "../models/builders/VehicleDispatchBuilder";

@Singleton
export default class VehicleDispatchService {
    constructor(@Inject private vehicleDispatchRepository: VehicleDispatchRepository) { }

    public async getAllVehicleDispatch(): Promise<VehicleDispatch[]> {
        return this.vehicleDispatchRepository.getAllVehicleDispatch();
    }

    public async request(customerId:number,address:string): Promise<VehicleDispatch> {
        const vehicleDispatch: VehicleDispatch = VehicleDispatch.newCustomerRequest({customerId,address});
        return this.vehicleDispatchRepository.saveRequest(vehicleDispatch);
    }
    
}