import { AccountEntity, AccountId } from "../../domains/entities/account.entity";
import { LoadAccountPort } from "../../domains/ports/out/load-account.port";
import { UpdateAccountStatePort } from "../../domains/ports/out/update-account-state.port";
import { AccountMapper } from "./account.mapper";
import { AccountMysqlEntity } from "./account.mysql-entity";
import { FriendMysqlEntity } from "./friend.mysql-entity";

export class AccountPersistenceAdapterService implements LoadAccountPort, UpdateAccountStatePort {
    constructor(
        private _accountRepositoty: AccountMysqlEntity,
        private _friendsRepository: FriendMysqlEntity
    ) { }

    async loadAccount(accountId: AccountId): Promise<AccountEntity> {
        const accountInfo = await this._accountRepositoty.findOne(accountId);
        if (accountInfo === null) {
            throw new Error("Account not found");
        }
        const friends = await this._friendsRepository.getAll(accountId);
        return AccountMapper.mapToDomain(accountInfo, friends)
    }

    async findPerson(name: string, last_name: string): Promise<AccountEntity[]> {
        const persons = await this._accountRepositoty.findPerson(name, last_name);
        const accountEntities = persons.map(person => AccountMapper.mapToDomain(person, []));
        return accountEntities;
    }

    async createAccount(account: AccountEntity) {
        const status = await AccountMapper.mapAccountToMysqlEntity(account).save();
        return status;
    }

    async updateFriends(account: AccountEntity) {
        try {
            const friends = account.friendWindow.friends.filter(friend => friend.id === null);
            const promises = friends.map(friend => AccountMapper.mapFriendToMysqlEntity(friend).save())
            await Promise.all(promises);
            return true;
        } catch (e) {
            console.log(e);
        }
        return false;
    }

}