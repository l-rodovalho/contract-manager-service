import { DefaultRepositoryGateway } from "./default.repository.gateway";
import { Customer } from "../entities/customer.entity";

export abstract class CustomerRepositoryGateway extends DefaultRepositoryGateway<Customer> {
    abstract findByDocumentId(documentId: string): Promise<Customer | null>;
}