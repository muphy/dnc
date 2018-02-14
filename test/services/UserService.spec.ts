import { expect } from "chai";
import "mocha";
import * as sinon from "sinon";
import "sinon-chai";
import { instance, mock, verify, when } from "ts-mockito";

import UserService from "../../src/services/UserService";
import UserRepository from "../../src/repositories/UserRepository";
import UserBuilder from "../../src/models/builders/UserBuilder";

describe("UserService", () => {
    let userService : UserService;
    let userRepository: UserRepository;

    const userId = 1234;
    const userEmail = "dev@dramancompany.com";
    const defaultCustomers = UserBuilder.getListOfDefaultUserByLength(5);
    const userWithId = UserBuilder.defaultCustomerUser().withId(userId).build();
    const userWithEmail = UserBuilder.defaultCustomerUser().withEmail(userEmail).build();

    beforeEach( () => {
        userRepository = mock(UserRepository);
        userService = new UserService(instance(userRepository));
    });

    describe("findAll", () => {
        it("should find all users", async () => {
            when(userRepository.getAllUsers()).thenReturn(Promise.resolve(defaultCustomers));
            const result = await userService.getAllUsers();
            expect(result).to.equal(defaultCustomers);
        });
    });

    describe("findById", () => {
        it("should find a user by id", async () => {
            when(userRepository.findUserById(userId)).thenReturn(Promise.resolve(userWithId));
            const result = await userService.findUserById(userId);
            expect(result).to.equal(userWithId);
        });
    });

    describe("authenticateUser", () => {
        it("should authenticate user by right email and password", async () => {
            when(userRepository.findUserByEmail(userEmail)).thenReturn(Promise.resolve(userWithEmail));
            const result = await userService.authenticateUser(userEmail,userWithEmail.password);
            expect(result).to.equal(userWithEmail);
        });
    });

    describe("createUser", () => {
        it("should create user", async () => {
            when(userRepository.createUser(userWithEmail)).thenReturn(Promise.resolve(userWithEmail));
            const result = await userService.createUser(userWithEmail)
            expect(result).to.equal(userWithEmail);
        });
    });
});