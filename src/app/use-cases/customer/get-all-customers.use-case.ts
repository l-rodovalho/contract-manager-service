import { Injectable } from "@nestjs/common";
import { CustomerRepositoryGateway } from "src/app/gateways/customer.repository.gateway";

@Injectable()
export class GetAllCustomersUseCase {
    constructor(
        private readonly customerRepository: CustomerRepositoryGateway,
    ) { }

    async execute() {
        return this.customerRepository.findAll();
    }
}