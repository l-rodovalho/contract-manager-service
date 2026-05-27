import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigType } from "@nestjs/config";
import { databaseConfig } from "./database.config";
import { CustomerRepositoryGateway } from "src/app/gateways/customer.repository.gateway";
import { TypeOrmCustomerRepository } from "../typeorm/typeorm-customer.repository";
import { APP_ENTITIES } from "src/app/entities";

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
    }],
    exports: [CustomerRepositoryGateway],
})
export class DatabaseModule { }