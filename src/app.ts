import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as logger from "koa-logger";
import * as Router from "koa-router";
import * as jwt from "koa-jwt";

import { createConnection } from "typeorm";
import { Inject } from "typescript-ioc";

import UserRoutes from "./routes/UserRoutes"
import VehicleDispatchRoutes from "./routes/VehicleDispatchRoutes"
import { User, Client, Driver } from "./models/User";
import { VehicleDispatch } from "./models/VehicleDispatch";
import { ClassEntityChild, Column, OneToMany, DiscriminatorValue, SingleEntityChild } from "typeorm";

export default class App {

    constructor(
        @Inject private userRoutes: UserRoutes,
        @Inject private vehicleDispatchRoutes: VehicleDispatchRoutes) { }

    private async createApp() {
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
        const app: Koa = new Koa();
        const router: Router = new Router();

        this.userRoutes.register(router);
        this.vehicleDispatchRoutes.register(router);

        // Middleware below this line is only reached if JWT token is valid
        // unless the URL starts with '/public'
        //ctx.state.user
        app.use(logger());
        app.use(bodyParser());
        app.use(router.allowedMethods());
        app.use(jwt({ secret: "dnc" }).unless({ path: [/^\/api\/public/, /^\/public/] }));
        app.use(router.routes());

        return Promise.resolve(app);
    }

    public async start() {
        const app = await this.createApp();
        console.log("Started listening on port 3000...");
        const server = app.listen(3000);
        return Promise.resolve(server);
    }

}
