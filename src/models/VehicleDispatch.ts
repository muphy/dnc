import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { version } from "punycode";

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
    requestedAt: string;

    //a customer's id to request a vehicle
    @Column()
    customerId: number;

    @Column()
    address: string;

    //a drivers's id to accept a customer's request
    @Column()
    driverId: number;

    //time for driver to accept a customer's request
    @Column()
    acceptedAt: string | null;

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

    public static newCustomerRequest(obj: { customerId: number, address: string }): VehicleDispatch {
        const vehicleDispatch: VehicleDispatch = new VehicleDispatch();
        vehicleDispatch.customerId = obj.customerId;
        vehicleDispatch.address = obj.address;
        vehicleDispatch.requestedAt = "";
        return vehicleDispatch;
    }
}