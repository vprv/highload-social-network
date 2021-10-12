import { AccountEntity } from "../../entities/account.entity";

export interface UpdateAccountStatePort {
    updateFriends(account: AccountEntity): Promise<Boolean>;
}