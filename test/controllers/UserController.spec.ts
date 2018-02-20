import { expect } from "chai";
import { Context } from "koa";
import { IRouterContext } from "koa-router";
import "mocha";
import * as sinon from "sinon";
import { anything, capture, instance, mock, verify, when } from "ts-mockito";
import * as jwt from "jsonwebtoken";
import UserController from "../../src/controllers/UserController";
import UserService from "../../src/services/UserService";
import { User } from "../../src/models/User";
import * as dotenv from "dotenv"

dotenv.config();

describe("UserController", () => {
    let userController: UserController;
    let userService: UserService;

    let defaultUser: User = User.newUser({
        name: "john",
        email: "john@dramancompany.com",
        password: "123456",
        role: "customer"
    });

    beforeEach(() => {
        userService = mock(UserService);
        userController = new UserController(instance(userService));
    });

    describe("signup", () => {
        it("return new user with 200 code", async () => {
            const ctx: Context = { request:{} } as Context;
            const requestBody = {
                name: "john",
                email:"john@dramancompany.com",
                password:"123456",
                role: "CUSTOMER"
            };
            ctx.request.body = requestBody;
            when(userService.createUser(anything())).thenReturn(Promise.resolve(defaultUser));
            const user = await userController.signup(ctx);
            // const [firstArg] = capture(userService.createUser).last();
            // console.log("!!!");
            // console.log(JSON.stringify(ctx.body));
            // console.log(JSON.stringify(requestBody));
            expect(JSON.stringify(ctx.body)).to.equal(JSON.stringify(requestBody));
        });
    });

    describe("signin", () => {
        it("return jwt token with 200", async () => {
            const ctx: Context = { request:{} } as Context;
            const requestBody = {
                email:"john@dramancompany.com",
                password:"123456"
            };
            ctx.request.body = requestBody;
            delete defaultUser.password;
            const defaultJwt = jwt.sign(defaultUser,process.env.JWT_SECRETKEY);
            when(userService.authenticateUser(requestBody.email,requestBody.password)).thenReturn(Promise.resolve(defaultUser));
            await userController.signin(ctx);
            expect(ctx.body.token).to.equal(defaultJwt);
        });
    });

});