import { getEntityManager } from "typeorm";
import { User,Client,Driver} from "../models/User";
import { VehicleDispatch } from "../models/VehicleDispatch";

export default abstract class IRepository {

    protected getUserRepository() {
        return getEntityManager().getRepository(User);
    }

    protected getClientRepository() {
        return getEntityManager().getRepository(Client);
    }

    protected getDriverRepository() {
        return getEntityManager().getRepository(Driver);
    }

    protected getVehicleDispatchRepository() {
        return getEntityManager().getRepository(VehicleDispatch);
    }

}
