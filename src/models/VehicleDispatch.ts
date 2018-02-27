import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, OneToOne, JoinTable } from "typeorm";
import { version } from "punycode";

import { IVehicleOrder } from "../services/IClientService";
import { IVehicleAccept } from "../services/IDriverService";
import { User } from "../models/User";
export enum DistpatchStatus {
    IS_WATING,
    IS_ACCEPTED
}

@Entity("vehicle_dispatch")
export class VehicleDispatch {
    @PrimaryGeneratedColumn()
    id: number;

    //time for customer to request a vehicle
    @Column({ name: "requested_at", type: "date" })
    requestedAt: Date;

    //a customer to order a vehicle
    client: User;

    //a driver to accepted customer's order
    driver: User;

    @Column("string")
    address: string;

    //a drivers's id to accept a customer's request
    @Column({ name: "driver_id", type: "number" })
    driverId: number;

    @Column({ name: "customer_id", type: "number" })
    customerId: number;

    //time for driver to accept a customer's request
    @Column({ name: "accepted_at", type: "date" })
    acceptedAt: Date;

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

    public static newCustomerRequest(order: IVehicleOrder): VehicleDispatch {
        const vehicleDispatch: VehicleDispatch = new VehicleDispatch();
        vehicleDispatch.customerId = order.client.userId;
        vehicleDispatch.address = order.address.name;
        vehicleDispatch.requestedAt = order.when;
        return vehicleDispatch;
    }

    public static newDriverAccept(accept: IVehicleAccept) {
        const vehicleDispatch: VehicleDispatch = new VehicleDispatch();
        vehicleDispatch.id = accept.id;
        vehicleDispatch.acceptedAt = accept.when;
        vehicleDispatch.driverId = accept.driver.userId;
        return vehicleDispatch;
    }
}