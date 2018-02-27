import { Singleton } from "typescript-ioc";
import { getEntityManager, Repository } from "typeorm";

import { Driver } from "../models/User";
import IRepository from "./IRepository";

@Singleton
export default class DriverRepository extends IRepository {

    public async saveDriver(driver: Driver): Promise<Driver> {
        return this.getDriverRepository().persist(driver);
    }
}

