export abstract class DefaultRepositoryGateway<Entity> {
    abstract create(entity: Entity): Promise<Entity>;
    abstract update(entity: Entity): Promise<Entity>;
    abstract delete(entity: Entity): Promise<void>;
    abstract findById(id: number): Promise<Entity | null>;
    abstract findAll(): Promise<Entity[]>;
}