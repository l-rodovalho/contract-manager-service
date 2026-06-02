import { DefaultRepositoryGateway } from "./default.repository.gateway";
import { User } from "../entities/user.entity";

export abstract class UserRepositoryGateway extends DefaultRepositoryGateway<User> {
    abstract findByEmail(email: string): Promise<User | null>;
}