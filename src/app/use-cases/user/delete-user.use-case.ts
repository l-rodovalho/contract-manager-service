import { Injectable, NotFoundException } from "@nestjs/common";
import { UserRepositoryGateway } from "src/app/gateways/user.repository.gateway";
import { UserStatus } from "src/domain/enums/user-status.enum";

@Injectable()
export class DeleteUserUseCase {
    constructor(
        private readonly userRepository: UserRepositoryGateway,
    ) { }

    async execute(id: number) {
        const existingUser = await this.userRepository.findById(id);
        if (!existingUser) {
            throw new NotFoundException('User not found');
        }

        existingUser.status = UserStatus.INACTIVE;
        existingUser.updatedAt = new Date();

        return this.userRepository.update(existingUser);
    }
}
