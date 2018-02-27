import { VehicleDispatch } from "../VehicleDispatch"

export default class VehicleDispatchBuilder {
    private vehicleDispatch: VehicleDispatch;

    constructor() {
        this.vehicleDispatch = new VehicleDispatch();
    }

    public static newVehicleDispatchBuilder(): VehicleDispatchBuilder {
        return new VehicleDispatchBuilder();
    }

    public withRequestAt(requestedAt: Date) {
        this.vehicleDispatch.requestedAt = requestedAt;
        return this;
    }

    public withCustomerId(customerId: number) {
        this.vehicleDispatch.customerId = customerId;
        return this;
    }

    public withAddress(address: string) {
        this.vehicleDispatch.address = address;
        return this;
    }
    public withDriverId(driverId: number) {
        this.vehicleDispatch.driverId = driverId;
        return this;
    }
    public withAcceptedAt(acceptedAt: Date) {
        this.vehicleDispatch.acceptedAt = acceptedAt;
        return this;
    }

    public build() {
        return this.vehicleDispatch;
    }

    public static defaultVehicleDispatch(): VehicleDispatchBuilder {
        return VehicleDispatchBuilder
            .newVehicleDispatchBuilder()
            .withCustomerId(Math.random() * 10)
            .withRequestAt(new Date())
            .withAddress("성남시 판교로")
            .withDriverId(Math.random() * 10)
            .withAcceptedAt(new Date());
    }

    public static getListOfDefaultVehicleDispatchByLength(): VehicleDispatch[] {
        let result = [];
        for (let i = 0; i < 10; i++) {
            if (i % 2 == 0) {
                //status accepted by driver
                result.push(VehicleDispatchBuilder.defaultVehicleDispatch().build());
            } else {
                //status not accepted by driver => wating
                result.push(VehicleDispatchBuilder.defaultVehicleDispatch().withDriverId(0).withAcceptedAt(new Date()).build());
            }
        }
        return result;
    }

}