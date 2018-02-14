import { Inject, Singleton } from "typescript-ioc";
import UserRepository from "../repositories/UserRepository";
import { User } from "../models/User";
import EntityNotFoundError from "../exceptions/EntityNotFoundError";
import BadRequestEntity from "../exceptions/BadRequestEntity";
import NotAuthenticateError from "../exceptions/NotAuthenticateError";

@Singleton
export default class UserService {
    constructor(@Inject private userRepository: UserRepository) { }

    public async getAllUsers(): Promise<User[]> {
        return this.userRepository.getAllUsers();
    }

    public async findUserById(id: number): Promise<User> {
        return this.userRepository.findUserById(id);
    }

    public async authenticateUser(email: string, password: string | null): Promise<User> {
        try {
            const user = await this.userRepository.findUserByEmail(email);
            //TODO: bcrypt 패스워드일 경우 match로 변경할 것
            if (user.password != password) {
                throw new NotAuthenticateError();
            }
            delete user.password;
            return Promise.resolve(user);
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                throw new BadRequestEntity("The given email not found ");
            }
            throw e;
        }
    }

    public async createUser(newUser: User): Promise<User> {
        try {
            const user: User = await this.userRepository.findUserByEmail(newUser.email);
            if (user) {
                throw new BadRequestEntity(`${user.email} already registered`);
            }
            return this.userRepository.createUser(newUser);
        } catch (e) {
            throw e;
        }
    }
}