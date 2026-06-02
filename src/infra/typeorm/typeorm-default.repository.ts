import { DefaultRepositoryGateway } from "src/app/gateways/default.repository.gateway";
import { Repository } from "typeorm";
import { Identifiable } from "../utils/identifiable";
import { UserStatus } from "src/domain/enums/user-status.enum";

export class TypeOrmDefaultRepository<Entity extends Identifiable> implements DefaultRepositoryGateway<Entity> {
    constructor(
        protected readonly repository: Repository<Entity>,
    ) { }

    async create(entity: Entity): Promise<Entity> {
        return this.repository.save(entity);
    }

    async update(entity: Entity): Promise<Entity> {
        return this.repository.save(entity);
    }

    async delete(entity: Entity): Promise<void> {
        await this.repository.remove(entity);
    }

    async findById(id: number): Promise<Entity | null> {
        return this.repository.createQueryBuilder('entity')
            .where('entity.id = :id', { id })
            .getOne();
    }

    async findAll(): Promise<Entity[]> {
        return this.repository.createQueryBuilder('entity')
            .getMany();
    }
}