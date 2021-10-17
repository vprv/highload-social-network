import { AccountId } from "../entities/account.entity";
import { GetAccountQuery } from "../ports/in/get-account.query";
import { LoadAccountPort } from "../ports/out/load-account.port";

export class GetAccountService implements GetAccountQuery {
    constructor(
        private readonly _loadAccountPort: LoadAccountPort
    ) { }

    async getAccount(accountId: AccountId) {
        return await this._loadAccountPort.loadAccount(accountId)
    }
}