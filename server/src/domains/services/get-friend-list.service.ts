import { AccountId } from "../entities/account.entity";
import { GetFriendListQuery } from "../ports/in/get-friend-list.query";
import { LoadAccountPort } from "../ports/out/load-account.port";

export class GetFriendListService implements GetFriendListQuery {
    constructor(
        private readonly _loadAccountPort: LoadAccountPort
    ) { }

    async getFriendList(accountId: AccountId) {
        const account = await this._loadAccountPort.loadAccount(accountId);

        return account.friendWindow;
    }
}