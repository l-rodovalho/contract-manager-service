import { DefaultRepositoryGateway } from "./default.repository.gateway";
import { Contract } from "../entities/contract.entity";

export abstract class ContractRepositoryGateway extends DefaultRepositoryGateway<Contract> {}
