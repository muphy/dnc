import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, SingleEntityChild, JoinColumnOptions } from "typeorm";

import { IUser, Role } from "../services/IUserService"
import { IClient } from "../services/IClientService"
import { IDriver } from "../services/IDriverService"

@Entity()
export class User implements IUser {
    @PrimaryGeneratedColumn()
    id: number;
    @Column("string")
    name: string;
    @Column("string")
    email: string;
    @Column("string")
    password: string;

    role: Role;

    public static newUser(obj: { name: string, email: string, password: string, role: Role }): User {
        const user: User = new User();
        user.name = obj.name;
        user.email = obj.email;
        user.password = obj.password;
        if (obj.role) {
            user.role = obj.role;
        }
        return user;
    }
}

@Entity()
export class Client implements IClient {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ name: "user_id", type: "number" })
    userId: number;
}

@Entity()
export class Driver implements IDriver {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ name: "user_id", type: "number" })
    userId: number;
}
