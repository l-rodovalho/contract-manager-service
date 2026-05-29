import { Injectable, NotFoundException } from "@nestjs/common";
import { CustomerRepositoryGateway } from "src/app/gateways/customer.repository.gateway";

@Injectable()
export class GetCustomerByIdUseCase {
    constructor(
        private readonly customerRepository: CustomerRepositoryGateway,
    ) { }

    async execute(id: number) {
        const customer = await this.customerRepository.findById(id);
        if (!customer) {
            throw new NotFoundException('Customer not found');
        }
        return customer;
    }
}