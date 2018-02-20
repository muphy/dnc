import IRepository from "./IRepository";
import { VehicleDispatch } from "../models/VehicleDispatch";

export default class VehicleDispatchRepository extends IRepository {

    public async getAllVehicleDispatch(): Promise<VehicleDispatch[]> {
        return this.getVehicleDispatchRepository().find();
    }

    public async saveRequest(vehicleDispatch: VehicleDispatch): Promise<VehicleDispatch> {
        return this.getVehicleDispatchRepository().persist(vehicleDispatch);
    }

    public async acceptRequest(vehicleDispatch: VehicleDispatch): Promise<VehicleDispatch> {
        return this.getVehicleDispatchRepository().persist(vehicleDispatch);
    }
}