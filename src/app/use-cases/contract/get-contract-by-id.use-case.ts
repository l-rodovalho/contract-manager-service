import { Injectable, NotFoundException } from "@nestjs/common";
import { ContractRepositoryGateway } from "src/app/gateways/contract.repository.gateway";

@Injectable()
export class GetContractByIdUseCase {
    constructor(
        private readonly contractRepository: ContractRepositoryGateway,
    ) { }

    async execute(id: number) {
        const contract = await this.contractRepository.findById(id);
        if (!contract) {
            throw new NotFoundException('Contract not found');
        }
        return contract;
    }
}
