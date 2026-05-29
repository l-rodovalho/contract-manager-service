import { Injectable, NotFoundException } from "@nestjs/common";
import { CustomerRepositoryGateway } from "src/app/gateways/customer.repository.gateway";
import { CustomerStatus } from "src/domain/enums/customer-status.enum";

@Injectable()
export class DeleteCustomerUseCase {
    constructor(
        private readonly customerRepository: CustomerRepositoryGateway,
    ) { }

    async execute(id: number) {
        const existingCustomer = await this.customerRepository.findById(id);
        if (!existingCustomer) {
            throw new NotFoundException('Customer not found');
        }

        existingCustomer.status = CustomerStatus.INACTIVE;
        existingCustomer.updatedAt = new Date();

        return this.customerRepository.update(existingCustomer);
    }
}
