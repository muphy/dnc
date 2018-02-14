import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string | null = null;
    @Column()
    email: string | null = null;
    @Column()
    password: string | null = null;
    @Column()
    role: Role | null = null;

    public static newUser(obj: { name: string, email: string, password: string, role: string }): User {
        const user: User = new User();
        user.name = obj.name;
        user.email = obj.email;
        user.password = obj.password;
        user.role = <Role>obj.role.toUpperCase();
        return user;
    }

}

export enum Role {
    CUSTOMER = "CUSTOMER",
    DRIVER = "DRIVER"
}
