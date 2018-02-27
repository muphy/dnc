export enum Role {
    CLIENT = "CLIENT",
    DRIVER = "DRIVER"
}

export interface IUser {
    id?: number;
    name: string;
    email: string;
    password: string;
    role: Role;
}

export interface IUserRegistration {
    signup(user: IUser): Promise<IUser>;
}

export interface ICredential {
    email: string;
    password: string;
}

export interface IAuthToken {
    token: string;
}

export interface IAuthentication {
    signin(credential: ICredential): Promise<IAuthToken>;
}