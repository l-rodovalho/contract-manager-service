import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { GetAllContractsUseCase } from "src/app/use-cases/contract/get-all-contracts.use-case";
import { GetContractByIdUseCase } from "src/app/use-cases/contract/get-contract-by-id.use-case";
import { CreateContractDto } from "src/app/dtos/contract/create-contract.dto";
import { CreateContractUseCase } from "src/app/use-cases/contract/create-contract.use-case";
import { UpdateContractDto } from "src/app/dtos/contract/update-contract.dto";
import { UpdateContractUseCase } from "src/app/use-cases/contract/update-contract.use-case";
import { DeleteContractUseCase } from "src/app/use-cases/contract/delete-contract.use-case";

@Controller('contracts')
export class ContractController {
    constructor(
        private readonly getAllContractsUseCase: GetAllContractsUseCase,
        private readonly getContractByIdUseCase: GetContractByIdUseCase,
        private readonly createContractUseCase: CreateContractUseCase,
        private readonly updateContractUseCase: UpdateContractUseCase,
        private readonly deleteContractUseCase: DeleteContractUseCase,
    ) { }

    @Get()
    async getAllContracts() {
        return this.getAllContractsUseCase.execute();
    }

    @Get(':id')
    async getContractById(@Param('id') id: number) {
        return this.getContractByIdUseCase.execute(id);
    }

    @Post()
    async createContract(@Body() contract: CreateContractDto) {
        return this.createContractUseCase.execute(contract);
    }

    @Patch(':id')
    async updateContract(@Param('id') id: number, @Body() contract: UpdateContractDto) {
        return this.updateContractUseCase.execute(id, contract);
    }

    @Delete(':id')
    async deleteContract(@Param('id') id: number) {
        return this.deleteContractUseCase.execute(id);
    }
}
