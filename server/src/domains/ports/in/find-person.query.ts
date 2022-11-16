import { AccountEntity } from "../../entities/account.entity";

export interface FindPersonQuery {
    findPerson(name: string, last_name: string): Promise<AccountEntity[]>;
}