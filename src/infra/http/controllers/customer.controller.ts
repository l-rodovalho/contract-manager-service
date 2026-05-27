import { Controller, Get, Param } from "@nestjs/common";
import { GetCustomerByIdUseCase } from "src/app/use-cases/customer/get-customer-by-id.use-case";
import { GetAllCustomersUseCase } from "src/app/use-cases/customer/get-all-customers.use-case";

@Controller('customers')
export class CustomerController {
    constructor(
        private readonly getAllCustomersUseCase: GetAllCustomersUseCase,
        private readonly getCustomerByIdUseCase: GetCustomerByIdUseCase,
    ) { }

    @Get()
    async getAllCustomers() {
        return this.getAllCustomersUseCase.execute();
    }

    @Get(':id')
    async getCustomerById(@Param('id') id: number) {
        return this.getCustomerByIdUseCase.execute(id);
    }
}