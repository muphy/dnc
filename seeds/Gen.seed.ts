import { createConnection, getEntityManager, Repository } from "typeorm";
import { User, Client, Driver } from "../src/models/User";
import { VehicleDispatch } from "../src/models/VehicleDispatch";
import UserRepository from "../src/repositories/UserRepository";
import ClientRepository from "../src/repositories/ClientRepository";
import DriverRepository from "../src/repositories/DriverRepository";
import VehicleDispatchRepository from "../src/repositories/VehicleDispatchRepository";
import { IUser, Role } from "../src/services/IUserService"

import { UserRegistrationService } from "../src/services/UserService";
import ClientService from "../src/services/ClientService";
import DriverService from "../src/services/DriverService";

import * as assert from "assert";
import VehicleDispatchService from "../src/services/VehicleDispatchService";

async function main() {
    await createConnection({
        name: "default",
        driver: {
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "root",
            database: "mydb",
        },
        entities: [
            User, Client, Driver, VehicleDispatch
        ],
        logging: {
            logQueries: true
        }
    });
    const rawUserRepository = getEntityManager().getRepository(User);
    const rawClientRepsitory = getEntityManager().getRepository(Client);
    const rawDriverRepsitory = getEntityManager().getRepository(Driver);
    const rawVehicleDispatchRepository = getEntityManager().getRepository(VehicleDispatch);

    const userRepository: UserRepository = new UserRepository();
    const clientRepository: ClientRepository = new ClientRepository();
    const driverRepository: DriverRepository = new DriverRepository();
    const vehicleDispatchRepository: VehicleDispatchRepository = new VehicleDispatchRepository();

    //Deletes all data that was saved before.
    await rawUserRepository.query('truncate table vehicle_dispatch');
    await rawUserRepository.query('truncate table user');
    await rawUserRepository.query('truncate table client');
    await rawUserRepository.query('truncate table driver');

    //create driver user;
    let userRegistrationService: UserRegistrationService = new UserRegistrationService(userRepository, clientRepository, driverRepository);
    const newDriver: User = User.newUser({
        name: "driver1",
        email: "driver1@gmail.com",
        password: "1234",
        role: Role.DRIVER
    });
    await userRegistrationService.signup(newDriver);

    const users: User[] = await rawUserRepository.createQueryBuilder("user")
        .select()
        .from(User, "user")
        .getMany();

    assert.equal(users.length, 1);

    //create client user;
    const newClient: User = User.newUser({
        name: "client1",
        email: "client1@gmail.com",
        password: "1234",
        role: Role.CLIENT
    });
    await userRegistrationService.signup(newClient);

    //create clients' order
    const clientService: ClientService = new ClientService(vehicleDispatchRepository);
    const v: VehicleDispatch = await clientService.requestVehicleOrder({
        client: {
            userId: 2
        },
        when: new Date(),
        address: {
            name: "판교로 256"
        }
    });
    clientService.requestVehicleOrder({
        client: {
            userId: 2
        },
        when: new Date(),
        address: {
            name: "판교로 257"
        }
    });

    //create drivers' accept
    const driverService: DriverService = new DriverService(vehicleDispatchRepository);
    const v2 = await driverService.acceptTaxiOrder({
        id: v.id,
        driver: {
            userId: 1
        },
        when: new Date()
    });

    console.log("v2", v2);
    const canAccepted = await driverService.canAcceptTaxiOrder({ userId: 1 });

    assert.equal(canAccepted, false);

    //get all vehicleDispatches
    const vehicleDispatchService: VehicleDispatchService = new VehicleDispatchService(vehicleDispatchRepository);
    const vehicleDispatchHistory = await vehicleDispatchService.getAllHistory();
    console.log(vehicleDispatchHistory);
}

main();