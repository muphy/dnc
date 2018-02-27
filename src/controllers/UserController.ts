import { IRouterContext } from "koa-router";
import { Container, Inject, Singleton } from "typescript-ioc";
import { User } from "../models/User";
import { UserRegistrationService, UserAuthenticationService } from "../services/UserService";
import EntityNotFoundError from "../exceptions/EntityNotFoundError";
import BadRequestEntity from "../exceptions/BadRequestEntity";
import NotAuthenticateError from "../exceptions/NotAuthenticateError";
import * as jwt from "jsonwebtoken";
import { ICredential,IAuthToken } from "../services/IUserService";

@Singleton
export default class UserController {

    constructor(@Inject private userRegistrationService: UserRegistrationService,
        @Inject private userAuthenticationService: UserAuthenticationService) { }

    public async signup(ctx: IRouterContext) {
        try {
            const user: User = User.newUser(ctx.request.body);
            ctx.status = 201;
            ctx.body = await this.userRegistrationService.signup(user);
        } catch (e) {
            if (e instanceof BadRequestEntity) {
                ctx.status = 400;
                ctx.body = e.message;
            } else {
                ctx.status = 500;
                ctx.body = e.message;
            }
        }
    }

    public async signin(ctx: IRouterContext) {
        try {
            // console.log("body",ctx.request.body);
            const credencial = ctx.request.body as ICredential;
            const token: IAuthToken = await this.userAuthenticationService.signin(credencial);
            ctx.body = token;
        } catch (e) {
            if (e instanceof NotAuthenticateError) {
                ctx.status = 401;
                ctx.body = e.message;
            } else if (e instanceof EntityNotFoundError) {
                ctx.status = 404;
                ctx.body = e.message;
            } else {
                ctx.status = 500;
                ctx.body = e.message;
            }
        }
    }
}