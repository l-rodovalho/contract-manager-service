import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { UserRepositoryGateway } from "src/app/gateways/user.repository.gateway";
import { UpdateUserDto } from "src/app/dtos/user/update-user.dto";

@Injectable()
export class UpdateUserUseCase {
    constructor(
        private readonly userRepository: UserRepositoryGateway,
    ) { }

    async execute(id: number, userDto: UpdateUserDto) {
        const existingUser = await this.userRepository.findById(id);
        if (!existingUser) {
            throw new NotFoundException('User not found');
        }

        if (existingUser.version !== userDto.version) {
            throw new ConflictException('User version does not match');
        }

        if (userDto.email && userDto.email !== existingUser.email) {
            const existingEmail = await this.userRepository.findByEmail(userDto.email);
            if (existingEmail) {
                throw new ConflictException('User with this email already exists');
            }
        }

        existingUser.name = userDto.name ?? existingUser.name;
        existingUser.email = userDto.email ?? existingUser.email;
        existingUser.role = userDto.role ?? existingUser.role;
        existingUser.updatedAt = new Date();

        return this.userRepository.update(existingUser);
    }
}
