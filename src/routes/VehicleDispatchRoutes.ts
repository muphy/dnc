import { IRouterContext } from "koa-router";
import { Inject } from "typescript-ioc";
import VehicleDispatchController from "../controllers/VehicleDispatchController";
import Route from "./Route";
import IRoutes from "./IRoutes";

export default class VehicleDispatchRoutes extends IRoutes {

    constructor( @Inject private vehicleDispatchController: VehicleDispatchController) {
        super();
    }

    protected getRoutes(): Route[] {
        return [
            Route.newRoute("/api/public/vehicledispatch", "get", (ctx: IRouterContext) => this.vehicleDispatchController.getAllVehicleDispatch(ctx)),
        ];
    }
}
