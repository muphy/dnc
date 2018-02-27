import { VehicleDispatch } from "../models/VehicleDispatch";
import { User } from "../models/User";

export interface IClient {
    /** user's id*/
    userId: number;
}

export interface IAddress {
    name: string;
}

export interface IVehicleOrder {
    id?: number;
    client: IClient;
    when: Date;
    address: IAddress;
    clientInfo?: User;
}

export interface IClientService {
    /**
     * 택시 배차를 요청한다.
     * @param order IVehicleOrder
     */
    requestVehicleOrder(order: IVehicleOrder): Promise<VehicleDispatch>;
}

