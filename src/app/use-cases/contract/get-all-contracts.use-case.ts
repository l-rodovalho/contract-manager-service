import { Injectable } from "@nestjs/common";
import { ContractRepositoryGateway } from "src/app/gateways/contract.repository.gateway";

@Injectable()
export class GetAllContractsUseCase {
    constructor(
        private readonly contractRepository: ContractRepositoryGateway,
    ) { }

    async execute() {
        return this.contractRepository.findAll();
    }
}
