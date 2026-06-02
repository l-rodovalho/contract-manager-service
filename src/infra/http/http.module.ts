import { Module } from "@nestjs/common";
import { CustomerController } from "./controllers/customer.controller";
import { GetAllCustomersUseCase } from "src/app/use-cases/customer/get-all-customers.use-case";
import { GetCustomerByIdUseCase } from "src/app/use-cases/customer/get-customer-by-id.use-case";
import { DatabaseModule } from "../database/database.module";
import { CreateCustomerUseCase } from "src/app/use-cases/customer/create-customer.use-case";
import { UpdateCustomerUseCase } from "src/app/use-cases/customer/update-customer.use-case";
import { DeleteCustomerUseCase } from "src/app/use-cases/customer/delete-customer.use-case";
import { UserController } from "./controllers/user.controller";
import { GetAllUsersUseCase } from "src/app/use-cases/user/get-all-users.use-case";
import { GetUserByIdUseCase } from "src/app/use-cases/user/get-user-by-id.use-case";
import { CreateUserUseCase } from "src/app/use-cases/user/create-user.use-case";
import { UpdateUserUseCase } from "src/app/use-cases/user/update-user.use-case";
import { DeleteUserUseCase } from "src/app/use-cases/user/delete-user.use-case";

const CONTROLLERS = [CustomerController, UserController];
const USECASES = [GetAllCustomersUseCase, GetCustomerByIdUseCase, CreateCustomerUseCase, UpdateCustomerUseCase, DeleteCustomerUseCase, GetAllUsersUseCase, GetUserByIdUseCase, CreateUserUseCase, UpdateUserUseCase, DeleteUserUseCase];

@Module({
    imports: [DatabaseModule],
    providers: [
        ...USECASES,
    ],
    controllers: [...CONTROLLERS],
})
export class HttpModule { }