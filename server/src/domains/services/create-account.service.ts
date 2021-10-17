import { AccountEntity } from "../entities/account.entity";
import { CreateAccountCommand } from "../ports/in/create-account.command";
import { CreateAccountUseCase } from "../ports/in/create-account.use-case";
import { LoadAccountPort } from "../ports/out/load-account.port";
import { UpdateAccountStatePort } from "../ports/out/update-account-state.port";


export class CreateAccountService implements CreateAccountUseCase {
    constructor(
        private readonly _loadAccountPort: LoadAccountPort,
        private readonly _updateAccountPort: UpdateAccountStatePort
    ) { }

    async createAccount(command: CreateAccountCommand) {
        await this._updateAccountPort.createAccount(command.account);
        return true;
    }
}