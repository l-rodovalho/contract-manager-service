import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { GetCustomerByIdUseCase } from "src/app/use-cases/customer/get-customer-by-id.use-case";
import { GetAllCustomersUseCase } from "src/app/use-cases/customer/get-all-customers.use-case";
import { CreateCustomerDto } from "src/app/dtos/customer/create-customer.dto";
import { CreateCustomerUseCase } from "src/app/use-cases/customer/create-customer.use-case";
import { UpdateCustomerDto } from "src/app/dtos/customer/update-customer.dto";
import { UpdateCustomerUseCase } from "src/app/use-cases/customer/update-customer.use-case";
import { DeleteCustomerUseCase } from "src/app/use-cases/customer/delete-customer.use-case";

@Controller('customers')
export class CustomerController {
    constructor(
        private readonly getAllCustomersUseCase: GetAllCustomersUseCase,
        private readonly getCustomerByIdUseCase: GetCustomerByIdUseCase,
        private readonly createCustomerUseCase: CreateCustomerUseCase,
        private readonly updateCustomerUseCase: UpdateCustomerUseCase,
        private readonly deleteCustomerUseCase: DeleteCustomerUseCase,
    ) { }

    @Get()
    async getAllCustomers() {
        return this.getAllCustomersUseCase.execute();
    }

    @Get(':id')
    async getCustomerById(@Param('id') id: number) {
        return this.getCustomerByIdUseCase.execute(id);
    }

    @Post()
    async createCustomer(@Body() customer: CreateCustomerDto) {
        return this.createCustomerUseCase.execute(customer);
    }

    @Patch(':id')
    async updateCustomer(@Param('id') id: number, @Body() customer: UpdateCustomerDto) {
        return this.updateCustomerUseCase.execute(id, customer);
    }

    @Delete(':id')
    async deleteCustomer(@Param('id') id: number) {
        return this.deleteCustomerUseCase.execute(id);
    }
}