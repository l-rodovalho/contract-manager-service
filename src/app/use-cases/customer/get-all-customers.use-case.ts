import { Injectable, NotFoundException } from "@nestjs/common";
import { CustomerRepositoryGateway } from "src/app/gateways/customer.repository.gateway";

@Injectable()
export class GetAllCustomersUseCase {
    constructor(
        private readonly customerRepository: CustomerRepositoryGateway,
    ) { }

    async execute() {
        const customers = await this.customerRepository.findAll();
        if (!customers) {
            throw new NotFoundException('Customers not found');
        }
        return customers;
    }
}