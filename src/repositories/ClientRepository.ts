import { Singleton } from "typescript-ioc";
import { getEntityManager, Repository } from "typeorm";

import { Client } from "../models/User";
import IRepository from "./IRepository";

@Singleton
export default class ClientRepository extends IRepository {

    public async saveClient(client: Client): Promise<Client> {
        return this.getClientRepository().persist(client);
    }
}

