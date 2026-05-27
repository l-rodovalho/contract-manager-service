import { Module } from "@nestjs/common";
import { CustomerController } from "./controllers/customer.controller";
import { GetAllCustomersUseCase } from "src/app/use-cases/customer/get-all-customers.use-case";
import { GetCustomerByIdUseCase } from "src/app/use-cases/customer/get-customer-by-id.use-case";
import { DatabaseModule } from "../database/database.module";

const CONTROLLERS = [CustomerController];
const USECASES = [GetAllCustomersUseCase, GetCustomerByIdUseCase];

@Module({
    imports: [DatabaseModule],
    providers: [
        ...USECASES,
    ],
    controllers: [...CONTROLLERS],
})
export class HttpModule { }