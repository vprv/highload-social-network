import { AccountEntity } from "../../entities/account.entity";

export class CreateAccountCommand {
    constructor(
        private readonly _account: AccountEntity
    ) { }

    get account(): AccountEntity {
        return this._account;
    }
}