import { User, Role } from '../User';

export default class UserBuilder {

    private user: User;

    constructor() {
        this.user = new User();
    }

    public static newUserBuilder(): UserBuilder {
        return new UserBuilder();
    }

    public withName(name: string) {
        this.user.name = name;
        return this;
    }

    public withEmail(email: string) {
        this.user.email = email;
        return this;
    }

    public withPassword(password: string) {
        this.user.password = password;
        return this;
    }

    public withRole(role: Role) {
        this.user.role = role;
        return this;
    }

    public withId(id: number) {
        this.user.id = id;
        return this;
    }

    public withRandomId() {
        this.user.id = Math.random() * 10;
        return this;
    }

    public withCustomerRole() {
        this.user.role = Role.CUSTOMER;
        return this;
    }

    public withDriverRole() {
        this.user.role = Role.DRIVER;
        return this;
    }

    public build() {
        return this.user;
    }

    public static defaultCustomerUser() {
        return new UserBuilder()
        .withRandomId()
        .withEmail("123@dramancompany")
        .withPassword("1234")
        .withCustomerRole()
    }

    public static defaultDriverUser() {
        return new UserBuilder()
        .withRandomId()
        .withEmail("123@dramancompany")
        .withPassword("1234")
        .withDriverRole();
    }

    public static getListOfDefaultUserByLength(length: number) {
        let result = [];
        for(let i = 0 ; i < length; i++) {
            result.push(UserBuilder.defaultCustomerUser().build());
        }
        return result;
    }
}