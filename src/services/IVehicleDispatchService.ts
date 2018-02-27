import { IVehicleOrder } from "./IClientService";
import { IVehicleAccept } from "./IDriverService";

export interface IVehicleDispatch {
    id: number;
    vehicleOrder: IVehicleOrder;
    vehicleAccept?: IVehicleAccept;
}

export interface IVehicleDispatchService {
    getAllHistory(): Promise<IVehicleDispatch[]>;
}
