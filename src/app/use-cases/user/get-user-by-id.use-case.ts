import { Injectable, NotFoundException } from "@nestjs/common";
import { UserRepositoryGateway } from "src/app/gateways/user.repository.gateway";

@Injectable()
export class GetUserByIdUseCase {
    constructor(
        private readonly userRepository: UserRepositoryGateway,
    ) { }

    async execute(id: number) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }
}
