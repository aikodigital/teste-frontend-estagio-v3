import { Vehicle } from "./Vehicle"
import { NameEnum } from "./VehicleType";


const cargoTruck = new Vehicle("1", "Cargo Truck 1", NameEnum.CargoTruck);

cargoTruck.honk()
