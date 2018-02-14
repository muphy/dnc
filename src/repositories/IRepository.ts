import { getEntityManager } from "typeorm";
import { User } from "../models/User";
import { VehicleDispatch } from "../models/VehicleDispatch";

export default abstract class IRepository {

    protected getUserRepository() {
        return getEntityManager().getRepository(User);
    }

    protected getVehicleDispatchRepository() {
        return getEntityManager().getRepository(VehicleDispatch);
    }

}
