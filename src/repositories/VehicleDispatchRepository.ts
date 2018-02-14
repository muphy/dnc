import IRepository from "./IRepository";
import { VehicleDispatch } from "../models/VehicleDispatch";

export default class VehicleDispatchRepository extends IRepository {

    public async getAllVehicleDispatch(): Promise<VehicleDispatch[]> {
        return this.getVehicleDispatchRepository().find();
    }
}