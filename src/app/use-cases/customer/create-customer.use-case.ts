import { ConflictException, Injectable } from "@nestjs/common";
import { CreateCustomerDto } from "src/app/dtos/customer/create-customer.dto";
import { CustomerRepositoryGateway } from "src/app/gateways/customer.repository.gateway";
import { Customer } from "src/app/entities/customer.entity";
import { CustomerStatus } from "src/domain/enums/customer-status.enum";

@Injectable()
export class CreateCustomerUseCase {
    constructor(
        private readonly customerRepository: CustomerRepositoryGateway,
    ) { }

    async execute(customer: CreateCustomerDto) {
        const entity = new Customer();

        let formattedDocumentId = customer.documentId.replace(/[^\d]/g, '');
        if (formattedDocumentId.length === 11) {
            formattedDocumentId = formattedDocumentId.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
        } else if (formattedDocumentId.length === 14) {
            formattedDocumentId = formattedDocumentId.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
        }

        const existingDocumentId = await this.customerRepository.findByDocumentId(formattedDocumentId);
        if (existingDocumentId) {
            throw new ConflictException('Customer with this document id already exists');
        }

        entity.corporateName = customer.corporateName;
        entity.tradeName = customer.tradeName;
        entity.documentId = formattedDocumentId;
        entity.contactEmail = customer.contactEmail;
        entity.status = CustomerStatus.ACTIVE;
        entity.createdAt = new Date();
        entity.updatedAt = new Date();
        entity.version = 1;

        return this.customerRepository.create(entity);
    }
}