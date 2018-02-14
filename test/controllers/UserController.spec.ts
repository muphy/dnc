import { expect } from "chai";
import { Context } from "koa";
import { IRouterContext } from "koa-router";
import "mocha";
import * as sinon from "sinon";
import { anything, capture, instance, mock, verify, when } from "ts-mockito";
import UserController from "../../src/controllers/UserController";
import UserService from "../../src/services/UserService";
import { User } from "../../src/models/User";

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

    describe("createUser", () => {
        it("return new user with 200 code", async () => {
            const ctx: Context = { request:{} } as Context;
            const requestBody = {
                name: "john",
                email:"john@dramancompany.com",
                password:"123456",
                role: "customer"
            };
            ctx.request.body = requestBody;
            when(userService.createUser(anything())).thenReturn(Promise.resolve(defaultUser));
            await userController.signup(ctx);
            const [firstArg] = capture(userService.createUser).last();
            console.log(JSON.stringify(firstArg));
            expect(firstArg.name).to.equal(requestBody.name);
        });
    });

});