import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { ContractRepositoryGateway } from "src/app/gateways/contract.repository.gateway";
import { CustomerRepositoryGateway } from "src/app/gateways/customer.repository.gateway";
import { UserRepositoryGateway } from "src/app/gateways/user.repository.gateway";
import { UpdateContractDto } from "src/app/dtos/contract/update-contract.dto";

@Injectable()
export class UpdateContractUseCase {
    constructor(
        private readonly contractRepository: ContractRepositoryGateway,
        private readonly userRepository: UserRepositoryGateway,
    ) { }

    async execute(id: number, contractDto: UpdateContractDto) {
        const existingContract = await this.contractRepository.findById(id);
        if (!existingContract) {
            throw new NotFoundException('Contract not found');
        }

        if (existingContract.version !== contractDto.version) {
            throw new ConflictException('Contract version does not match');
        }

        if (contractDto.managerId && contractDto.managerId !== existingContract.managerId) {
            const manager = await this.userRepository.findById(contractDto.managerId);
            if (!manager) throw new NotFoundException('Manager not found');
            existingContract.managerId = contractDto.managerId;
        }

        existingContract.title = contractDto.title ?? existingContract.title;
        existingContract.value = contractDto.value ?? existingContract.value;
        existingContract.startDate = contractDto.startDate ?? existingContract.startDate;
        existingContract.endDate = contractDto.endDate ?? existingContract.endDate;
        existingContract.status = contractDto.status ?? existingContract.status;
        existingContract.updatedAt = new Date();

        return this.contractRepository.update(existingContract);
    }
}
