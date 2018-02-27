import { IUser } from "./IUserService";
import { VehicleDispatch } from "../models/VehicleDispatch";
import {User} from "../models/User";

export interface IDriver {
    /** user's id*/
    userId: number;
}

export interface IVehicleAccept {
    /* client's order id */
    id: number;
    driver: IDriver;
    when: Date;
    isAccepted?: boolean;
    driverInfo?: User;
}

export interface IDriverService {
    /**
     * 사용자의 배차 요청을 수락한다.
     * @param accept 
     */
    acceptTaxiOrder(accept: IVehicleAccept): Promise<VehicleDispatch>;

    /**
     * 배차 수락 제약 조건 "하나의 배차 요청에는 최대 한 명의 기사가 배차되어야 합니다."
     * 따라서 수락한 배차 요청이 한 개 이상일 때는 false 를 반환, 0개 일 경우는 true 를 반환
     * @param driver driver
     */
    canAcceptTaxiOrder(driver: IDriver): Promise<boolean>;
}