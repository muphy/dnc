import { IRouterContext } from "koa-router";
import { Inject } from "typescript-ioc";
import UserController from "../controllers/UserController";
import Route from "./Route";
import IRoutes from "./IRoutes";

export default class UserRoutes extends IRoutes {

    constructor( @Inject private userController: UserController) {
        super();
    }

    protected getRoutes(): Route[] {
        return [
            Route.newRoute("/singup", "post", (ctx: IRouterContext) => this.userController.signup(ctx)),
            Route.newRoute("/singin", "post", (ctx: IRouterContext) => this.userController.signin(ctx))
        ];
    }
}
