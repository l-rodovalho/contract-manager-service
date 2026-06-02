import { Injectable } from "@nestjs/common";
import { UserRepositoryGateway } from "src/app/gateways/user.repository.gateway";

@Injectable()
export class GetAllUsersUseCase {
    constructor(
        private readonly userRepositoryGateway: UserRepositoryGateway,
    ) { }

    async execute() {
        return this.userRepositoryGateway.findAll();
    }
}