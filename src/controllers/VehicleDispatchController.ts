import { IRouterContext } from "koa-router";
import { Container, Inject, Singleton } from "typescript-ioc";
import { User } from "../models/User";
import { VehicleDispatch } from "../models/VehicleDispatch";
import UserService from "../services/UserService";
import VehicleDispatchService from "../services/VehicleDispatchService";
import EntityNotFoundError from "../exceptions/EntityNotFoundError";
import BadRequestEntity from "../exceptions/BadRequestEntity";
import NotAuthenticateError from "../exceptions/NotAuthenticateError";
import * as jwt from "jsonwebtoken";

@Singleton
export default class VehicleDispatchController {

    static SECRET: string = "dnc";

    constructor(@Inject private userService: UserService,
        @Inject private vehicleDispatchService: VehicleDispatchService) { }

    public async getAllVehicleDispatch(ctx: IRouterContext) {
        try {
            const result: VehicleDispatch[] = await this.vehicleDispatchService.getAllVehicleDispatch();
            ctx.body = result;
        } catch (e) {
            ctx.throw(500, e.message);
        }
    }

}
