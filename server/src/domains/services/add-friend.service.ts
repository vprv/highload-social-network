import { AddFriendCommand } from "../ports/in/add-friend.command";
import { AddFriendUseCase } from "../ports/in/add-friend.use-case";
import { LoadAccountPort } from "../ports/out/load-account.port";
import { UpdateAccountStatePort } from "../ports/out/update-account-state.port";

export class AddFriendService implements AddFriendUseCase {
    constructor(
        private readonly _loadAccountPort: LoadAccountPort,
        private readonly _updateAccountPort: UpdateAccountStatePort
    ) { }

    async addFriend(command: AddFriendCommand) {
        const sourceAccount = await this._loadAccountPort.loadAccount(command.friend.sourceAccountId);

        sourceAccount.requestFriend(command.friend.targetAccountId);
        const status = await this._updateAccountPort.updateFriends(sourceAccount);
        return status;
    }
}