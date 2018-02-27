import { Inject, Singleton } from "typescript-ioc";
import UserRepository from "../repositories/UserRepository";
import ClientRepository from "../repositories/ClientRepository";
import DriverRepository from "../repositories/DriverRepository";
import { User, Client, Driver } from "../models/User";
import EntityNotFoundError from "../exceptions/EntityNotFoundError";
import BadRequestEntity from "../exceptions/BadRequestEntity";
import NotAuthenticateError from "../exceptions/NotAuthenticateError";

import { IUser, IUserRegistration, IAuthentication, ICredential, IAuthToken, Role } from "../services/IUserService"
import * as jwt from "jsonwebtoken";

@Singleton
export class UserRegistrationService implements IUserRegistration {
    constructor(@Inject private userRepository: UserRepository,
        @Inject private clientRepository: ClientRepository,
        @Inject private driverRepository: DriverRepository
    ) { }

    public async signup(newUser: IUser): Promise<IUser> {
        try {
            let user = await this.userRepository.findUserByEmail(newUser.email);
            if (user) {
                throw new BadRequestEntity(`${user.email} already registered`);
            }
            return newUser;
        } catch (e) {
            if (e instanceof BadRequestEntity) {
                throw e;
            } else {
                const user: IUser = await this.userRepository.createUser(newUser);
                if (newUser.role === Role.CLIENT) {
                    const client = { userId: user.id } as Client;
                    this.clientRepository.saveClient(client);
                } else if (newUser.role === Role.DRIVER) {
                    const driver = { userId: user.id } as Driver;
                    this.driverRepository.saveDriver(driver);
                } else {
                    throw new BadRequestEntity(`${newUser.role} is unknown`);
                }
                return user;
            }
        }
    }
}

@Singleton
export class UserAuthenticationService implements IAuthentication {
    // public static SECRET: string = process.env.JWT_SECRETKEY;
    public static SECRET: string = "dnc";
    constructor(@Inject private userRepository: UserRepository) { }

    public async signin(credential: ICredential): Promise<IAuthToken> {
        try {
            const user = await this.userRepository.findUserByEmail(credential.email);
            //TODO: bcrypt 패스워드일 경우 match로 변경할 것
            if (user.password != credential.password) {
                throw new NotAuthenticateError();
            }
            delete user.password;
            const token = jwt.sign(user, UserAuthenticationService.SECRET);
            return { token: token };
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                throw new EntityNotFoundError("The given email not found ");
            }
            throw e;
        }
    }
}
