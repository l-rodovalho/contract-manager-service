import { Injectable, NotFoundException } from "@nestjs/common";
import { ContractRepositoryGateway } from "src/app/gateways/contract.repository.gateway";
import { ContractStatus } from "src/domain/enums/contract-status.enum";

@Injectable()
export class DeleteContractUseCase {
    constructor(
        private readonly contractRepository: ContractRepositoryGateway,
    ) { }

    async execute(id: number) {
        const existingContract = await this.contractRepository.findById(id);
        if (!existingContract) {
            throw new NotFoundException('Contract not found');
        }

        existingContract.status = ContractStatus.CANCELLED;
        existingContract.updatedAt = new Date();

        return this.contractRepository.update(existingContract);
    }
}
