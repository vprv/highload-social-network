import { CreateAccountCommand } from "./create-account.command";

export interface CreateAccountUseCase {
    createAccount(command: CreateAccountCommand): Promise<Boolean>
}