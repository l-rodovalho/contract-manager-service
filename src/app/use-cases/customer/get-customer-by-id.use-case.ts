import { Injectable } from "@nestjs/common";
import { CustomerRepositoryGateway } from "src/app/gateways/customer.repository.gateway";

@Injectable()
export class GetCustomerByIdUseCase {
    constructor(
        private readonly customerRepository: CustomerRepositoryGateway,
    ) { }

    async execute(id: number) {
        return this.customerRepository.findById(id);
    }
}