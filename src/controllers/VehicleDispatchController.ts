import { IRouterContext } from "koa-router";
import { Container, Inject, Singleton } from "typescript-ioc";
import { User } from "../models/User";
import { VehicleDispatch } from "../models/VehicleDispatch";
import ClientService from "../services/ClientService";
import DriverService from "../services/DriverService";
import VehicleDispatchService from "../services/VehicleDispatchService";
import EntityNotFoundError from "../exceptions/EntityNotFoundError";
import BadRequestEntity from "../exceptions/BadRequestEntity";
import NotAuthenticateError from "../exceptions/NotAuthenticateError";
import * as jwt from "jsonwebtoken";

@Singleton
export default class VehicleDispatchController {

    static SECRET: string = "dnc";

    constructor(@Inject private clientService: ClientService,
        @Inject private driverSerivce: DriverService,
        @Inject private vehicleDispatchService: VehicleDispatchService) { }

    public async getAllVehicleDispatch(ctx: IRouterContext) {
        try {
            const result = await this.vehicleDispatchService.getAllHistory();
            ctx.body = result;
        } catch (e) {
            ctx.status = 500;
            ctx.body = e.message;
        }
    }

    public async request(ctx: IRouterContext) {
        const client = ctx.state.user;
        try {
            const address = ctx.request.body.address;
            const order = {
                client: { userId: client.id },
                when: new Date(),
                address: {
                    name: address
                }
            }
            const result = await this.clientService.requestVehicleOrder(order);
            ctx.status = 201;
            ctx.body = result;
        } catch (e) {
            ctx.status = 500;
            ctx.body = e.message;
        }
    }

    public async accept(ctx: IRouterContext) {
        const driver = ctx.state.user;
        try {
            const accept = {
                id: ctx.request.body.id,
                driver: { userId: driver.id },
                when: new Date()
            }
            const result = await this.driverSerivce.acceptTaxiOrder(accept);
            ctx.body = result;
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                ctx.status = 404;
                ctx.body = e.message;
            } else {
                ctx.status = 500;
                ctx.body = e.message;
            }
        }
    }

}
