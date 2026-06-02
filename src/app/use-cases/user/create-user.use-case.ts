import { ConflictException, Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from "src/app/dtos/user/create-user.dto";
import { UserRepositoryGateway } from "src/app/gateways/user.repository.gateway";
import { User } from "src/app/entities/user.entity";
import { UserStatus } from "src/domain/enums/user-status.enum";

@Injectable()
export class CreateUserUseCase {
    constructor(
        private readonly userRepository: UserRepositoryGateway,
    ) { }

    async execute(userDto: CreateUserDto) {
        const existingEmail = await this.userRepository.findByEmail(userDto.email);
        if (existingEmail) {
            throw new ConflictException('User with this email already exists');
        }

        const entity = new User();
        entity.name = userDto.name;
        entity.email = userDto.email;
        entity.passwordHash = await bcrypt.hash(userDto.password, 10);
        entity.role = userDto.role;
        entity.status = UserStatus.ACTIVE;
        entity.createdAt = new Date();
        entity.updatedAt = new Date();
        entity.version = 1;

        return this.userRepository.create(entity);
    }
}
