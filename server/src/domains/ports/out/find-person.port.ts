import { AccountEntity } from "../../entities/account.entity";

export interface FindPesronPort {
    findPerson(name: string, last_name: string): Promise<AccountEntity[]>;
}