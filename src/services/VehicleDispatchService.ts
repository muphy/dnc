import { Inject, Singleton } from "typescript-ioc";
import EntityNotFoundError from "../exceptions/EntityNotFoundError";
import BadRequestEntity from "../exceptions/BadRequestEntity";
import NotAuthenticateError from "../exceptions/NotAuthenticateError";
import VehicleDispatchRepository from "../repositories/VehicleDispatchRepository";
import { VehicleDispatch } from "../models/VehicleDispatch";

@Singleton
export default class VehicleDispatchService {
    constructor(@Inject private vehicleDispatchRepository: VehicleDispatchRepository) { }

    public async getAllVehicleDispatch(): Promise<VehicleDispatch[]> {
        return this.vehicleDispatchRepository.getAllVehicleDispatch();
    }
    
}