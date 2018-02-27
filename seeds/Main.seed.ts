import { createConnection } from "typeorm";
import { User} from "../src/models/User";
import { Role } from "../src/services/IUserService"
import { VehicleDispatch } from "../src/models/VehicleDispatch";
import UserRepository from "../src/repositories/UserRepository";

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
            User,  VehicleDispatch
        ],
        logging: {
            logQueries: true
        }
    });
    
    let userRepository: UserRepository = new UserRepository();
    // let userService: UserService = new UserService(userRepository,authorityRepository);
    const newUser: User = User.newUser({
        name: "driver1",
        email: "driver1@gmail.com",
        password:"1234",
        role: Role.DRIVER
    });
    try {
        // const user = await userService.findUserById(17);
        // console.log("!!!!",user);
        // const failloginUser = await userService.authenticateUser("aaa","!11");
        // console.log(failloginUser);
        // const successloginUser = await userService.authenticateUser(newUser.email,newUser.password);
        // console.log("=>",successloginUser);
        // const result = await userRepository.findCustomerByUserId(5);
        // console.log(result);
    } catch(e) {
        console.log(e);
    }
}

main();