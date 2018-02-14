import IRepository from "./IRepository";
import { User } from "../../src/models/User";
import EntityNotFoundError from "../exceptions/EntityNotFoundError";

export default class UserRepository extends IRepository {

    public async getAllUsers(): Promise<User[]> {
        return this.getUserRepository().find();
    }

    public async findUserById(id: number): Promise<User> {
        const result = await this.getUserRepository().findOneById(id);
        if (!result) {
            throw new EntityNotFoundError(`id: ${id} not found`);
        }
        return result;
    }

    public async findUserByEmail(email: string | null ): Promise<User> {
        const result = await this.getUserRepository().findOne({ email: email });
        if (!result) {
            throw new EntityNotFoundError(`email: ${email} not found`);
        }
        return result;
    }

    public async createUser(user: User): Promise<User> {
        return this.getUserRepository().persist(user);
    }
}