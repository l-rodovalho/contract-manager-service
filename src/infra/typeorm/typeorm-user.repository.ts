import { Injectable } from "@nestjs/common";
import { UserRepositoryGateway } from "src/app/gateways/user.repository.gateway";
import { DataSource } from "typeorm";
import { User } from "src/app/entities/user.entity";
import { TypeOrmDefaultRepository } from "./typeorm-default.repository";

@Injectable()
export class TypeOrmUserRepository extends TypeOrmDefaultRepository<User> implements UserRepositoryGateway {
    constructor(
        dataSource: DataSource,
    ) { super(dataSource.getRepository(User)); }

    async findByEmail(email: string): Promise<User | null> {
        return this.repository.findOne({ where: { email } });
    }
}