import { Module } from "@nestjs/common";
import { CustomerController } from "./controllers/customer.controller";
import { GetAllCustomersUseCase } from "src/app/use-cases/customer/get-all-customers.use-case";
import { GetCustomerByIdUseCase } from "src/app/use-cases/customer/get-customer-by-id.use-case";
import { DatabaseModule } from "../database/database.module";
import { CreateCustomerUseCase } from "src/app/use-cases/customer/create-customer.use-case";
import { UpdateCustomerUseCase } from "src/app/use-cases/customer/update-customer.use-case";
import { DeleteCustomerUseCase } from "src/app/use-cases/customer/delete-customer.use-case";

const CONTROLLERS = [CustomerController];
const USECASES = [GetAllCustomersUseCase, GetCustomerByIdUseCase, CreateCustomerUseCase, UpdateCustomerUseCase, DeleteCustomerUseCase];

@Module({
    imports: [DatabaseModule],
    providers: [
        ...USECASES,
    ],
    controllers: [...CONTROLLERS],
})
export class HttpModule { }