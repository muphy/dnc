import { Singleton } from "typescript-ioc";
import { getEntityManager, Repository } from "typeorm";

import BadRequestEntity from "../exceptions/BadRequestEntity";
import EntityNotFoundError from "../exceptions/EntityNotFoundError";

import { VehicleDispatch } from "../models/VehicleDispatch";
import { User} from "../models/User";
import IRepository from "./IRepository";

export default class VehicleDispatchRepository extends IRepository {

    public async findById(id: number): Promise<VehicleDispatch> {
        const vehicleDispatch = await this.getVehicleDispatchRepository().findOneById(id);
        if (!vehicleDispatch) {
            throw new EntityNotFoundError("id not found");
        }
        return vehicleDispatch;
    }

    public async getAllVehicleDispatches(): Promise<VehicleDispatch[]> {
        return this.getVehicleDispatchRepository().createQueryBuilder("vd")
            .innerJoinAndMapOne("vd.client", User, "customer", "customer.id = vd.customer_id")
            .leftJoinAndMapOne("vd.driver", User, "driver", "driver.id = vd.driver_id")
            .orderBy("vd.id", "DESC")
            .getMany();
    }

    public async saveRequest(vehicleDispatch: VehicleDispatch): Promise<VehicleDispatch> {
        return this.getVehicleDispatchRepository().persist(vehicleDispatch);
    }

    public async acceptRequest(vehicleDispatch: VehicleDispatch): Promise<VehicleDispatch> {
        return this.getVehicleDispatchRepository().persist(vehicleDispatch);
    }

    public async countAcceptByDriverId(driverId: number): Promise<number> {
        const result: VehicleDispatch[] = await this.getVehicleDispatchRepository().createQueryBuilder("vd")
            .select()
            .from(VehicleDispatch, "vd")
            .where("vd.driver_id = :driverId", { driverId: 1 })
            .getMany();
        return result.length;
    }
}