import { Inject, Singleton } from "typescript-ioc";
import EntityNotFoundError from "../exceptions/EntityNotFoundError";
import BadRequestEntity from "../exceptions/BadRequestEntity";
import NotAuthenticateError from "../exceptions/NotAuthenticateError";
import VehicleDispatchRepository from "../repositories/VehicleDispatchRepository";
import { VehicleDispatch } from "../models/VehicleDispatch";
import VehicleDispatchBuilder from "../models/builders/VehicleDispatchBuilder";
import { IVehicleDispatchService, IVehicleDispatch } from "./IVehicleDispatchService";
import {IVehicleOrder} from "./IClientService";
import {IVehicleAccept} from "./IDriverService";

@Singleton
export default class VehicleDispatchService implements IVehicleDispatchService {

    constructor(@Inject private vehicleDispatchRepository: VehicleDispatchRepository) { }

    public async getAllHistory(): Promise<IVehicleDispatch[]> {
        const dispatches: VehicleDispatch[] = await this.vehicleDispatchRepository.getAllVehicleDispatches();
        const result: IVehicleDispatch[] = [];
        for (let dispatch of dispatches) {
            result.push(this.convertDispatch(dispatch));
        }
        return result;
    }

    /**
     * 프레젠테이션 레이어로 반환을 위해 객체. ex.user 의 password 는 제거. 
     * db layer 에서 해야 되지만 시간이 없어서 방법을 못 찾았음. 좀 더 우아한 방법을 찾아야 될 듯...
     * @param dispatch db layer 에서 받은 데이타
     */
    private convertDispatch(dispatch: VehicleDispatch): IVehicleDispatch {
        delete dispatch.client.password;

        const vehicleOrder: IVehicleOrder = {
            client: { userId: dispatch.client.id},
            when: dispatch.requestedAt,
            address: {
                name: dispatch.address
            },
            clientInfo: dispatch.client
        };

        const result: IVehicleDispatch = {
            id: dispatch.id,
            vehicleOrder: vehicleOrder
        };
        if(dispatch.driver) {
            delete dispatch.driver.password;
            result.vehicleAccept = {
                id: dispatch.id,
                driver: {userId: dispatch.driver.id},
                when: dispatch.acceptedAt,
                isAccepted: dispatch.acceptedAt != null,
                driverInfo: dispatch.driver
            }
        }
        return result;
    }

}