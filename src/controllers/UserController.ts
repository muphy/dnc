import { IRouterContext } from "koa-router";
import { Container, Inject, Singleton } from "typescript-ioc";
import { User } from "../models/User";
import UserService from "../services/UserService";
import EntityNotFoundError from "../exceptions/EntityNotFoundError";
import BadRequestEntity from "../exceptions/BadRequestEntity";
import NotAuthenticateError from "../exceptions/NotAuthenticateError";
import * as jwt from "jsonwebtoken";

@Singleton
export default class UserController {

    static SECRET:string = "dnc";

    constructor(@Inject private userService: UserService) { }

    public async signup(ctx: IRouterContext) {
        try {
            const user: User = User.newUser(ctx.request.body);
            ctx.body = await this.userService.createUser(user);
        } catch (e) {
            ctx.throw(400, e.message);
        }
    }

    public async signin(ctx: IRouterContext) {
        try {
            const email: string = ctx.request.body.email;
            const password: string = ctx.request.body.password;
            const user: User = await this.userService.authenticateUser(email, password);
            const token = jwt.sign(user,UserController.SECRET);
            ctx.body = {token:token};
        } catch (e) {
            if (e instanceof NotAuthenticateError) {
                ctx.throw(401, e.message);
            } else if (e instanceof BadRequestEntity) {
                ctx.throw(400, e.message);
            } else {
                ctx.throw(500, e.message);
            }
        }
    }

}
