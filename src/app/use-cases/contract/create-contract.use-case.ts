import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateContractDto } from "src/app/dtos/contract/create-contract.dto";
import { ContractRepositoryGateway } from "src/app/gateways/contract.repository.gateway";
import { CustomerRepositoryGateway } from "src/app/gateways/customer.repository.gateway";
import { UserRepositoryGateway } from "src/app/gateways/user.repository.gateway";
import { Contract } from "src/app/entities/contract.entity";
import { ContractStatus } from "src/domain/enums/contract-status.enum";

@Injectable()
export class CreateContractUseCase {
    constructor(
        private readonly contractRepository: ContractRepositoryGateway,
        private readonly customerRepository: CustomerRepositoryGateway,
        private readonly userRepository: UserRepositoryGateway,
    ) { }

    async execute(contractDto: CreateContractDto) {
        const [customer, manager] = await Promise.all([
            this.customerRepository.findById(contractDto.customerId),
            this.userRepository.findById(contractDto.managerId)
        ]);

        if (!customer) {
            throw new NotFoundException('Customer not found');
        }

        if (!manager) {
            throw new NotFoundException('Manager not found');
        }

        const entity = new Contract();
        entity.customerId = contractDto.customerId;
        entity.managerId = contractDto.managerId;
        entity.title = contractDto.title;
        entity.value = contractDto.value;
        entity.startDate = contractDto.startDate;
        entity.endDate = contractDto.endDate;
        entity.status = contractDto.status ?? ContractStatus.PENDING;
        entity.createdAt = new Date();
        entity.updatedAt = new Date();
        entity.version = 1;

        return this.contractRepository.create(entity);
    }
}
