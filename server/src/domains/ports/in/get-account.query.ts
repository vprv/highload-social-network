import { AccountEntity, AccountId } from "../../entities/account.entity";

export interface GetAccountQuery {
    getAccount(accountId: AccountId): Promise<AccountEntity>;
}