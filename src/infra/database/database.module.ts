import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigType } from "@nestjs/config";
import { databaseConfig } from "./database.config";
import { CustomerRepositoryGateway } from "src/app/gateways/customer.repository.gateway";
import { TypeOrmCustomerRepository } from "../typeorm/typeorm-customer.repository";
import { APP_ENTITIES } from "src/app/entities";
import { UserRepositoryGateway } from "src/app/gateways/user.repository.gateway";
import { TypeOrmUserRepository } from "../typeorm/typeorm-user.repository";
import { ContractRepositoryGateway } from "src/app/gateways/contract.repository.gateway";
import { TypeOrmContractRepository } from "../typeorm/typeorm-contract.repository";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [databaseConfig.KEY],
            useFactory: (dbConfig: ConfigType<typeof databaseConfig>) => ({
                type: 'postgres',
                host: dbConfig.host,
                port: dbConfig.port,
                username: dbConfig.username,
                password: dbConfig.password,
                database: dbConfig.database,
                synchronize: true,
                entities: APP_ENTITIES,
            }),
        }),
    ],
    providers: [{
        provide: CustomerRepositoryGateway,
        useClass: TypeOrmCustomerRepository,
    }, {
        provide: UserRepositoryGateway,
        useClass: TypeOrmUserRepository,
    }, {
        provide: ContractRepositoryGateway,
        useClass: TypeOrmContractRepository,
    }],
    exports: [CustomerRepositoryGateway, UserRepositoryGateway, ContractRepositoryGateway],
})
export class DatabaseModule { }