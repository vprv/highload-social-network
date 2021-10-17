import { AccountEntity } from "../../entities/account.entity";

export interface UpdateAccountStatePort {
    createAccount(account: AccountEntity): Promise<Boolean>;
    updateFriends(account: AccountEntity): Promise<Boolean>;
}