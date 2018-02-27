import { Singleton } from "typescript-ioc";
import { getEntityManager, Repository } from "typeorm";

import { User } from "../models/User";

import EntityNotFoundError from "../exceptions/EntityNotFoundError";
import BadRequestEntity from "../exceptions/BadRequestEntity";

import { IUser } from "../services/IUserService";
import IRepository from "./IRepository";

export default class UserRepository extends IRepository {


    public async findUserByEmail(email: string ): Promise<IUser> {
        const result = await this.getUserRepository().findOne({ email: email });
        if (result) {
            return result;
        } else {
            throw new EntityNotFoundError();
        }
    }

    public async createUser(user: IUser): Promise<IUser> {
        let newUser = user as User;
        await this.getUserRepository().persist(newUser);
        return newUser;
    }
    // public async findUserById(id: number): Promise<IUser> {
    //     const result = await this.findOneById(id, {alias:"user", leftJoinAndSelect: {
    //         authorities: "user.authorities"
    //     } });
    //     if (!result) {
    //         throw new EntityNotFoundError(`id: ${id} not found`);
    //     }
    //     return result;
    // }
}