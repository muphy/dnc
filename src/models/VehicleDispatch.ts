import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum DistpatchStatus {
    IS_WATING,
    IS_ACCEPTED
}

@Entity()
export class VehicleDispatch {
    @PrimaryGeneratedColumn()
    id: number;

    //time for customer to request a vehicle
    @Column()
    requestedAt: Date | null = null;

    //a customer's id to request a vehicle
    @Column()
    customerId: number = 0;

    @Column()
    address: string = "";

    //a drivers's id to accept a customer's request
    @Column()
    driverId: number = 0;

    //time for driver to accept a customer's request
    @Column()
    acceptedAt: Date | null = null;

    public get isWating(): boolean {
        const isNotAssignDirver = this.driverId == 0;
        const isNotAcceptedByDriver: boolean = (isNotAssignDirver && !this.acceptedAt);
        return isNotAcceptedByDriver;
    }

    public get isAccepted(): boolean {
        const isAssignDirver = this.driverId > 0;
        const isAcceptedByDriver: boolean = (isAssignDirver && this.acceptedAt != null);
        return isAcceptedByDriver;
    }

}