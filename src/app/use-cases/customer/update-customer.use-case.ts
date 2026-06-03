import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CustomerRepositoryGateway } from "src/app/gateways/customer.repository.gateway";
import { UpdateCustomerDto } from "src/app/dtos/customer/update-customer.dto";

@Injectable()
export class UpdateCustomerUseCase {
    constructor(
        private readonly customerRepository: CustomerRepositoryGateway,
    ) { }

    async execute(id: number, customer: UpdateCustomerDto) {

        const existingCustomer = await this.customerRepository.findById(id);
        if (!existingCustomer) {
            throw new NotFoundException('Customer not found');
        }

        if (existingCustomer.version !== customer.version) {
            throw new ConflictException('Customer version does not match');
        }

        let formattedDocumentId: string | null = null

        if (customer.documentId) {
            formattedDocumentId = customer.documentId.replace(/[^\d]/g, '');
            if (formattedDocumentId.length === 11) {
                formattedDocumentId = formattedDocumentId.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
            } else if (formattedDocumentId.length === 14) {
                formattedDocumentId = formattedDocumentId.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
            }

            const existingDocumentId = await this.customerRepository.findByDocumentId(formattedDocumentId);
            if (existingDocumentId && existingDocumentId.id !== id) {
                throw new ConflictException('Customer with this document id already exists');
            }
        }

        existingCustomer.corporateName = customer.corporateName ?? existingCustomer.corporateName;
        existingCustomer.tradeName = customer.tradeName ?? existingCustomer.tradeName;
        existingCustomer.documentId = formattedDocumentId ?? existingCustomer.documentId;
        existingCustomer.contactEmail = customer.contactEmail ?? existingCustomer.contactEmail;
        existingCustomer.updatedAt = new Date();

        return this.customerRepository.update(existingCustomer);
    }
}