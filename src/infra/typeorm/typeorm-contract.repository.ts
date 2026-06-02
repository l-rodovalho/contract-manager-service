import { Injectable } from "@nestjs/common";
import { ContractRepositoryGateway } from "src/app/gateways/contract.repository.gateway";
import { DataSource } from "typeorm";
import { Contract } from "src/app/entities/contract.entity";
import { TypeOrmDefaultRepository } from "./typeorm-default.repository";

@Injectable()
export class TypeOrmContractRepository extends TypeOrmDefaultRepository<Contract> implements ContractRepositoryGateway {
    constructor(
        dataSource: DataSource,
    ) { super(dataSource.getRepository(Contract)); }
}
