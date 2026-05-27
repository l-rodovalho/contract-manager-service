import { Injectable } from "@nestjs/common";
import { CustomerRepositoryGateway } from "src/app/gateways/customer.repository.gateway";
import { DataSource } from "typeorm";
import { Customer } from "src/app/entities/customer.entity";
import { TypeOrmDefaultRepository } from "./typeorm-default.repository";

@Injectable()
export class TypeOrmCustomerRepository extends TypeOrmDefaultRepository<Customer> implements CustomerRepositoryGateway {
    constructor(
        dataSource: DataSource,
    ) { super(dataSource.getRepository(Customer)); }

    async findByDocumentId(documentId: string): Promise<Customer | null> {
        return this.repository.findOne({ where: { documentId } });
    }
}